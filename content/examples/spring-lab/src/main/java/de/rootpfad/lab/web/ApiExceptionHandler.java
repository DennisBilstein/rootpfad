package de.rootpfad.lab.web;

import de.rootpfad.lab.task.TaskNotFoundException;
import java.net.URI;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Einheitliche Fehlerantworten nach RFC 9457 (application/problem+json).
 * Die Basisklasse übersetzt Standard-Spring-Fehler (falsche Methode, kaputtes JSON, ...) bereits selbst.
 */
@RestControllerAdvice
class ApiExceptionHandler extends ResponseEntityExceptionHandler {

	record FieldViolation(String field, String message) {}

	@ExceptionHandler(TaskNotFoundException.class)
	ProblemDetail handleNotFound(TaskNotFoundException ex) {
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
		problem.setTitle("Aufgabe nicht gefunden");
		problem.setType(URI.create("https://rootpfad.example/probleme/aufgabe-nicht-gefunden"));
		problem.setProperty("taskId", ex.getId());
		return problem;
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		List<FieldViolation> violations = ex.getBindingResult().getFieldErrors().stream()
				.map(e -> new FieldViolation(e.getField(), e.getDefaultMessage()))
				.toList();
		ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_CONTENT, "Die Eingabe ist ungültig.");
		problem.setTitle("Validierung fehlgeschlagen");
		problem.setType(URI.create("https://rootpfad.example/probleme/validierung"));
		problem.setProperty("violations", violations);
		return handleExceptionInternal(ex, problem, headers, HttpStatus.UNPROCESSABLE_CONTENT, request);
	}
}
