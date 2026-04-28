# Query Parameter Schema v3

This document describes how to build report URLs for `scheme_version=3`. The format remains supported for existing integrations. For new integrations, use [docs/query-parameters-v4.md](query-parameters-v4.md).

## Version support

The web app selects a parser by `scheme_version`.

| Schema | Status | Notes |
| --- | --- | --- |
| `v4` | Current | Recommended for new integrations |
| `v3` | Supported | Existing integrations may continue using this format |

## Base URL

```text
https://reports.adguard.com/new_issue.html?<parameters>
```

## Encoding rules

1. Nested objects are flattened with dot notation, for example `dns.enabled`.
2. Some list-like values are encoded as delimiter-separated strings instead of typed arrays.
3. Boolean values use `true` and `false`.
4. Values should be URL-encoded when needed.
5. Unknown or deprecated parameters are ignored by the parser.

## Parameter reference

### Main parameters

| Parameter | Type | Format or example | Description | Platform | Notes |
| --- | --- | --- | --- | --- | --- |
| `scheme_version` | integer | `3` | Schema version | All | Required |
| `product_type` | string | `win`, `mac`, `mmini`, `and`, `ios`, `ext`, `saf`, `con`, `dns`, `other` | Product identifier | All | |
| `product_version` | string | `7.15.2` | Product version string | All | |
| `system_version` | string | `11.0.1` | OS version string | All | |
| `url` | string | `https%3A%2F%2Fexample.com` | Target page being reported | All | |
| `filters` | string | `2.3.4.224` | Dot-separated list of filter IDs | All | Delimiter `.` |
| `filters_last_update` | string | `2025-10-31-18-00-00` | Timestamp in UTC | All | |
| `custom_filters` | string | Comma-separated list | User-added filters | All | Delimiter `,` |
| `userscripts` | string | Comma-separated list | Enabled userscripts or Android extensions equivalent | All | Delimiter `,` |
| `license_type` | string | `paid`, `free` | License kind | All | |
| `user_agent` | string | Browser UA string | Client identification | All | |
| `browser` | string | `chrome`, `edge`, `firefox`, `opera`, `safari`, `yandex`, `other`, `firefox mobile`, `firefox preview`, `uc browser`, `yandex lite`, `samsung browser`, `duckduckgo`, `vivaldi`, `brave` | Browser name | All | |
| `browser_detail` | string | `Midori/1.0` | Other browser details | All | |
| `manifest_version` | integer | `2` or `3` | Chrome manifest version | Ext | |

### DNS parameters

| Parameter | Type | Format or example | Description | Platform | Notes |
| --- | --- | --- | --- | --- | --- |
| `dns.enabled` | boolean | `true`, `false` | Whether DNS protection or proxy module is enabled | All | |
| `dns.filters` | string | Desktop: `2.3.4`, Mobile: URLs | DNS filters applied | All | Platform-dependent format |
| `dns.servers` | string | Desktop: IPs or `System`, Mobile: URLs | Active DNS servers | All | Delimiter `,` |
| `dns.bootstrap` | string | `1.1.1.1,8.8.8.8` | Bootstrap servers | All | Delimiter `,` |
| `dns.fallback` | string | `8.8.4.4,1.0.0.1` | Fallback servers | All | Delimiter `,` |
| `dns.timeout` | integer | `5000` | Timeout in ms | All | |
| `dns.custom_bootstrap` | string | `1.1.1.1` | Custom bootstrap DNS servers list | Win, Mac | Delimiter `,` or `\n` |
| `dns.custom_fallback` | string | `8.8.8.8` | Custom fallback DNS servers list | Win, Mac | Delimiter `,` or `\n` |
| `dns.custom_filters` | string | `[Name] (url: [URL])` | Custom DNS filters | Win, Mac | Delimiter `,` |
| `dns.fallback_mode` | string | `System`, `Custom`, `None` | DNS fallback behavior | Win, Mac | |

### Extensions and feature flags

