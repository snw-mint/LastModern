document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const controlsContainer = document.getElementById("controls-container");
    const settingsView = document.getElementById("settings-view");
    const redirectView = document.getElementById("redirect-view");
    const openSiteBtn = document.getElementById("open-site-btn");
    function updatePopupTheme(isDark) {
        if (isDark) {
            htmlElement.setAttribute("data-theme", "dark");
        } else {
            htmlElement.setAttribute("data-theme", "light");
        }
    }
    chrome.storage.sync.get(["darkMode"], (result) => {
        const isDark = result.darkMode || !1;
        themeToggle.checked = isDark;
        updatePopupTheme(isDark);
    });
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
    chrome.tabs.query({ active: !0, currentWindow: !0 }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url && currentTab.url.includes("last.fm")) {
            controlsContainer.style.display = "block";
            settingsView.style.display = "block";
            redirectView.style.display = "none";
        } else {
            controlsContainer.style.display = "none";
            settingsView.style.display = "none";
            redirectView.style.display = "block";
        }
    });
    openSiteBtn.addEventListener("click", () => {
        chrome.tabs.create({ url: "https://www.last.fm/home" });
    });
});
