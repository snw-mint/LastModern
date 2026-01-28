document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    const controlsContainer = document.getElementById('controls-container');
    const settingsView = document.getElementById('settings-view');
    const redirectView = document.getElementById('redirect-view');
    const openSiteBtn = document.getElementById('open-site-btn');

    // --- 1. Theme Logic (Same as before) ---
    function updatePopupTheme(isDark) {
        if (isDark) {
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
        }
    }

    chrome.storage.sync.get(['darkMode'], (result) => {
        const isDark = result.darkMode || false;
        themeToggle.checked = isDark;
        updatePopupTheme(isDark);
    });

    themeToggle.addEventListener('change', () => {
        const isDark = themeToggle.checked;
        updatePopupTheme(isDark);
        chrome.storage.sync.set({ darkMode: isDark });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "updateTheme", value: isDark });
            }
        });
    });

    // --- 2. URL Check Logic (New) ---
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        
        // Check if URL exists and contains 'last.fm'
        if (currentTab && currentTab.url && currentTab.url.includes("last.fm")) {
            // We are on Last.fm -> Show Controls
            controlsContainer.style.display = "block";
            settingsView.style.display = "block";
            redirectView.style.display = "none";
        } else {
            // We are NOT on Last.fm -> Show Redirect Button
            controlsContainer.style.display = "none"; // Hide toggle in header
            settingsView.style.display = "none";
            redirectView.style.display = "block";
        }
    });

    // --- 3. Redirect Button Action ---
    openSiteBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: "https://www.last.fm/home" });
    });
});