package de.rootpfad.lab;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
class SpringLabApplicationTests {

	@Autowired
	JdbcTemplate jdbc;

	@Test
	void flywayAppliedAllMigrationsInOrder() {
		List<String> versions = jdbc.queryForList(
				"SELECT \"version\" FROM \"flyway_schema_history\" WHERE \"success\" = TRUE AND \"version\" IS NOT NULL ORDER BY \"installed_rank\"",
				String.class);
		assertThat(versions).containsExactly("1", "2");
	}
}
