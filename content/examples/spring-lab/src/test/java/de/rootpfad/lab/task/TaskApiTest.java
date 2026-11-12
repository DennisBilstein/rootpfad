package de.rootpfad.lab.task;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class TaskApiTest {

	@Autowired MockMvc mvc;
	@Autowired TaskRepository repository;

	@BeforeEach
	void clean() {
		repository.deleteAll();
	}

	@Test
	void createReturns201WithLocation() throws Exception {
		mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON)
				.content("""
						{"title": "  Vue-Lektion lesen ", "dueDate": null}"""))
				.andExpect(status().isCreated())
				.andExpect(header().string("Location", org.hamcrest.Matchers.startsWith("/api/tasks/")))
				.andExpect(jsonPath("$.title").value("Vue-Lektion lesen"));
	}

	@Test
	void invalidInputYieldsProblemDetailWithFieldViolations() throws Exception {
		mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content("""
						{"title": "   ", "dueDate": "2000-01-01"}"""))
				.andExpect(status().isUnprocessableContent())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
				.andExpect(jsonPath("$.title").value("Validierung fehlgeschlagen"))
				.andExpect(jsonPath("$.violations", hasSize(2)));
	}

	@Test
	void unknownIdYieldsProblemDetail404() throws Exception {
		mvc.perform(get("/api/tasks/999999"))
				.andExpect(status().isNotFound())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
				.andExpect(jsonPath("$.taskId").value(999999));
	}

	@Test
	void malformedJsonYieldsProblemDetail400() throws Exception {
		mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content("{kaputt"))
				.andExpect(status().isBadRequest())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON));
	}

	@Test
	void apiVersionHeaderSelectsResponseShape() throws Exception {
		repository.save(new Task("Fälligkeit testen", java.time.LocalDate.of(2030, 1, 31)));

		mvc.perform(get("/api/tasks").header("API-Version", "1.0"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].title").value("Fälligkeit testen"))
				.andExpect(jsonPath("$[0].dueDate").doesNotExist());

		mvc.perform(get("/api/tasks").header("API-Version", "1.1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].dueDate").value("2030-01-31"));

		// ohne Header gilt die konfigurierte Standardversion 1.0
		mvc.perform(get("/api/tasks"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].dueDate").doesNotExist());
	}

	@Test
	void unsupportedApiVersionIsRejected() throws Exception {
		mvc.perform(get("/api/tasks").header("API-Version", "9.9"))
				.andExpect(status().isBadRequest());
	}

	@Test
	void openApiDocumentDescribesTheTaskEndpoints() throws Exception {
		mvc.perform(get("/v3/api-docs"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.openapi").exists())
				.andExpect(jsonPath("$.paths['/api/tasks']").exists())
				.andExpect(jsonPath("$.paths['/api/tasks/{id}']").exists());
	}

	@Test
	void openApiDocumentsTheRealStatusCodesAndProblemContentType() throws Exception {
		mvc.perform(get("/v3/api-docs"))
				.andExpect(jsonPath("$.paths['/api/tasks'].post.responses['201']").exists())
				.andExpect(jsonPath("$.paths['/api/tasks'].post.responses['422'].content['application/problem+json']").exists());
	}
}
