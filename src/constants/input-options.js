export const YN = [
    { value: true, label: "Yes" },
    { value: false, label: "No" }
];

export const productTypeOptions = [
    { value: 'Win', label: 'Adguard for Windows' },
    { value: 'Mac', label: 'Adguard for Mac' },
    { value: 'And', label: 'Adguard for Android' },
    { value: 'iOS', label: 'Adguard/Adguard Pro for iOS' },
    { value: 'Ext', label: 'Adguard Browser extension' },
    { value: 'Con', label: 'Adguard Content blocker' }
];

export const problemTypeOptions = [ // label is how it will be shown in UI, value is the "name" of the corresponding GitHub label names.
    { value: "Ads", label: "Missed ad" },
    { value: "Incorrect Blocking", label: "Excessive blocking" },
    { value: "Social Widget", label: "Social media elements"},
    { value: "Anti Adblock Script", label: "Anti-adblock script" },
    { value: "Annoyance", label: "Annoyance" }
];

export const checklists = [
    {
        label: "Please check Adguard for filter updates. Is the problem still present?",
        skip: {} 
    },
    {
        label: "Please disable User filter. Is the problem still present?",
        skip: { on_prod: ["Con"] } 
    },
    {
        label: "If you have 'Show useful ads' option enabled, please disable it. Is the problem still present?",
        skip: { except_on_prob: ["Ads","Social Widget","Annoyance"] }
    },
    {
        label: "If you don't have HTTPs filtering enabled, please enable it. Is the problem still present?",
        skip: { on_prod:["iOS","Ext","Con"], except_on_prob: ["Ads","Social Widget","Annoyance"] }
    }
];

export const STEALTH_OPTIONS = [
    { label: "Hide your search queries", type: "Bool" },
    { label: "Send Do-Not-Track header", type: "Bool" },
    { label: "Remove X-Client-Data header from HTTP requests", type: "Bool" },
    { label: "Self-destructing first-party cookies", type: "Number" },
    { label: "Self-destructing third-party cookies", type: "Number" },
    { label: "Disable cache for third-party requests", type: "Bool" },
    { label: "Block WebRTC", type: "Bool" },
    { label: "Block Push API", type: "Bool" },
    { label: "Block Location API", type: "Bool" },
    { label: "Hide your Referrer from third-parties", type: "String" },
    { label: "Hide your User-Agent", type: "String" },
    { label: "Hide your IP address", type: "String" }
];

export const VPN_PROXY = [
    { value: "VPN", label: "VPN" },
    { value: "proxy", label:"proxy" }
];

export const FILTERING_METHODS = [
    { value: "High-quality", label: "High-quality" },
    { value: "High-speed", label: "High-speed" },
    { value: "Simplified", label: "Simplified" }
];

export const DNS_OPTIONS = [
    { value: "Default", label: "Default" },
    { value: "Family", label: "Family Protection" },
    { value: "None", label: "None" }
];

export const browserOptions = [
    { value: "Chrome", label: "Chrome" },
    { value: "FireFox", label: "FireFox" },
    { value: "Opera", label: "Opera" },
    { value: "Opera 40+", label: "Opera 40+" },
    { value: "Safari", label: "Safari" },
    { value: "IE", label: "IE" },
    { value: "Edge", label: "Edge" },
    { value: "Other", label: "Other..." }
];

