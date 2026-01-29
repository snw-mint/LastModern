function applySettings() {
    const settings = [
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
    chrome.storage.local.get(settings, (result) => {
        if (chrome.runtime.lastError) return;
        if (!document.body) return;
        settings.forEach((id) => {
            if (result[id]) {
                document.body.classList.add(id);
            } else {
                document.body.classList.remove(id);
            }
        });
    });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateVisibility") {
        if (document.body) {
            if (request.value) {
                document.body.classList.add(request.setting);
            } else {
                document.body.classList.remove(request.setting);
            }
        }
    }
});
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applySettings);
} else {
    applySettings();
}
