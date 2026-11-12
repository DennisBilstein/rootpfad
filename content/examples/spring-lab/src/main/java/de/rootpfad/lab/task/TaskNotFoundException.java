package de.rootpfad.lab.task;

public class TaskNotFoundException extends RuntimeException {

	private final long id;

	public TaskNotFoundException(long id) {
		super("Aufgabe %d existiert nicht".formatted(id));
		this.id = id;
	}

	public long getId() { return id; }
}
