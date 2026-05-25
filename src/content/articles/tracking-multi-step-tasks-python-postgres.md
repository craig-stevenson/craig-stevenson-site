---
title: "Tracking multi-step Python tasks with Postgres"
description: "Why I built pg-task-tracker — a small library for tracking multi-step task progress in Postgres, without the overhead of Celery, Airflow, or Dramatiq."
date: 2026-04-08
draft: false
tags: [python, postgres, libraries]
---

Introducing pg-task-tracker. The simplest way to track multi-step tasks with Postgres (also works with SQLite).

It started out so simple. I had a Python app that was designed to run continuously and poll a datasource for updates (the source had no ability to push events to me). I just wanted to record any exceptions in a database so I could check them. Then I started storing results of each polling function. Then I wanted to store results from different steps of the polling function. I had managed to grow a giant pile of spaghetti code that was complicated and barely worked.

I took a step back and looked for a Python library to track tasks that had multiple steps in a SQL database. Everything I found felt like trying to smash a fly with a sledgehammer. Celery, Apache Airflow, and Dramatiq were the most popular libraries but every one of them is a distributed task execution system. I just wanted to track something.

## The sledgehammers

Celery needs a message broker like RabbitMQ or Redis just to get started — and a common production setup has both running simultaneously. You spin up separate worker processes, configure serializers, and set up monitoring tools. It's built to distribute work across machines and process millions of tasks.

Airflow is a full orchestration platform — a scheduler, an executor, a metadata database, and a web server all running together. It's incredible for recurring enterprise data pipelines. It's also a warehouse when all I needed was a shoebox.

Dramatiq is lighter but still requires Redis and separate worker processes to consume tasks from a queue.

All three are task execution systems. They run your code for you. I didn't need that. My code was already running fine. I just needed somewhere to write down what happened.

## So I built pg-task-tracker

```python
from sqlmodel import create_engine
import pg_task_tracker

engine = create_engine("postgresql://user:pass@localhost/mydb")
pg_task_tracker.init(engine)
pg_task_tracker.ensure_schema(engine)

task = pg_task_tracker.create_task("data-pipeline")
task.add_step("extract", status="running")
# ... do work ...
task.update_step("extract", status="completed", metadata={"rows": 1500})
```

That's it. Create a task, add steps, update them as you go. Each step can hold whatever JSON metadata you want — results, error messages, timestamps, you name it.

## What's under the hood

pg-task-tracker is built on SQLModel and SQLAlchemy, so it drops right into existing projects with zero friction. It creates two tables — one for tasks and one for steps — and gets out of your way.

Each task gets a UUID and a status (pending, running, completed, or failed). Each step belongs to a task, also gets a UUID and status, and can carry an arbitrary JSON metadata payload. Steps are unique per task name, so you get clean semantics without worrying about duplicates.

If you prefer managing your own schema, the library ships with a raw SQL migration file you can apply directly with psql. If you'd rather let the ORM handle it, a single call to `ensure_schema()` creates everything for you.

There's also a `@track` decorator for the simplest use case — just wrap a function and pg-task-tracker will automatically create a task, mark it running, and set it to completed or failed when the function finishes.

```python
from pg_task_tracker import track

@track(name="nightly-sync")
def sync_data():
    # your logic here
    pass
```

## What it's not

pg-task-tracker doesn't execute your tasks. It doesn't schedule them. It doesn't distribute them across workers. There are no brokers, no queues, no extra infrastructure.

It's a simple, focused library that answers one question: what happened during this task, step by step?

## Where it stands

It's currently at v0.5.0 — intentionally small and focused. It works with Postgres and SQLite. Everything is UUID-based so it plays nicely across services.

If you're already running Postgres (or even SQLite) and just need a clean way to track multi-step task progress without adding infrastructure, give it a shot.

```
pip install pg-task-tracker
```

I'd love feedback. What would make this more useful for your workflows?

The code lives at [/projects/pg-task-tracker](/projects/pg-task-tracker).

---

*Originally published on [LinkedIn](https://www.linkedin.com/pulse/tracking-multi-step-tasks-python-postgres-craig-stevenson-2s7pf/).*
