(function () {
    const BODY_CLASS = "modernizer-dark-mode";
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add(BODY_CLASS);
        } else {
            document.body.classList.remove(BODY_CLASS);
        }
    }
    chrome.storage.sync.get(["darkMode"], (result) => {
        applyTheme(result.darkMode);
    });
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "updateTheme") {
            applyTheme(request.value);
        }
    });
})();
