# SingkatSaja Development Guide

## 🎯 Project Core

- **App:** SingkatSaja
- **Type:** URL Shortener Platform (Bitly Clone)
- **Scope:** Backend, Database, API, Redis Cache, Queue, Inertia Pages, React Components, Dashboard Analytics.
- **Constraint:** NO new features, NO business flow changes, NO architecture changes without explicit approval.

---

## ⚠️ Hard Rules

- **Redirect Performance:** Redirect requests MUST prioritize Redis and avoid relational database lookups whenever possible.
- **Analytics Collection:** Redirect responses MUST NOT wait for analytics processing.
- **Custom Alias:** Custom aliases MUST use the existing `short_code` field. Never create a separate `custom_alias` column.
- **Link Ownership:** Users may only manage their own links.
- **Expiration:** Expired links MUST NOT redirect.
- **Reserved Aliases:** The following aliases are forbidden:

```text
login
register
logout
dashboard
settings
analytics
links
api
admin
```

- **Soft Delete:** Links MUST use soft deletes.
- **Authentication:** Use existing Laravel Fortify implementation. Never install Laravel Breeze.

---

## 🏗️ Architecture Rules

### Request Traffic Separation

#### Path A — Dashboard Traffic

Purpose:

- Authentication
- Link Management
- Analytics Dashboard
- Profile Management

Characteristics:

- Low traffic
- PostgreSQL allowed
- Redis allowed

#### Path B — Redirect Engine

Purpose:

- GET /{short_code}

Characteristics:

- High traffic
- Redis-first architecture
- Database access only on cache miss
- Analytics processing must be asynchronous

---

## 🗄️ Database Rules

### Users

Use existing Laravel users table.

### Links

Required fields:

```text
id
user_id
short_code
destination_url
expires_at
created_at
updated_at
deleted_at
```

Rules:

- short_code must be unique among active links.
- custom aliases are stored in short_code.
- soft deletes enabled.

### Click Events

Required fields:

```text
id
link_id
browser
device_type
platform
country
referer
clicked_at
```

Rules:

- append-only table
- no updates
- analytics source of truth

### Daily Stats

Required fields:

```text
id
link_id
date
clicks_count
created_at
updated_at
```

Rules:

- aggregated analytics table
- dashboard queries should use this table
- support PostgreSQL UPSERT

---

## 🚀 Redis Rules

### Redirect Cache

Key:

```text
short:{code}
```

Value:

```json
{
    "id": 1,
    "destination_url": "https://example.com",
    "expires_at": "2026-12-31T00:00:00Z"
}
```

Rules:

- redirect must hit Redis first
- cache miss may query PostgreSQL
- cache must be rebuilt after miss

### Rate Limiter

Redis must be used for:

```text
link creation
alias validation
redirect abuse protection
```

### Queue

Redis must be used for:

```text
analytics processing
aggregation jobs
future background jobs
```

---

## 📊 Analytics Rules

Dashboard MUST read from:

```text
daily_stats
```

Dashboard MUST NOT aggregate directly from:

```text
click_events
```

Analytics processing flow:

```text
Redirect
→ Queue Job
→ Click Event Insert
→ Daily Stats Upsert
```

Analytics collection must never block redirects.

---

## 🎨 Frontend Rules

Framework:

```text
Inertia.js
React
TypeScript
```

Design Source:

```text
DESIGN.md
```

Requirements:

- Mobile responsive
- Minimalist interface
- Fast page loads
- Reusable components
- Type-safe forms

---

## 🔒 Security Rules

Validation requirements:

- destination_url must be a valid URL
- short_code must be sanitized
- reserved aliases must be blocked

Authorization requirements:

- users can only modify their own links
- unauthorized access must return proper HTTP responses

Never trust frontend validation.

Always validate on backend.

---

## ⚡ Performance Rules

Preferred order:

```text
Redis
↓
PostgreSQL
```

Avoid:

- N+1 queries
- unnecessary eager loading
- analytics calculations during page render
- synchronous analytics logging

Optimize for:

- redirect latency
- dashboard responsiveness
- queue throughput

---

## ✅ Expected Output

Generate production-oriented code following:

- Laravel best practices
- Thin Controllers
- Action-based business logic
- Form Request validation
- Policy-based authorization
- Service container dependency injection
- PostgreSQL optimization
- Redis-first redirect architecture

Rules:

- Be concise.
- Output code first.
- Avoid tutorials.
- Avoid speculative features.
- Avoid overengineering.
- Do not change architecture without approval.
- Follow documentation before generating code.
- Prefer maintainability over cleverness.
