# Query Parameter Schema v4

This document describes how to build report URLs for `scheme_version=4` and how to migrate from `v3`. For the full `v3` reference, see [docs/query-parameters-v3.md](query-parameters-v3.md).

## Version support

The web app selects a parser by `scheme_version`.

| Schema | Status | Notes |
| --- | --- | --- |
| `v4` | Current | Use for all new integrations |
| `v3` | Supported | Use [docs/query-parameters-v3.md](query-parameters-v3.md) for the legacy format reference |

## Base URL

```text
https://reports.adguard.com/new_issue.html?<parameters>
```

## Encoding rules

1. Nested objects are flattened with dot notation, for example `dns.enabled`.
2. Arrays are passed as comma-separated values.
3. Values must be URL-encoded, except commas that separate array items.
4. Boolean values are encoded as `1` and `0`.
5. Parameters marked as `outside schema` are additional query parameters used during report creation and are not part of the strict settings schema.

## Example

```text
https://reports.adguard.com/new_issue.html?scheme_version=4&product_type=win&product_version=7.15.0&system_version=Windows%2011&url=https%3A%2F%2Fexample.com&regular_filters=1,2,3,14&dns.enabled=1&dns.regular_filters=1,2,3&dns.servers=8.8.8.8,8.8.4.4&extensions.enabled=1&extensions.value=AdGuard%20Assistant%20(script)&stealth.enabled=1&stealth.block_webrtc=1&ext.manifest_version=3&win.driver_type=wfp&browser=chrome&license_type=paid
```

## Parameter reference

Parameters marked as `(outside schema)` are additional query parameters used during report creation and are not part of the strict settings schema.

### Core parameters

#### `scheme_version`

- Type: integer, required
- Description: Schema version. Minimum supported value for this format is `4`
- Example: `4`

#### `product_type`

- Type: string
- Enum: `win`, `mac`, `mmini`, `and`, `ios`, `ext`, `saf`, `con`, `dns`, `other`
- Description: Product identifier
- Example: `win`

#### `product_version`

- Type: string
- Description: Product version
- Example: `7.15.0`

#### `system_version`

- Type: string
- Description: Operating system version
- Example: `Windows 11`

#### `url`

- Type: string, URI (outside schema)
- Description: Target page URL, URL-encoded
- Example: `https%3A%2F%2Fexample.com`

#### `regular_filters`

- Type: integer array
- Description: Regular filter IDs passed as comma-separated values
- Example: `1,2,3,14`

#### `filters_last_update`

- Type: string, ISO 8601
- Description: UTC timestamp of the last filter update
- Example: `2024-01-15T10:30:00Z`

#### `custom_filters`

- Type: string array
- Description: Custom filters in the format `[Name] (url: [URL])`, passed as comma-separated values. The name may be empty, for example `(url: https://example.com/filter.txt)`. The URL may also be omitted, in which case only the name is passed, for example `My Filter`
- Example: `My%20Filter%2C%20v2%20(url%3A%20https%3A%2F%2Fexample.com%2Ffilter.txt),(url%3A%20https%3A%2F%2Fexample.com%2Fother.txt)`
- Decoded example: `My Filter, v2 (url: https://example.com/filter.txt),(url: https://example.com/other.txt)`
- Notes: Encode commas inside filter names as `%2C` so they are not treated as array separators

#### `license_type`

- Type: string
- Enum: `paid`, `free`
- Description: License type
- Example: `paid`

#### `user_agent`

- Type: string (outside schema)
- Description: Browser user agent string, URL-encoded
- Example: `Mozilla%2F5.0...`

#### `browser`

- Type: string (outside schema)
- Enum: `chrome`, `edge`, `firefox`, `opera`, `safari`, `yandex`, `other`, `firefox mobile`, `firefox preview`, `uc browser`, `yandex lite`, `yandex start`, `samsung browser`, `duckduckgo`, `vivaldi`, `brave`
- Description: Browser name. If the received value does not match any supported enum value, it should fall back to `other`
- Example: `chrome`

