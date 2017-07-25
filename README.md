# ReportsWebApp
Allows users to report a problem with Adguard filters

https://adguardteam.github.io/ReportsWebApp/new_report.html

### Pre-filling the app with query parameters

parameter | explanation
--- | ---
`product_type` | One among `Win`, `Mac`, `And`, `iOS`, `Ext`, `Con`.
`product_version` | A string representing the version number. _Example_: 6.2
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
`browser` |  Can be one among `Chrome`, `Firefox`, `Opera`, `Opera 40+`, `Safari`, `IE`, `Edge`, `Other`. If the browser does not fall into this categories, the value should be set as `Other` and the string representing the browser name should be attached as a value of a `browser_detail` parameter.
`browser_detail` |  A string representing a browser's name. When this parameter value is specified, the value of `browser` parameter should be `Other`.
`url` |  A string representing a url where the problem in which the report is trying to report takes place.
`filters`| A _period_-separated list of filterIds, as specified in `https://filters.adtidy.org/windows/filters.json`.
