package de.rootpfad.lab.client;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;

/** Echter lokaler HTTP-Server statt Mocks: So werden Timeouts und Wiederholungen wirklich ausgelöst. */
@SpringBootTest(properties = { "spring.http.clients.read-timeout=300ms" })
class ExchangeRateClientTest {

	static final AtomicInteger calls = new AtomicInteger();
	static volatile int failFirst = 0;
	static volatile int failStatus = 503;
	static volatile long delayMillis = 0;
	static final HttpServer server = start();

	static HttpServer start() {
		try {
			HttpServer s = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
			s.createContext("/rates/", exchange -> {
				int n = calls.incrementAndGet();
				try {
					if (delayMillis > 0) Thread.sleep(delayMillis);
				} catch (InterruptedException e) {
					Thread.currentThread().interrupt();
				}
				boolean fail = n <= failFirst;
				byte[] body = (fail ? "{}" : "{\"currency\":\"USD\",\"rate\":1.0842}").getBytes(StandardCharsets.UTF_8);
				exchange.getResponseHeaders().add("Content-Type", "application/json");
				try {
					exchange.sendResponseHeaders(fail ? failStatus : 200, body.length);
					exchange.getResponseBody().write(body);
				} catch (IOException ignored) {
					// Client hat wegen Timeout bereits getrennt
				} finally {
					exchange.close();
				}
			});
			// Eigener Thread pro Anfrage: Ein langsamer Handler darf spätere Versuche nicht blockieren.
			s.setExecutor(java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor());
			s.start();
			return s;
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	@DynamicPropertySource
	static void props(DynamicPropertyRegistry registry) {
		registry.add("lab.rates.base-url", () -> "http://127.0.0.1:" + server.getAddress().getPort());
	}

	@AfterAll
	static void stop() {
		server.stop(0);
	}

	@Autowired ExchangeRateClient client;

	@BeforeEach
	void reset() {
		calls.set(0);
		failFirst = 0;
		failStatus = 503;
		delayMillis = 0;
	}

	@Test
	void retriesServerErrorsAndSucceeds() {
		failFirst = 2;
		assertThat(client.rateFor("USD")).isEqualByComparingTo(new BigDecimal("1.0842"));
		assertThat(calls.get()).isEqualTo(3);            // 1 Versuch + 2 Wiederholungen
	}

	@Test
	void givesUpAfterMaxRetries() {
		failFirst = 10;
		assertThatThrownBy(() -> client.rateFor("USD")).isInstanceOf(HttpServerErrorException.class);
		assertThat(calls.get()).isEqualTo(3);
	}

	@Test
	void doesNotRetryClientErrors() {
		failFirst = 10;
		failStatus = 404;
		assertThatThrownBy(() -> client.rateFor("XXX")).isInstanceOf(HttpClientErrorException.class);
		assertThat(calls.get()).isEqualTo(1);
	}

	@Test
	void readTimeoutSurfacesAsResourceAccessException() {
		delayMillis = 1_000;
		assertThatThrownBy(() -> client.rateFor("USD")).isInstanceOf(ResourceAccessException.class);
		assertThat(calls.get()).isEqualTo(3);            // Timeout zählt als wiederholbarer Netzfehler
	}
}