#### `browser_detail`

- Type: string (outside schema)
- Description: Additional browser information
- Example: `Chrome%20120.0`

#### `action`

- Type: string (outside schema)
- Description: Action context used for analytics
- Example: `report`

#### `from`

- Type: string (outside schema)
- Description: Request source
- Example: `menu`

#### `app`

- Type: string (outside schema)
- Description: Application name
- Example: `AdGuard`

### DNS parameters

#### `dns.enabled`

- Type: boolean (`1` or `0`)
- Description: DNS protection enabled
- Example: `1`

#### `dns.regular_filters`

- Type: integer array
- Description: DNS filter IDs passed as comma-separated values
- Example: `1,2,3`

#### `dns.servers`

- Type: string array
- Description: Active DNS servers
- Example: `8.8.8.8,8.8.4.4`

#### `dns.bootstrap`

- Type: string array
- Description: Bootstrap servers
- Example: `1.1.1.1`

#### `dns.fallback`

- Type: string array
- Description: Fallback servers
- Example: `9.9.9.9`

#### `dns.timeout`

- Type: integer
- Description: Timeout in milliseconds
- Example: `5000`

#### `dns.custom_bootstrap`

- Type: string array
- Platform: Win, Mac
- Description: Custom bootstrap servers
- Example: `1.1.1.1,8.8.8.8`

#### `dns.custom_fallback`

- Type: string array
- Platform: Win, Mac
- Description: Custom fallback servers
- Example: `9.9.9.9`

#### `dns.custom_filters`

- Type: string array
- Platform: Win, Mac
- Description: Custom DNS filters in the format `[Name] (url: [URL])`. The name may be omitted, for example `(url: https://example.com/filter.txt)`. The URL may also be omitted, in which case only the name is passed, for example `My DNS Filter`
- Example: `MyFilter%20(url%3A%20https%3A%2F%2Fexample.com%2Ffilter.txt)`

#### `dns.fallback_mode`

- Type: string
- Platform: Win, Mac
- Enum: `System`, `Custom`, `None`
- Description: DNS fallback mode
- Example: `System`

### Extensions and feature flags

#### `extensions.enabled`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Extensions feature flag
- Example: `1`

#### `extensions.value`

- Type: string array
- Platform: Win, Mac
- Description: Installed extensions passed as comma-separated values. Each entry uses the format `Name (type; url: URL|none)`, where `type` is `script` or `style`
- Format: `Name1 (script; url: URL),Name2 (style; url: URL),Name3 (script; url: none),(script; url: https://example.com),Name4 (script)`
- Example: `Assistant%20(script%3B%20url%3A%20https%3A%2F%2Fexample.com),Dark%20Theme%20(style)`
- Notes: The parser splits entries into scripts and styles by the `script` or `style` marker. Local entries may use `url: none`, and the name may be omitted, for example `(script; url: https://example.com)`

#### `adblocking.enabled`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Ad blocking enabled
- Example: `1`

#### `browsing_security.enabled`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac, And, iOS
- Description: Safe browsing enabled
- Example: `1`

#### `browsing_security.statistics_enabled`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Safe browsing statistics enabled
- Example: `0`

### Stealth parameters

#### `stealth.enabled`

- Type: boolean (`1` or `0`)
- Description: Stealth mode enabled
- Example: `1`

#### `stealth.block_trackers`

- Type: boolean (`1` or `0`)
- Description: Block trackers
- Example: `1`

#### `stealth.block_third_party_auth`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Block third-party authorization
- Example: `1`

#### `stealth.disable_third_party_cache`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Disable third-party cache
- Example: `1`

#### `stealth.flash`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Block Flash
- Example: `1`

#### `stealth.java`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Block Java
- Example: `1`

#### `stealth.location`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Block Location API
- Example: `1`

#### `stealth.push`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Block Push API
- Example: `1`

#### `stealth.x_client`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Remove `X-Client-Data`
- Example: `1`

#### `stealth.dpi`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Hide TLS SNI
- Example: `1`

