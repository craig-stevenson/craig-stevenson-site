---
title: "pg-heartbeat"
description: "A tiny Python library for pushing service heartbeats into a SQL database — for when you want liveness signals without a monitoring stack."
date: 2026-04-12
role: "Author"
url: "https://pypi.org/project/pg-heartbeat/"
repo: "https://github.com/craig-stevenson/pg-heartbeat"
draft: false
---

A long-running Python service should be able to say "I'm still alive" without spinning up a full monitoring stack. pg-heartbeat does exactly that: a `HeartbeatHandle` writes timestamped rows to a Postgres (or any SQLAlchemy-supported) database, auto-populating hostname, version, and uptime on every `beat()`. You get a queryable history of each service's liveness without operating Prometheus, StatsD, or anything in between.

It plays well with multiple replicas via an `instance_id` field, so each container or worker can record its own beats and you can scope `latest()` / `history()` queries to a specific instance. A sibling project to [pg-task-tracker](/projects/pg-task-tracker) — same philosophy: lean on the database you already have.
