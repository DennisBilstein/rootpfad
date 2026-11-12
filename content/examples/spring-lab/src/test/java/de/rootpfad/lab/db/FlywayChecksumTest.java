package de.rootpfad.lab.db;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.exception.FlywayValidateException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

/**
 * Beweist die wichtigste Flyway-Regel: Eine bereits angewendete Migration darf nicht mehr geändert werden.
 * Der Test arbeitet auf einer Kopie in einem Temp-Verzeichnis, nicht auf den echten Migrationsdateien.
 */
class FlywayChecksumTest {

	@Test
	void editingAnAppliedMigrationFailsValidation(@TempDir Path dir) throws IOException {
		Path migrations = Files.createDirectory(dir.resolve("migrations"));
		Path v1 = migrations.resolve("V1__create_task.sql");
		Files.writeString(v1, "CREATE TABLE task (id BIGINT PRIMARY KEY, title VARCHAR(120) NOT NULL);");
		String url = "jdbc:h2:file:" + dir.resolve("db") + ";DB_CLOSE_DELAY=-1";

		Flyway first = Flyway.configure().dataSource(url, "sa", "").locations("filesystem:" + migrations).load();
		assertThat(first.migrate().migrationsExecuted).isEqualTo(1);

		// Nachträglich "nur ein Kommentar" geändert: Die Prüfsumme stimmt trotzdem nicht mehr.
		Files.writeString(v1, "-- harmlos?\nCREATE TABLE task (id BIGINT PRIMARY KEY, title VARCHAR(120) NOT NULL);");
		Flyway second = Flyway.configure().dataSource(url, "sa", "").locations("filesystem:" + migrations).load();

		assertThatThrownBy(second::migrate)
				.isInstanceOf(FlywayValidateException.class)
				.hasMessageContaining("checksum mismatch");
	}

	@Test
	void anAdditiveNewMigrationIsAppliedWithoutTouchingTheOldOne(@TempDir Path dir) throws IOException {
		Path migrations = Files.createDirectory(dir.resolve("migrations"));
		Files.writeString(migrations.resolve("V1__create_task.sql"), "CREATE TABLE task (id BIGINT PRIMARY KEY);");
		String url = "jdbc:h2:file:" + dir.resolve("db2") + ";DB_CLOSE_DELAY=-1";
		Flyway.configure().dataSource(url, "sa", "").locations("filesystem:" + migrations).load().migrate();

		Files.writeString(migrations.resolve("V2__add_title.sql"), "ALTER TABLE task ADD COLUMN title VARCHAR(120);");
		var result = Flyway.configure().dataSource(url, "sa", "").locations("filesystem:" + migrations).load().migrate();

		assertThat(result.migrationsExecuted).isEqualTo(1);
		assertThat(result.targetSchemaVersion).isEqualTo("2");
	}
}