#### `stealth.referrer`

- Type: string
- Platform: Win, Mac
- Description: Custom Referer header
- Example: `https%3A%2F%2Fexample.com`

#### `stealth.user_agent`

- Type: string
- Platform: Win, Mac
- Description: Spoofed user agent
- Example: `Mozilla%2F5.0...`

#### `stealth.first_party_cookies_min`

- Type: integer
- Platform: Win, Mac
- Description: First-party cookie TTL in minutes
- Example: `60`

#### `stealth.third_party_cookies_min`

- Type: integer
- Platform: Win, Mac
- Description: Third-party cookie TTL in minutes
- Example: `30`

#### `stealth.block_webrtc`

- Type: boolean (`1` or `0`)
- Description: Block WebRTC
- Example: `1`

#### `stealth.strip_url`

- Type: boolean (`1` or `0`)
- Description: Remove URL parameters
- Example: `1`

#### `stealth.hide_search_queries`

- Type: boolean (`1` or `0`)
- Description: Hide search queries
- Example: `1`

#### `stealth.send_dnt`

- Type: boolean (`1` or `0`)
- Description: Send Do Not Track
- Example: `1`

#### `stealth.self_destruct_cookies_min`

- Type: integer
- Description: Self-destruct cookie TTL in minutes
- Example: `10`

### Platform-specific parameters

#### `ext.manifest_version`

- Type: integer
- Platform: Ext
- Enum: `2`, `3`
- Description: Chrome manifest version
- Example: `3`

#### `win.driver_type`

- Type: string
- Platform: Win
- Enum: `wfp`, `tdi`, `sockfilter`
- Description: Network driver type
- Example: `wfp`

#### `win.disable_wap_push_message_routing_service`

- Type: boolean (`1` or `0`)
- Platform: Win
- Description: Disable WAP Push Routing Service
- Example: `1`

#### `win.disable_windows_defender`

- Type: boolean (`1` or `0`)
- Platform: Win
- Description: Disable Windows Defender
- Example: `1`

#### `win.disable_windows_telemetry`

- Type: boolean (`1` or `0`)
- Platform: Win
- Description: Disable Windows telemetry
- Example: `1`

#### `win.disable_windows_recall`

- Type: boolean (`1` or `0`)
- Platform: Win
- Description: Disable Windows Recall
- Example: `1`

#### `win.turn_off_advertising_id`

- Type: boolean (`1` or `0`)
- Platform: Win
- Description: Turn off Advertising ID
- Example: `1`

#### `win.ip`

- Type: string
- Platform: Win
- Description: Custom IP for spoofing
- Example: `192.168.1.100`

#### `mmini.advanced_rules`

- Type: boolean (`1` or `0`)
- Platform: Mmini
- Description: Advanced rules enabled
- Example: `1`

#### `android.mode`

- Type: string
- Platform: And
- Enum: `VPN`, `Proxy`
- Description: Operation mode
- Example: `VPN`

#### `android.method`

- Type: string
- Platform: And
- Enum: `Full`, `Simple`
- Description: Filtering method
- Example: `Full`

#### `android.https_filtering`

- Type: boolean (`1` or `0`)
- Platform: And
- Description: HTTPS filtering active
- Example: `1`

#### `android.root`

- Type: boolean (`1` or `0`)
- Platform: And
- Description: Root status
- Example: `0`

#### `android.is_third_party_cookies`

- Type: boolean (`1` or `0`)
- Platform: And
- Description: Self-destruct third-party cookies
- Example: `1`

#### `android.is_first_party_cookies`

- Type: boolean (`1` or `0`)
- Platform: And
- Description: Self-destruct first-party cookies
- Example: `1`

### Deprecated parameters

#### `parental_control.enabled`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Parental control enabled
- Example: `1`

#### `parental_control.block_exe`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Block executable downloads
- Example: `1`

#### `parental_control.safe_search`

- Type: boolean (`1` or `0`)
- Platform: Win, Mac
- Description: Enforce Safe Search
- Example: `1`

