---
title: "CraigVault"
description: "A password-protected text editor in a single HTML file — AES-256-GCM, scrypt key derivation, local-only, zero dependencies."
date: 2026-09-11
role: "Author"
repo: "https://github.com/craig-stevenson/craigvault"
draft: false
---

Most "secure notes" apps ask you to trust a service. CraigVault has nothing to trust: it is one static `index.html` that never makes a network request. Encryption and decryption run in the browser through the Web Crypto API, and the password lives only in a JavaScript variable that dies with the tab. Download the file, open it, start typing. That's the whole install.

Documents are saved as encrypted `.txt` files — a short plain-English preamble, then AES-256-GCM ciphertext as base64 between two markers, so a note survives being pasted into an email and pulled back out. Keys are derived with scrypt at 32 MB per guess, the KDF parameters are versioned into an authenticated header so costs can be raised later without breaking old vaults, and a tampered file fails to decrypt rather than yielding garbage. A one-click **Share** bundles the app and a document into a self-contained `.html` for someone who doesn't have CraigVault. Every release is byte-identical to `index.html` at its tag, ships only if the headless-Chrome test suite passed, and comes with `SHA256SUMS` and a GitHub build attestation.
