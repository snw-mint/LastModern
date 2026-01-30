(function () {
    const BODY_CLASS = "modernizer-dark-mode";
    let isDarkCached = !1;
    function applyTheme(isDark) {
        isDarkCached = isDark;
        if (!document.body) return;
        if (isDark) {
            if (!document.body.classList.contains(BODY_CLASS)) {
                document.body.classList.add(BODY_CLASS);
            }
        } else {
            document.body.classList.remove(BODY_CLASS);
        }
    }
    const observer = new MutationObserver((mutations) => {
        if (isDarkCached && document.body && !document.body.classList.contains(BODY_CLASS)) {
            document.body.classList.add(BODY_CLASS);
        }
    });
    function init() {
        chrome.storage.sync.get(["darkMode"], (result) => {
            const isDark = result.darkMode || !1;
            applyTheme(isDark);
        });
        if (document.body) {
            observer.observe(document.body, { attributes: !0, attributeFilter: ["class"] });
        }
    }
    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "updateTheme") {
            applyTheme(request.value);
        }
    });
    if (document.body) {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }
    const earlyObserver = new MutationObserver(() => {
        if (document.body) {
            earlyObserver.disconnect();
            init();
        }
    });
    if (!document.body) {
        earlyObserver.observe(document.documentElement, { childList: !0, subtree: !0 });
    }
})();
