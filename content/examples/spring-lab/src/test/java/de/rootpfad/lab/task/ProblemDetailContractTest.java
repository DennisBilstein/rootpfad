package de.rootpfad.lab.task;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

/** Der Fehlervertrag als exakter JSON-Vergleich (strict = true): Zusätzliche oder fehlende Felder fallen auf. */
@SpringBootTest
@AutoConfigureMockMvc
class ProblemDetailContractTest {

	@Autowired MockMvc mvc;

	@Test
	void validationErrorHasExactlyTheDocumentedShape() throws Exception {
		mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON)
				.content("{\"title\":\" \",\"dueDate\":\"2000-01-01\"}"))
				.andExpect(status().isUnprocessableContent())
				.andExpect(content().json("""
						{
						  "type": "https://rootpfad.example/probleme/validierung",
						  "title": "Validierung fehlgeschlagen",
						  "status": 422,
						  "detail": "Die Eingabe ist ungültig.",
						  "instance": "/api/tasks",
						  "violations": [
						    {"field": "dueDate", "message": "Fälligkeit darf nicht in der Vergangenheit liegen"},
						    {"field": "title", "message": "Titel darf nicht leer sein"}
						  ]
						}""", false));
	}

	@Test
	void notFoundCarriesTypeAndTaskId() throws Exception {
		mvc.perform(get("/api/tasks/42"))
				.andExpect(status().isNotFound())
				.andExpect(content().json("""
						{
						  "type": "https://rootpfad.example/probleme/aufgabe-nicht-gefunden",
						  "title": "Aufgabe nicht gefunden",
						  "status": 404,
						  "detail": "Aufgabe 42 existiert nicht",
						  "instance": "/api/tasks/42",
						  "taskId": 42
						}""", true));
	}
}
