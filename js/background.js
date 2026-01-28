chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: "welcome.html" });
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        console.log("Extension updated to version " + chrome.runtime.getManifest().version);
    }
    chrome.runtime.setUninstallURL("https://github.com/snw-mint/last-modern");
});
