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
    "hide-about",
    "hide-station-links",
    "hide-reports",
    "hide-labs",
    "hide-shoutbox-section",
    "hide-ads",
];
const SIDEBAR_KEYS = ["hide-about", "hide-station-links", "hide-reports", "hide-labs"];
let cachedSettings = {};
function checkFullWidth(settings) {
    if (!document.body) return;
    const allSidebarHidden = SIDEBAR_KEYS.every((key) => settings[key] === !0);
    const hasClass = document.body.classList.contains("force-full-width");
    if (allSidebarHidden && !hasClass) {
        document.body.classList.add("force-full-width");
    } else if (!allSidebarHidden && hasClass) {
        document.body.classList.remove("force-full-width");
    }
}
function applyClasses(settings) {
    if (!document.body) return;
    SETTINGS_KEYS.forEach((key) => {
        const shouldHide = settings[key];
        const hasClass = document.body.classList.contains(key);
        if (shouldHide && !hasClass) {
            document.body.classList.add(key);
        } else if (!shouldHide && hasClass) {
            document.body.classList.remove(key);
        }
    });
}
function updateDOM() {
    observer.disconnect();
    applyClasses(cachedSettings);
    checkFullWidth(cachedSettings);
    if (document.body) {
        observer.observe(document.body, { attributes: !0, attributeFilter: ["class"] });
    }
}
function loadAndApplySettings() {
    chrome.storage.local.get(SETTINGS_KEYS, (result) => {
        cachedSettings = result;
        updateDOM();
    });
}
const observer = new MutationObserver((mutations) => {
    updateDOM();
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
        updateDOM();
    }
});
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