export const filterOptions = [
    { value: 2, label: 'English filter' },
    { value: 3, label: 'Spyware filter' },
    { value: 4, label: 'Social media filter' },
    { value: 14, label: 'Annoyances filter' },
    { value: 10, label: 'Filter unblocking useful ads' },
    { value: 1, label: 'Russian filter' },
    { value: 6, label: 'German filter' },
    { value: 16, label: 'French filter' },
    { value: 7, label: 'Japanese filter' },
    { value: 8, label: 'Dutch filter' },
    { value: 9, label: 'Spanish/Portuguese filter' },
    { value: 13, label: 'Turkish filter' },
    { value: 5, label: 'Experimental filter' },
    { value: 11, label: 'Mobile Ads filter' },
    { value: 15, label: 'Simplified domain names filter' },
    { value: 12, label: 'Safari filter' },
    { value: 101, label: 'EasyList' },
    { value: 118, label: 'EasyPrivacy' },
    { value: 123, label: 'Fanboy\'s Social Blocking List' },
    { value: 122, label: 'Fanboy\'s Annoyances' },
    { value: 207, label: 'Adblock Warning Removal List' },
    { value: 102, label: 'ABPindo' },
    { value: 117, label: 'Adblock Polska' },
    { value: 103, label: 'Bulgarian list' },
    { value: 104, label: 'EasyList China' },
    { value: 105, label: 'EasyList Czech and Slovak' },
    { value: 106, label: 'EasyList Dutch' },
    { value: 107, label: 'EasyList Germany' },
    { value: 108, label: 'EasyList Hebrew' },
    { value: 109, label: 'EasyList Italy' },
    { value: 110, label: 'EasyList Lithuania' },
    { value: 119, label: 'Icelandic ABP List' },
    { value: 111, label: 'Latvian List' },
    { value: 112, label: 'Liste AR' },
    { value: 113, label: 'Liste FR' },
    { value: 120, label: 'Norsk adblockliste' },
    { value: 114, label: 'ROList' },
    { value: 115, label: 'RU AdList' },
    { value: 121, label: 'void.gr' },
    { value: 116, label: 'Wiltteri' },
    { value: 200, label: 'ABP Japanese Filters' },
    { value: 214, label: 'ABPVN List' },
    { value: 222, label: 'Adblock-Persian list' },
    { value: 216, label: 'Adblock polskie reguły' },
    { value: 217, label: 'Adblock polskie reguły cookies' },
    { value: 211, label: 'Anti-Adblock Killer | Reek' },
    { value: 219, label: 'ChinaList+EasyList' },
    { value: 220, label: 'CJX\'s Annoyance List' },
    { value: 201, label: 'Czech List' },
    { value: 231, label: 'Easylist Spanish' },
    { value: 218, label: 'Estonian List' },
    { value: 225, label: 'Fanboy Anti-Facebook List' },
    { value: 230, label: 'FanboyEspanol' },
    { value: 215, label: 'Fanboy\'s Enhanced Tracking List' },
    { value: 223, label: 'Fanboy\'s Swedish' },
    { value: 226, label: 'Fanboy\'s Vietnamese' },
    { value: 202, label: 'Filtros Nauscopicos' },
    { value: 203, label: 'hufilter' },
    { value: 229, label: 'I dont care about cookies' },
    { value: 224, label: 'Korean Adblock List' },
    { value: 227, label: 'List-KR' },
    { value: 208, label: 'Malware Domains' },
    { value: 204, label: 'Peter Lowe\'s list' },
    { value: 221, label: 'Polski social filtr' },
    { value: 209, label: 'Prebake' },
    { value: 213, label: 'RU AdList: BitBlock' },
    { value: 212, label: 'RU AdList: Counters' },
    { value: 205, label: 'Schacks Adblock Plus liste' },
    { value: 210, label: 'Spam404' },
    { value: 206, label: 'Xfiles' },
    { value: 228, label: 'xinggsf' },
    { value: 232, label: 'KAD - Przekrety' },
    { value: 233, label: 'Juvander\'s Adblock List for Finland' },
    { value: 234, label: 'ROLIST2' },
    { value: 235, label: 'Iranian filter' },
    { value: 236, label: 'road-block' },
    { value: 237, label: 'AdBlock Protector List' }
];

// value == filterOptions[filterOptionsMap[value]]
export const filterOptionsMap = (function() {
    let map = Object.create(null);
    filterOptions.forEach((el, index) => {
        map[el.value] = index;
    });
    return map;
})();
