package de.rootpfad.lab.task;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
class TaskController {

	private final TaskRepository tasks;

	TaskController(TaskRepository tasks) {
		this.tasks = tasks;
	}

	@GetMapping(version = "1.0")
	List<TaskResponse.V1> listV1() {
		return tasks.findByDoneFalseOrderByDueDateAscIdAsc().stream().map(TaskResponse.V1::from).toList();
	}

	@GetMapping(version = "1.1+")
	List<TaskResponse.V11> listV11() {
		return tasks.findByDoneFalseOrderByDueDateAscIdAsc().stream().map(TaskResponse.V11::from).toList();
	}

	@GetMapping("/{id}")
	TaskResponse.V11 get(@PathVariable long id) {
		return tasks.findById(id).map(TaskResponse.V11::from).orElseThrow(() -> new TaskNotFoundException(id));
	}

	// Springdoc liest Rückgabetypen; den echten Statuscode 201 und den Fehlervertrag melden wir ausdrücklich.
	@Operation(summary = "Aufgabe anlegen")
	@ApiResponse(responseCode = "201", description = "Angelegt; Location-Header zeigt auf die neue Aufgabe")
	@ApiResponse(responseCode = "422", description = "Validierung fehlgeschlagen (RFC 9457)",
			content = @Content(mediaType = "application/problem+json"))
	@PostMapping
	ResponseEntity<TaskResponse.V11> create(@Valid @RequestBody CreateTaskRequest request) {
		Task saved = tasks.save(new Task(request.title().strip(), request.dueDate()));
		return ResponseEntity.created(URI.create("/api/tasks/" + saved.getId())).body(TaskResponse.V11.from(saved));
	}
}
