package de.rootpfad.lab.client;

import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.resilience.annotation.ConcurrencyLimit;
import org.springframework.resilience.annotation.Retryable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;

/**
 * Ruft einen Fremddienst ab. Timeouts kommen aus spring.http.clients.*, Wiederholungen
 * und Parallelitätsgrenze aus den Resilience-Annotationen von Spring Framework 7.
 */
@Component
public class ExchangeRateClient {

	record RateResponse(String currency, BigDecimal rate) {}

	private final RestClient restClient;

	ExchangeRateClient(RestClient.Builder builder, @Value("${lab.rates.base-url}") String baseUrl) {
		this.restClient = builder.baseUrl(baseUrl).build();
	}

	/** Wiederholt nur Fehler, bei denen ein weiterer Versuch sinnvoll sein kann (Netz, 5xx), nie 4xx. */
	@Retryable(includes = { ResourceAccessException.class, HttpServerErrorException.class },
			maxRetries = 2, delay = 20, multiplier = 2, jitter = 5)
	@ConcurrencyLimit(4)
	public BigDecimal rateFor(String currency) {
		RateResponse response = restClient.get().uri("/rates/{currency}", currency)
				.retrieve().body(RateResponse.class);
		if (response == null || response.rate() == null) {
			throw new IllegalStateException("Antwort ohne Kurs");
		}
		return response.rate();
	}
}
