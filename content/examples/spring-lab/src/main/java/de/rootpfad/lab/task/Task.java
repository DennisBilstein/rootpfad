package de.rootpfad.lab.task;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.Instant;
import java.time.LocalDate;

@Entity
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 120)
	private String title;

	@Column(nullable = false)
	private boolean done;

	@Column(name = "created_at", nullable = false)
	private Instant createdAt;

	@Column(name = "due_date")
	private LocalDate dueDate;

	protected Task() {
		// für JPA
	}

	public Task(String title, LocalDate dueDate) {
		this.title = title;
		this.dueDate = dueDate;
		this.createdAt = Instant.now();
	}

	public Long getId() { return id; }
	public String getTitle() { return title; }
	public boolean isDone() { return done; }
	public LocalDate getDueDate() { return dueDate; }
	public Instant getCreatedAt() { return createdAt; }
	public void markDone() { this.done = true; }
}
