package de.rootpfad.lab.task;

import java.time.LocalDate;

/** API-Version 1.0 kennt kein Fälligkeitsdatum, Version 1.1+ liefert es zusätzlich. */
public sealed interface TaskResponse {

	record V1(long id, String title, boolean done) implements TaskResponse {
		static V1 from(Task t) { return new V1(t.getId(), t.getTitle(), t.isDone()); }
	}

	record V11(long id, String title, boolean done, LocalDate dueDate) implements TaskResponse {
		static V11 from(Task t) { return new V11(t.getId(), t.getTitle(), t.isDone(), t.getDueDate()); }
	}
}