| Parameter | Type | Format or example | Description | Platform | Notes |
| --- | --- | --- | --- | --- | --- |
| `extensions` | string | `[Name] ([type]; url: [URL])` | List of enabled extensions | Win, Mac | Delimiter `,` |
| `extensions.enabled` | boolean | `true`, `false` | Whether extensions are enabled | Win, Mac | |
| `adblocking.enabled` | boolean | `true`, `false` | Ad blocking feature state | Win, Mac | |
| `browsing_security.enabled` | boolean | `true`, `false` | Safe browsing enabled | Win, Mac, And, iOS | Excluded for MV3 |
| `browsing_security.statistics_enabled` | boolean | `true`, `false` | Collect usage statistics | Win, Mac | |

### Stealth parameters

| Parameter | Type | Format or example | Description | Platform | Notes |
| --- | --- | --- | --- | --- | --- |
| `stealth.enabled` | boolean | `true`, `false` | Stealth mode status | All | |
| `stealth.block_trackers` | boolean | `true`, `false` | Block trackers | All | |
| `stealth.block_third_party_auth` | boolean | `true`, `false` | Block third-party auth | Win, Mac | |
| `stealth.disable_third_party_cache` | boolean | `true`, `false` | Disable third-party cache | Win, Mac | |
| `stealth.disable_wap_push_message_routing_service` | boolean | `true`, `false` | Disable WAP Push Routing | Win | |
| `stealth.disable_windows_defender` | boolean | `true`, `false` | Disable Windows Defender | Win | |
| `stealth.disable_windows_telemetry` | boolean | `true`, `false` | Disable Windows telemetry | Win | |
| `stealth.disable_windows_recall` | boolean | `true`, `false` | Disable Windows Recall | Win | |
| `stealth.flash` | boolean | `true`, `false` | Block Flash | Win, Mac | |
| `stealth.java` | boolean | `true`, `false` | Block Java | Win, Mac | |
| `stealth.location` | boolean | `true`, `false` | Block Location API | Win, Mac | |
| `stealth.push` | boolean | `true`, `false` | Block Push API | Win, Mac | |
| `stealth.turn_off_advertising_id` | boolean | `true`, `false` | Turn off Advertising ID | Win | |
| `stealth.x_client` | boolean | `true`, `false` | Remove X-Client-Data header | Win, Mac | |
| `stealth.dpi` | boolean | `true`, `false` | Hide TLS SNI | Win, Mac | |
| `stealth.ip` | string | Custom IP address | IP spoofing value | Win | |
| `stealth.referrer` | string | Custom Referer header | Set custom Referer | Win, Mac | |
| `stealth.user_agent` | string | Custom UA string | Spoofed user agent | Win, Mac | |
| `stealth.first_party_cookies` | integer | TTL in minutes | First-party cookie TTL | Win, Mac | |
| `stealth.third_party_cookies` | integer | TTL in minutes | Third-party cookie TTL | Win, Mac | |
| `stealth.block_webrtc` | boolean | `true`, `false` | Block WebRTC | All | |
| `stealth.strip_url` | boolean | `true`, `false` | Remove URL parameters | All | |
| `stealth.hide_search_queries` | boolean | `true`, `false` | Hide search queries | All | |
| `stealth.send_dnt` | boolean | `true`, `false` | Send Do Not Track | All | |
| `stealth.self_destruct_cookies` | integer | `15` | TTL in minutes | All | |

### Platform-specific parameters

| Parameter | Type | Format or example | Description | Platform | Notes |
| --- | --- | --- | --- | --- | --- |
| `win.wfp` | boolean | `true`, `false` | Windows Filtering Platform | Win | |
| `android.mode` | string | `VPN`, `Proxy` | Operation mode | And | |
| `android.method` | string | `Full`, `Simple` | Filtering method | And | |
| `android.https_filtering` | boolean | `true`, `false` | HTTPS filtering active | And | |
| `android.root` | boolean | `true`, `false` | Root status | And | |
| `is_third_party_cookies` | boolean | `true`, `false` | Self-destructing third-party cookies flag | And | |
| `is_first_party_cookies` | boolean | `true`, `false` | Self-destructing first-party cookies flag | And | |

### Deprecated parameters

