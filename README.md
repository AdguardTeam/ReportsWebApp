# AdGuard Sitereport Website

## Overview

Receives structured query parameters from AdGuard products (Windows, macOS, Android, iOS, Browser Extensions) to prefill the report form for broken websites or missed ads.

https://reports.adguard.com/new_issue.html

---

## Parameters table

| Parameter | Type | Format / Example | Description | Platform | Notes |
|------------|------|------------------|--------------|-----------|--------|
| `scheme_version` | int | `3` | Defines schema version for parameters | All | Required. Current version: 3 |
| `product_type` | string | `Win`, `Mac`, `And`, `iOS`, `Ext` | Product identifier | All | Required |
| `product_version` | string | `7.15.2` | Product version string | All |  |
| `system_version` | string | `11.0.1` | OS version string | All |  |
| `url` | string | `https%3A%2F%2Fexample.com` | Target page being reported | All | |
| `filters` | string | `2.3.4.224` | Dot-separated list of filter IDs | All | Divider `.` used across all platforms |
| `filters_last_update` | string | `2025-10-31-18-00-00` | Timestamp in UTC | All | Consistent across products |
| `custom_filters` | string | Comma-separated list | User-added filters | All | Divider `,` uniform |
| `userscripts` | string | Comma-separated list | Enabled userscripts or Android extensions equivalent | All | Divider `,` uniform |
| `dns.enabled` | bool | `true` / `false` | Whether DNS protection or proxy module is enabled | All | Always present, replaces older optional behavior |
| `dns.filters` | string | Desktop: `2.3.4` (IDs), Mobile: URLs | DNS filters applied | All | Platform-dependent format |
| `dns.servers` | string | Desktop: IPs/System, Mobile: URLs | Active DNS servers | All | Platform-dependent format |
| `dns.bootstrap` | string | `1.1.1.1,8.8.8.8` | Bootstrap servers | All | Divider `,` |
| `dns.fallback` | string | `8.8.4.4,1.0.0.1` | Fallback servers | All | Divider `,` |
| `dns.timeout` | int | `5000` | Timeout in ms | All |  |
| `dns.custom_bootstrap` | string | `1.1.1.1` | Custom bootstrap DNS servers list | Win, Mac | Divider `,` or `\n` |
| `dns.custom_fallback` | string | `8.8.8.8` | Custom fallback DNS servers list | Win, Mac | Divider `,` or `\n` |
| `dns.custom_filters` | string | `[Name] (url: [URL])` | Custom DNS filters | Win, Mac | Divider `,` |
| `dns.fallback_mode` | string | `System` / `Custom` / `None` | DNS fallback behavior | Win, Mac |  |
| `extensions` | string | `[Name] ([type]; url: [URL])` | List of enabled extensions | Win, Mac | Divider `,` |
| `extensions.enabled` | bool | `true` / `false` | Whether extensions are enabled | Win, Mac | Always present, may be empty |
| `adblocking.enabled` | bool | `true` / `false` | Ad blocking feature state | Win, Mac |  |
| `parental_control.enabled` | bool | `true` / `false` | Parental control enabled | Win, Mac |  |
| `parental_control.block_exe` | bool | `true` / `false` | Block executable downloads | Win, Mac |  |
| `parental_control.safe_search` | bool | `true` / `false` | Enforce Safe Search | Win, Mac |  |
| `license_type` | string | `paid` / `free` | License kind | All |  |
| `user_agent` | string | Browser UA string | Client identification | All | Overrides browser fields |
| `browser` | string | `chrome` | Browser name | Ext | Optional |
| `browser_detail` | string | `128.0.6613.114` | Browser build details | Ext | Optional |
| `manifest_version` | int | `2` or `3` | Chrome manifest version | Ext | Browsing security excluded for MV3 |
| `win.wfp` | bool | `true` / `false` | Windows Filtering Platform | Win |  |
| `browsing_security.enabled` | bool | `true` / `false` | Safe browsing enabled | Win, Mac, And, iOS | Excluded for MV3 |
| `browsing_security.statistics_enabled` | bool | `true` / `false` | Collect usage statistics | Win, Mac |  |
| `stealth.enabled` | bool | `true` / `false` | Stealth mode status | All |  |
| `stealth.block_trackers` | bool | `true` / `false` | Block trackers | All |  |
| `stealth.block_third_party_auth` | bool | `true` / `false` | Block third-party auth | Win, Mac |  |
| `stealth.disable_third_party_cache` | bool | `true` / `false` | Disable 3rd party cache | Win, Mac |  |
| `stealth.disable_wap_push_message_routing_service` | bool | `true` / `false` | Disable WAP Push Routing | Win | Windows-specific service |
| `stealth.disable_windows_defender` | bool | `true` / `false` | Disable Windows Defender | Win |  |
| `stealth.disable_windows_telemetry` | bool | `true` / `false` | Disable Windows telemetry | Win |  |
| `stealth.disable_windows_recall` | bool | `true` / `false` | Disable Windows Recall | Win |  |
| `stealth.flash` | bool | `true` / `false` | Block Flash | Win, Mac |  |
| `stealth.java` | bool | `true` / `false` | Block Java | Win, Mac |  |
| `stealth.location` | bool | `true` / `false` | Block Location API | Win, Mac |  |
| `stealth.push` | bool | `true` / `false` | Block Push API | Win, Mac |  |
| `stealth.turn_off_advertising_id` | bool | `true` / `false` | Turn off Advertising ID | Win |  |
| `stealth.x_client` | bool | `true` / `false` | Remove X-Client-Data header | Win, Mac |  |
| `stealth.dpi` | bool | `true` / `false` | Hide TLS SNI | Win, Mac |  |
| `stealth.ip` | string | Custom IP address | IP spoofing value | Win | Optional |
| `stealth.referrer` | string | Custom Referer header | Set custom Referer | Win, Mac | Optional |
| `stealth.user_agent` | string | Custom UA string | Spoofed user agent | Win, Mac | Optional |
| `stealth.first_party_cookies` | int | TTL (minutes) | First-party cookie TTL | Win, Mac | Optional |
| `stealth.third_party_cookies` | int | TTL (minutes) | Third-party cookie TTL | Win, Mac | Optional |
| `stealth.block_webrtc` | bool | `true` / `false` | Block WebRTC | All |  |
| `stealth.strip_url` | bool | `true` / `false` | Remove URL parameters | All |  |
| `stealth.hide_search_queries` | bool | `true` / `false` | Hide search queries | All |  |
| `stealth.send_dnt` | bool | `true` / `false` | Send DNT | All |  |
| `stealth.self_destruct_cookies` | int | `15` | TTL (minutes) | All |  |
| `android.mode` | string | `VPN` / `Proxy` | Operation mode | And |  |
| `android.method` | string | `Full` / `Simple` | Filtering method | And | |
| `android.https_filtering` | bool | `true` / `false` | HTTPS filtering active | And |  |
| `android.root` | bool | `true` / `false` | Root status | And |  |