## URL examples

These examples show complete `v4` URLs for the most common product families. They use lowercase `product_type` values, comma-separated arrays, and `1` or `0` boolean values.

### Windows example

```text
https://reports.adguard.com/new_issue.html?scheme_version=4&product_type=win&product_version=7.15.0&system_version=Windows%2011&url=https%3A%2F%2Fexample.com&regular_filters=1,2,3,14&filters_last_update=2024-01-15T10%3A30%3A00Z&dns.enabled=1&dns.regular_filters=1,2,3&dns.servers=8.8.8.8,8.8.4.4&dns.timeout=5000&adblocking.enabled=1&browsing_security.enabled=1&browsing_security.statistics_enabled=1&extensions.enabled=1&extensions.value=AdGuard%20Assistant%20(script%3B%20url%3A%20none)&license_type=paid&win.driver_type=wfp&win.disable_windows_defender=1&win.disable_windows_recall=1&stealth.enabled=1&stealth.block_trackers=1&stealth.block_third_party_auth=1&stealth.hide_search_queries=1&stealth.block_webrtc=1&stealth.send_dnt=1&stealth.first_party_cookies_min=15&stealth.third_party_cookies_min=30
```

### macOS example

```text
https://reports.adguard.com/new_issue.html?scheme_version=4&product_type=mac&product_version=2.14.0&system_version=macOS%2015.0&url=https%3A%2F%2Fads.example.com&regular_filters=2,4,5,50&filters_last_update=2024-01-15T10%3A00%3A00Z&custom_filters=Custom%20List%20(url%3A%20https%3A%2F%2Fexample.org%2Ffilter.txt)&dns.enabled=1&dns.regular_filters=1,2&dns.servers=94.140.14.14,94.140.15.15&dns.timeout=3000&browsing_security.enabled=1&browsing_security.statistics_enabled=1&stealth.enabled=1&stealth.block_trackers=1&stealth.strip_url=1&stealth.hide_search_queries=1&stealth.send_dnt=1&stealth.block_webrtc=1&stealth.self_destruct_cookies_min=10
```

### Android example

```text
https://reports.adguard.com/new_issue.html?scheme_version=4&product_type=and&product_version=4.3.0&system_version=Android%2015&url=https%3A%2F%2Fexample.org&regular_filters=2,3,4,200&filters_last_update=2024-01-15T11%3A00%3A00Z&dns.enabled=1&dns.regular_filters=1,2&dns.servers=https%3A%2F%2Fdns.adguard-dns.com%2Fdns-query&dns.timeout=4000&browsing_security.enabled=1&stealth.enabled=1&stealth.block_trackers=1&stealth.strip_url=1&stealth.block_webrtc=1&stealth.send_dnt=1&android.mode=VPN&android.method=Full&android.https_filtering=1&android.root=0&android.is_third_party_cookies=1&android.is_first_party_cookies=1
```

### iOS example

```text
https://reports.adguard.com/new_issue.html?scheme_version=4&product_type=ios&product_version=4.5.1&system_version=iOS%2018.0&url=https%3A%2F%2Fnews.example.com&regular_filters=2,3,4,205&filters_last_update=2024-01-15T09%3A00%3A00Z&dns.enabled=1&dns.regular_filters=1,2&browsing_security.enabled=1&stealth.enabled=1&stealth.block_trackers=1&stealth.strip_url=1&stealth.send_dnt=1
```

### Browser extension example

```text
https://reports.adguard.com/new_issue.html?scheme_version=4&product_type=ext&product_version=5.0.1&system_version=Chrome%20128.0.6613.114&browser=chrome&browser_detail=Chrome%20128.0.6613.114&url=https%3A%2F%2Fexample.net&regular_filters=2,3,4,300&filters_last_update=2024-01-15T14%3A00%3A00Z&ext.manifest_version=3&stealth.enabled=1&stealth.block_trackers=1&stealth.strip_url=1&stealth.hide_search_queries=1&stealth.send_dnt=1&stealth.block_webrtc=1
```