| Parameter | Type | Format or example | Description | Platform | Notes |
| --- | --- | --- | --- | --- | --- |
| `parental_control.enabled` | boolean | `true`, `false` | Parental control enabled | Win, Mac | |
| `parental_control.block_exe` | boolean | `true`, `false` | Block executable downloads | Win, Mac | |
| `parental_control.safe_search` | boolean | `true`, `false` | Enforce Safe Search | Win, Mac | |

## Tracking parameters

These parameters are not used by the report form itself but may appear in URLs as part of analytics or source tracking.

| Parameter | Type | Example | Description |
| --- | --- | --- | --- |
| `action` | string | `report` | Marks the action context for analytics |
| `from` | string | `popup`, `background` | Indicates the request origin |
| `app` | string | `browser_extension` | Application name |

## Validation rules

- Unknown or deprecated parameters are ignored.
- Missing optional parameters default to `false` or empty values.
- For `manifest_version=3`, `browsing_security.*` parameters are omitted.

## Examples

### Windows example

```text
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=Win&product_version=7.15.2&system_version=Microsoft%20Windows%2011&url=https%3A%2F%2Fexample.com&filters=2.3.4.224&filters_last_update=2025-10-31-12-00-00&custom_filters=User%20rules%20(url%3A%20none)&userscripts=DarkMode&dns.enabled=true&dns.filters=adguard-dns&dns.servers=System&dns.custom_bootstrap=1.1.1.1%2C8.8.8.8&dns.fallback=8.8.4.4%2C1.0.0.1&dns.timeout=5000&adblocking.enabled=true&browsing_security.enabled=true&browsing_security.statistics_enabled=true&extensions.enabled=true&extensions=AdGuard%20Assistant%20(script%3B%20url%3A%20https%3A%2F%2Fexample.com)&license_type=paid&win.wfp=true&parental_control.enabled=true&parental_control.block_exe=false&parental_control.safe_search=true&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.block_third_party_auth=true&stealth.disable_windows_defender=true&stealth.disable_windows_recall=true&stealth.disable_windows_telemetry=true&stealth.turn_off_advertising_id=true&stealth.hide_search_queries=true&stealth.x_client=true&stealth.flash=true&stealth.java=true&stealth.push=true&stealth.block_webrtc=true&stealth.dpi=true&stealth.send_dnt=true&stealth.first_party_cookies=15&stealth.third_party_cookies=30
```

### macOS example

```text
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=Mac&product_version=2.14.0&system_version=macOS%2015.0&url=https%3A%2F%2Fads.example.com&filters=2.4.5.50&filters_last_update=2025-10-31-10-00-00&custom_filters=Custom%20List%20(url%3A%20https%3A%2F%2Fexample.org%2Ffilter.txt)&dns.enabled=true&dns.filters=adguard-dns&dns.servers=System&dns.timeout=3000&browsing_security.enabled=true&browsing_security.statistics_enabled=true&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.hide_search_queries=true&stealth.send_dnt=true&stealth.block_webrtc=true&stealth.self_destruct_cookies=10
```

### Android example

```text
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=And&product_version=4.3&system_version=Android%2015&url=https%3A%2F%2Fexample.org&filters=2.3.4.200&filters_last_update=2025-10-31-11-00-00&custom_filters=Mobile%20Rules%20(url%3A%20none)&dns.enabled=true&dns.filters=adguard-dns&dns.servers=System&dns.timeout=4000&browsing_security.enabled=true&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.block_webrtc=true&stealth.send_dnt=true&android.mode=VPN&android.method=Full&android.https_filtering=true&android.root=false
```

### iOS example

```text
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=iOS&product_version=4.5.1&system_version=iOS%2018.0&url=https%3A%2F%2Fnews.example.com&filters=2.3.4.205&filters_last_update=2025-10-31-09-00-00&dns.enabled=true&dns.filters=adguard-dns&browsing_security.enabled=true&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.send_dnt=true
```

### Browser extension example

```text
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=Ext&product_version=5.0.1&manifest_version=3&system_version=Chrome%20128.0.6613.114&browser=chrome&url=https%3A%2F%2Fexample.net&filters=2.3.4.300&filters_last_update=2025-10-31-14-00-00&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.hide_search_queries=true&stealth.send_dnt=true&stealth.block_webrtc=true
```
