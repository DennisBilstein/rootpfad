package de.rootpfad.lab.task;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

/**
 * Läuft gegen ein echtes PostgreSQL in Docker. Ohne laufenden Docker-Daemon wird der Test übersprungen
 * (nicht als bestanden gewertet). Flyway migriert dabei dieselben SQL-Dateien wie in Produktion.
 */
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Testcontainers(disabledWithoutDocker = true)
class PostgresTaskRepositoryTest {

	@Container
	@ServiceConnection
	static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:17-alpine");

	@Autowired TaskRepository repository;

	@Test
	void openTasksAreSortedByDueDateThenId() {
		repository.save(new Task("später", LocalDate.of(2031, 5, 1)));
		repository.save(new Task("früher", LocalDate.of(2030, 5, 1)));

		assertThat(repository.findByDoneFalseOrderByDueDateAscIdAsc())
				.extracting(Task::getTitle)
				.containsExactly("früher", "später");
	}
}
