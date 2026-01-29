document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const controlsContainer = document.getElementById("settings-view");
    const redirectView = document.getElementById("redirect-view");
    const openSiteBtn = document.getElementById("open-site-btn");
    const accordionHeader = document.getElementById("toggle-profile-tabs");
    const accordionContent = document.getElementById("profile-tabs-content");
    function updatePopupTheme(isDark) {
        htmlElement.setAttribute("data-theme", isDark ? "dark" : "light");
    }
    chrome.storage.sync.get(["darkMode"], (result) => {
        const isDark = result.darkMode || !1;
        if (themeToggle) {
            themeToggle.checked = isDark;
            updatePopupTheme(isDark);
        }
    });
    if (themeToggle) {
        themeToggle.addEventListener("change", () => {
            const isDark = themeToggle.checked;
            updatePopupTheme(isDark);
            chrome.storage.sync.set({ darkMode: isDark });
            chrome.tabs.query({ active: !0, currentWindow: !0 }, (tabs) => {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "updateTheme", value: isDark });
                }
            });
        });
    }
    chrome.tabs.query({ active: !0, currentWindow: !0 }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url) {
            try {
                const url = new URL(currentTab.url);
                if (url.hostname.endsWith("last.fm")) {
                    if (controlsContainer) controlsContainer.style.display = "block";
                    if (redirectView) redirectView.style.display = "none";
                } else {
                    if (controlsContainer) controlsContainer.style.display = "none";
                    if (redirectView) redirectView.style.display = "block";
                }
            } catch (e) {
                if (controlsContainer) controlsContainer.style.display = "none";
                if (redirectView) redirectView.style.display = "block";
            }
        }
    });
    if (openSiteBtn) {
        openSiteBtn.addEventListener("click", () => {
            chrome.tabs.create({ url: "https://www.last.fm/home" });
        });
    }
    if (accordionHeader && accordionContent) {
        accordionHeader.addEventListener("click", () => {
            accordionHeader.classList.toggle("active");
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });
    }
    const toggles = [
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
    chrome.storage.local.get(toggles, (result) => {
        toggles.forEach((id) => {
            const element = document.getElementById(id);
            if (element && result[id]) {
                element.checked = !0;
            }
        });
    });
    toggles.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("change", (e) => {
                const isChecked = e.target.checked;
                chrome.storage.local.set({ [id]: isChecked });
                chrome.tabs.query({ active: !0, currentWindow: !0 }, (tabs) => {
                    if (tabs[0]) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            action: "updateVisibility",
                            setting: id,
                            value: isChecked,
                        });
                    }
                });
            });
        }
    });
});
