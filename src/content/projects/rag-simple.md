---
title: "rag-simple"
description: "A minimal RAG pipeline built with LangChain and ChromaDB — load documents, embed with OpenAI, query with GPT-4o-mini."
date: 2025-07-17
role: "Author"
repo: "https://github.com/craig-stevenson/rag-simple"
draft: false
---

A compact, end-to-end RAG (retrieval-augmented generation) pipeline. It ingests documents from web sources and PDFs, embeds them with OpenAI's `text-embedding-3-large` model, and stores the vectors in a persisted ChromaDB collection so the index is built once and reused on subsequent runs.

Query answering uses GPT-4o-mini against the retrieved context. The PDF utility module is intentionally split out so it can be used independently to chunk or convert PDFs to Markdown. A small, deliberate codebase — useful as a starting point for anyone learning the LangChain + Chroma flow without wading through a heavier framework.
