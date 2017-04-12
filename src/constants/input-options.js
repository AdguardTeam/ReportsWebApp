export const productTypeOptions = [
    { value: 'Win', label: 'Adguard for Windows' },
    { value: 'Mac', label: 'Adguard for Mac' },
    { value: 'And', label: 'Adguard for Android' },
    { value: 'iOS', label: 'Adguard/Adguard Pro for iOS' },
    { value: 'Ext', label: 'Adguard Browser extension' },
    { value: 'Con', label: 'Adguard Content blocker' }
];

export const problemTypeOptions = [
    { value: "Missed_ad", label: "Missed ad" },
    { value: "Popup_ad", label: "Popup ads" },
    { value: "Excessive_blocking", label: "Excessive blocking" },
    { value: "Anti-adblock_script", label: "Anti-adblock script" },
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
        skip: { except_on_prob: ["Missed_ad","Popup_ad","Annoyance"] }
    },
    {
        label: "If you don't have HTTPs filtering enabled, please enable it. Is the problem still present?",
        skip: { on_prod:["iOS","Ext","Con"], except_on_prob: ["Missed_ad","Popup_ad","Annoyance"] }
    }
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
    {value: 1, label: "Russian filter"},
    {value: 2, label: "English filter"},
    {value: 3, label: "Spyware filter"},
    {value: 4, label: "Social media filter"},
    {value: 5, label: "Experimental Filter"},
    {value: 6, label: "German filter"},
    {value: 7, label: "Japanese filter"},
    {value: 8, label: "Dutch filter"},
    {value: 9, label: "Spanish/Portuguese filter"},
    {value: 10, label: "Useful ads filter"},
    {value: 11, label: "Mobile ads filter"},
    {value: 12, label: "Safari filter"},
    {value: 13, label: "Turkish filter"},
    {value: 14, label: "Annoyance filter"},
    {value: 15, label: "Simplified domain names filter"}
];

// value == filterOptions[filterOptionsMap[value]]
export const filterOptionsMap = (function() {
    let map = Object.create(null);
    filterOptions.forEach((el, index) => {
        map[el.value] = index;
    });
    return map;
})();
