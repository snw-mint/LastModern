const SETTINGS_KEYS = [
    "hide-loved",
    "hide-obsessions",
    "hide-events",
    "hide-neighbours",
    "hide-tags",
    "hide-shouts",
    "hide-followers",
    "hide-following",
    "hide-playlists",
    "hide-library",
];
let cachedSettings = {};
function loadAndApplySettings() {
    chrome.storage.local.get(SETTINGS_KEYS, (result) => {
        cachedSettings = result;
        applyClasses(result);
    });
}
function applyClasses(settings) {
    if (!document.body) return;
    SETTINGS_KEYS.forEach((key) => {
        const shouldHide = settings[key];
        if (shouldHide && !document.body.classList.contains(key)) {
            document.body.classList.add(key);
        } else if (!shouldHide && document.body.classList.contains(key)) {
            document.body.classList.remove(key);
        }
    });
}
const observer = new MutationObserver((mutations) => {
    let needsUpdate = !1;
    for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
            needsUpdate = !0;
            break;
        }
    }
    if (needsUpdate) {
        applyClasses(cachedSettings);
    }
});
function init() {
    loadAndApplySettings();
    if (document.body) {
        observer.observe(document.body, { attributes: !0, attributeFilter: ["class"] });
    }
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateVisibility") {
        cachedSettings[request.setting] = request.value;
        applyClasses(cachedSettings);
    }
});
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