## Adding new parameters

### Safe changes

These changes are backward-compatible and can usually be shipped without coordinated client updates:

- Add a new optional property
- Add a new enum value if clients already handle unknown enum values safely
- Relax validation, for example by increasing `maximum` or removing `minLength`
- Add a new nested namespace, for example `mac.*`

### Breaking changes

These changes require coordinated client updates and a schema version bump:

- Remove a property
- Rename a property
- Change a property type
- Change the element type inside an array
- Add a new required property
- Tighten validation, for example by adding an `enum` or lowering a `maximum`
- Move a property between namespaces

### Checklist

1. Add the property to the v4 schema used by the web app.
2. Document the property in this file with its type, format, and example.
3. Update the migration guide if the change is breaking.
4. Coordinate client changes before increasing the minimum supported `scheme_version`.

## Migration guide: v3 to v4

Both versions are supported. The web app reads `scheme_version` from the query string and uses the matching parser, so clients can migrate incrementally.

### Renamed parameters

| v3 | v4 | Notes |
| --- | --- | --- |
| `filters` | `regular_filters` | Dot-separated string became an integer array encoded with commas |
| `dns.filters` | `dns.regular_filters` | Normalized to typed DNS filter IDs |
| `stealth.DNT` | `stealth.send_dnt` | Naming aligned with behavior |
| `stealth.webrtc` | `stealth.block_webrtc` | Naming aligned with behavior |
| `stealth.first_party_cookies` | `stealth.first_party_cookies_min` | Unit is minutes |
| `stealth.third_party_cookies` | `stealth.third_party_cookies_min` | Unit is minutes |
| `win.wfp` | `win.driver_type` | Boolean became enum: `wfp`, `tdi`, `sockfilter` |
| `manifest_version` | `ext.manifest_version` | Moved into the `ext.*` namespace |
| `android_system_root` | `android.root` | Moved into the `android.*` namespace |

### Moved parameters

| Previous location | New location | Notes |
| --- | --- | --- |
| `stealth.ip` | `win.ip` | Windows-specific parameter |
| `stealth.disable_wap_push_message_routing_service` | `win.disable_wap_push_message_routing_service` | Windows-specific parameter |
| `stealth.disable_windows_defender` | `win.disable_windows_defender` | Windows-specific parameter |
| `stealth.disable_windows_telemetry` | `win.disable_windows_telemetry` | Windows-specific parameter |
| `stealth.disable_windows_recall` | `win.disable_windows_recall` | Windows-specific parameter |
| `stealth.turn_off_advertising_id` | `win.turn_off_advertising_id` | Windows-specific parameter |
| `is_third_party_cookies` | `android.is_third_party_cookies` | Android-specific parameter |
| `is_first_party_cookies` | `android.is_first_party_cookies` | Android-specific parameter |
| `https_filtering` | `android.https_filtering` | Android-specific parameter |

### Array format changes

In `v4`, arrays are represented as comma-separated query values with logical typing.

| Parameter | v3 | v4 |
| --- | --- | --- |
| `regular_filters` | Dot-separated string | Integer array encoded with commas |
| `custom_filters` | Plain string with separators | String array encoded with commas |
| `dns.regular_filters` | Plain string | Integer array encoded with commas |
| `dns.servers` | Plain string with separators | String array encoded with commas |
| `dns.bootstrap` | Plain string with separators | String array encoded with commas |
| `dns.fallback` | Plain string with separators | String array encoded with commas |
| `dns.custom_bootstrap` | Comma- or newline-separated string | String array encoded with commas |
| `dns.custom_fallback` | Comma- or newline-separated string | String array encoded with commas |
| `dns.custom_filters` | Plain string with separators | String array encoded with commas |
| `extensions.value` | Legacy extension or userscript string formats | String array encoded with commas and typed entries |

### New in v4

- `stealth.self_destruct_cookies_min`
- `android.method`
- `extensions.value` as a typed extensions list
- `win.driver_type` as an enum instead of a boolean flag