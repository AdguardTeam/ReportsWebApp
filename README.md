# ReportsWebApp
Allows users to report a problem with Adguard filters

https://adguardteam.github.io/ReportsWebApp/new_report.html

### Pre-filling the app with query parameters

parameter | explanation
--- | ---
`product_type` | One among `Win`, `Mac`, `And`, `iOS`, `Ext`, `Con`.
`product_version` | A string representing the version number. _Example_: 6.2

`browser` |  Can be one among `Chrome`, `Firefox`, `Opera`, `Opera 40+`, `Safari`, `IE`, `Edge`, `Other`. If the browser does not fall into this categories, the value should be set as `Other` and the string representing the browser name should be attached as a value of a `browser_detail` parameter.
`browser_detail` |  A string representing a browser's name. When this parameter value is specified, the value of `browser` parameter should be `Other`.
`url` |  A string representing a url where the problem in which the report is trying to report takes place.
`filters`| A _period_-separated list of filterIds, as specified in `https://filters.adtidy.org/windows/filters.json`.
`win.wfp` | Can be `true` or `false`, indicates whether WFP driver in AG for Win is enabled or not.
`stealth.enabled`| Can be `true` or `false`.
`stealth.hide_search_queries` | Can be `true` or `false`.
`stealth.DNT` | Can be `true` or `false`.
`stealth.x_client` | Can be `true` or `false`.
`stealth.first_party_cookies` | A string representing a decimal number that is specified in the stealth module indicating a time during which first-party cookies to be kept in seconds. If this query parameter does not exist, it is treated as not enabled.
`stealth.third_party_cookies` | A string representing a decimal number that is specified in the stealth module indicating a time during which third-party cookies to be kept in seconds. If this query parameter does not exist, it is treated as not enabled.
`stealth.disable_third_party_cache` | Can be `true` or `false`.
`stealth.webrtc` |  Can be `true` or `false`.
`stealth.push` |  Can be `true` or `false`.
`stealth.location` |  Can be `true` or `false`.
`stealth.referrer` |  A string representing a URL that is used by the stealth module as a referrer value. If this query parameter does not exist, it is treated as not enabled.
`stealth.user_agent` |  A string representing a user agent that is used by the stealth module as a user agent value. It can be an empty string. If this query parameter does not exist, it is treated as not enabled.
`stealth.ip` |  A string representing a IP address that is used by the stealth module as a ip address. If this query parameter does not exist, it is treated as not enabled.
`android.mode` | Can be `VPN` or `proxy`.
`android.method` | Can be `High-quality`, `High-speed`, or `Simplified`.
`ios.systemwide` | Can be `true` or `false`, indicates whether system-wide filtering is enabled on Adguard iOS or not.
`ios.simplified` | Can be `true` or `false`, indicates whether simplified filtering is enabled on Adguard iOS or not. 
`ios.DNS` | Can be  `Default`, `Family`, `None`.

#### Example 
AG for Windows:
`https://adguardteam.github.io/ReportsWebApp/new_report.html?product_type=Win&product_version=6.2&browser=Other&browser_detail=Midori&url=http%3A%2F%2Fgoogle.com&filters=2.3.4.5&win.wfp=false&stealth.enabled=true&stealth.hide_search_queries=true&stealth.DNT=true&stealth.x_client=false&stealth.first_party_cookies=30&stealth.third_party_cookies=2880&stealth.disable_third_party_cache=true&stealth.webrtc=true&stealth.push=false&stealth.location=true&stealth.referrer=http%3A%2F%2Fadguard.com&stealth.user_agent=Mozilla%2F5.0%20(Linux%3B%20Android%206.0.1%3B%20SM-G920I%20Build%2FMMB29K)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F58.0.3029.83%20Mobile%20Safari%2F537.36&stealth.ip=127.0.0.1`

AG for Android:
`https://adguardteam.github.io/ReportsWebApp/new_report.html?product_type=And&product_version=2.9.1&browser=Chrome&url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.espn.score_center&filters=1.2.3.4.5.6&android.mode=VPN&android.method=High-quality`

AG for iOS:

`https://adguardteam.github.io/ReportsWebApp/new_report.html?product_type=iOS&product_version=1.3.0&browser=Safari&url=https%3A%2F%2F9to5mac.com%2F&filters=2.3.11.12`