---

## Browser Extension Specific Parameters

These parameters are not used by the report backend but may appear in the URL as part of internal tracking or URL shortener mechanisms:

| Parameter | Type   | Example                | Description                                          |
| --------- | ------ | ---------------------- | ---------------------------------------------------- |
| `action`  | string | `report`               | Marks the context of the action, used for analytics. |
| `from`    | string | `popup` / `background` | Indicates request origin for tracking.               |

---

## Scheme Versioning

All products must include `scheme_version`. The current version (`3`) defines unified DNS data inclusion (from meta information) and consistent Stealth naming. The format and dividers are standardized across all platforms.

---

## Validation Rules

- Unknown or deprecated parameters are ignored.
- Missing optional parameters default to `false` or empty.
- `user_agent` has precedence over `browser` and `browser_detail`.
- For `manifest_version=3`, `browsing_security.*` parameters are omitted.

---

## Deprecated Parameters

| Deprecated | Replaced By | Notes |
|-------------|--------------|-------|

---

## Examples

### **Windows example**
```
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=Win&product_version=7.15.2&system_version=Microsoft%20Windows%2011&url=https%3A%2F%2Fexample.com&filters=2.3.4.224&filters_last_update=2025-10-31-12-00-00&custom_filters=User%20rules%20(url%3A%20none)&userscripts=DarkMode&dns.enabled=true&dns.filters=adguard-dns&dns.servers=System&dns.custom_bootstrap=1.1.1.1%2C8.8.8.8&dns.fallback=8.8.4.4%2C1.0.0.1&dns.timeout=5000&adblocking.enabled=true&browsing_security.enabled=true&browsing_security.statistics_enabled=true&extensions.enabled=true&extensions=AdGuard%20Assistant%20(script%3B%20url%3A%20https%3A%2F%2Fexample.com)&license_type=paid&win.wfp=true&parental_control.enabled=true&parental_control.block_exe=false&parental_control.safe_search=true&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.block_third_party_auth=true&stealth.disable_windows_defender=true&stealth.disable_windows_recall=true&stealth.disable_windows_telemetry=true&stealth.turn_off_advertising_id=true&stealth.hide_search_queries=true&stealth.x_client=true&stealth.flash=true&stealth.java=true&stealth.push=true&stealth.block_webrtc=true&stealth.dpi=true&stealth.send_dnt=true&stealth.first_party_cookies=15&stealth.third_party_cookies=30
```

### **macOS example**
```
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=Mac&product_version=2.14.0&system_version=macOS%2015.0&url=https%3A%2F%2Fads.example.com&filters=2.4.5.50&filters_last_update=2025-10-31-10-00-00&custom_filters=Custom%20List%20(url%3A%20https%3A%2F%2Fexample.org%2Ffilter.txt)&dns.enabled=true&dns.filters=adguard-dns&dns.servers=System&dns.timeout=3000&browsing_security.enabled=true&browsing_security.statistics_enabled=true&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.hide_search_queries=true&stealth.send_dnt=true&stealth.block_webrtc=true&stealth.self_destruct_cookies=10
```

### **Android example**
```
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=And&product_version=4.3&system_version=Android%2015&url=https%3A%2F%2Fexample.org&filters=2.3.4.200&filters_last_update=2025-10-31-11-00-00&custom_filters=Mobile%20Rules%20(url%3A%20none)&dns.enabled=true&dns.filters=adguard-dns&dns.servers=System&dns.timeout=4000&browsing_security.enabled=true&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.block_webrtc=true&stealth.send_dnt=true&android.mode=VPN&android.method=Full&android.https_filtering=true&android.root=false
```

### **iOS example**
```
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=iOS&product_version=4.5.1&system_version=iOS%2018.0&url=https%3A%2F%2Fnews.example.com&filters=2.3.4.205&filters_last_update=2025-10-31-09-00-00&dns.enabled=true&dns.filters=adguard-dns&browsing_security.enabled=true&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.send_dnt=true
```

### **Browser Extension example (Manifest V3)**
```
https://reports.adguard.com/en/new_issue.html?scheme_version=3&product_type=Ext&product_version=5.0.1&manifest_version=3&system_version=Chrome%20128.0.6613.114&browser=chrome&url=https%3A%2F%2Fexample.net&filters=2.3.4.300&filters_last_update=2025-10-31-14-00-00&stealth.enabled=true&stealth.block_trackers=true&stealth.strip_url=true&stealth.hide_search_queries=true&stealth.send_dnt=true&stealth.block_webrtc=true
```
