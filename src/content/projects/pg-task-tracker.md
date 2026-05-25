---
title: "pg-task-tracker"
description: "A small Python library for tracking multi-step task progress in Postgres or SQLite — no broker, no queue, just a clean record of what happened."
date: 2026-04-06
role: "Author"
url: "https://pypi.org/project/pg-task-tracker/"
repo: "https://github.com/craig-stevenson/pg-task-tracker"
draft: false
---

A shoebox, not a warehouse. Celery, Airflow, and Dramatiq are excellent if you need to *execute* tasks across workers — but they're heavy machinery if all you want is a durable record of what happened during a multi-step process. pg-task-tracker is the lighter option: two tables in your existing Postgres (or SQLite) database, an ORM-friendly API built on SQLModel/SQLAlchemy, and nothing else to install or run.

The core shape is `tasks → steps`, each with a UUID, a status, and an arbitrary JSON metadata payload. Use the manual API to create tasks and update steps as work progresses, or wrap a function with the `@track` decorator and let the library handle status transitions for you. A raw SQL migration is included for projects that manage their own schema; an `ensure_schema()` call covers the rest.

I wrote about why I built it in [Tracking multi-step Python tasks with Postgres](/articles/tracking-multi-step-tasks-python-postgres).
