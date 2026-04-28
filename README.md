# AdGuard Sitereport website

## Overview

Receives structured query parameters from AdGuard products (Windows, macOS, Android, iOS, Browser Extensions) to prefill the report form for broken websites or missed ads.

Base URL:

```text
https://reports.adguard.com/new_issue.html
```

## Documentation layout

Schema-specific details are documented separately so the root README stays stable when the query format evolves.

| Schema | Status | Documentation |
| --- | --- | --- |
| `v4` | Current | [docs/query-parameters-v4.md](docs/query-parameters-v4.md) |
| `v3` | Supported | [docs/query-parameters-v3.md](docs/query-parameters-v3.md) |

Use `scheme_version=4` for all new integrations. `scheme_version=3` remains supported and documented for long-lived integrations that are not migrating yet.

## Tracking parameters

These parameters are not part of the strict schema but may appear in links for analytics or request source tracking:

| Parameter | Type | Example | Description |
| --- | --- | --- | --- |
| `action` | string | `report` | Action context used for analytics |
| `from` | string | `popup`, `background` | Request origin |
| `app` | string | `browser_extension` | Application name |

## v4 at a glance

- Nested objects are flattened with dot notation, for example `dns.enabled`.
- Arrays are passed as comma-separated values, for example `regular_filters=1,2,3`.
- Values are URL-encoded, commas between array items stay unescaped, and booleans use `1` and `0` instead of `true` and `false`.

See [docs/query-parameters-v3.md](docs/query-parameters-v3.md) for the full v3 reference and [docs/query-parameters-v4.md](docs/query-parameters-v4.md) for the full v4 reference, encoding rules, and the v3 to v4 migration guide.
