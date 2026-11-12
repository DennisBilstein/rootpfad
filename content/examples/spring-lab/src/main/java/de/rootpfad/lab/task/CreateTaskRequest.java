package de.rootpfad.lab.task;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record CreateTaskRequest(
		@NotBlank(message = "Titel darf nicht leer sein") @Size(max = 120, message = "Titel darf höchstens 120 Zeichen haben") String title,
		@FutureOrPresent(message = "Fälligkeit darf nicht in der Vergangenheit liegen") LocalDate dueDate) {
}
