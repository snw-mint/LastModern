(function () {
    const ARROW_SVG = `<svg class="custom-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16m0 0-6-6m6 6-6 6"/></svg>`;
    const SETTINGS_SVG = `<svg class="custom-settings-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" stroke-width="1.5"/></svg>`;
    const SHARE_SVG = `<svg class="custom-share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>`;
    const REPLY_SVG = `<svg class="custom-reply-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 12L14.5 17M19.5 12L14.5 7M19.5 12H9.5C7.83333 12 4.5 13 4.5 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const ICON_NOTIF = `<svg class="custom-profile-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
    const ICON_INBOX = `<svg class="custom-profile-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z" stroke="currentColor" stroke-width="1.5"/><path d="m6 8 2.159 1.8c1.837 1.53 2.755 2.295 3.841 2.295s2.005-.765 3.841-2.296L18 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
    const ICON_BOOKMARKS = `<svg class="custom-profile-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16.09v-4.992c0-4.29 0-6.433-1.318-7.766C18.364 2 16.242 2 12 2S5.636 2 4.318 3.332 3 6.81 3 11.098v4.993c0 3.096 0 4.645.734 5.321.35.323.792.526 1.263.58.987.113 2.14-.907 4.445-2.946 1.02-.901 1.529-1.352 2.118-1.47.29-.06.59-.06.88 0 .59.118 1.099.569 2.118 1.47 2.305 2.039 3.458 3.059 4.445 2.945.47-.053.913-.256 1.263-.579.734-.676.734-2.224.734-5.321Z" stroke="currentColor" stroke-width="1.5"/><path d="M15 6H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
    const ICON_SETTINGS_PROFILE = `<svg class="custom-profile-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M13.765 2.152C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353 1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7s-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555.473.297.777.803.777 1.361s-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453s.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.562 12c0-.558.304-1.064.777-1.36.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008 1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z" stroke="currentColor" stroke-width="1.5"/></svg>`;
    function injectAppend(selector, svgContent) {
        document.querySelectorAll(selector).forEach((el) => {
            if (el.classList.contains("has-custom-icon")) return;
            el.classList.add("has-custom-icon");
            el.insertAdjacentHTML("beforeend", svgContent);
        });
    }
    function injectReplace(selector, svgContent) {
        document.querySelectorAll(selector).forEach((el) => {
            if (el.classList.contains("has-custom-icon")) return;
            el.classList.add("has-custom-icon");
            el.innerHTML = svgContent;
        });
    }
    function injectPrepend(selector, svgContent) {
        document.querySelectorAll(selector).forEach((el) => {
            if (el.classList.contains("has-custom-icon")) return;
            el.classList.add("has-custom-icon");
            el.insertAdjacentHTML("afterbegin", svgContent);
        });
    }
    function injectProfileIcons() {
        const profileMap = {
            notifications: ICON_NOTIF,
            inbox: ICON_INBOX,
            bookmarks: ICON_BOOKMARKS,
            settings: ICON_SETTINGS_PROFILE,
        };
        Object.keys(profileMap).forEach((label) => {
            const selector = `a[data-analytics-label="${label}"]`;
            document.querySelectorAll(selector).forEach((el) => {
                if (el.classList.contains("has-custom-icon")) return;
                el.classList.add("has-custom-icon");
                el.insertAdjacentHTML("afterbegin", profileMap[label]);
            });
        });
    }
    function runInjections() {
        if (observer) observer.disconnect();
        injectAppend(".more-link a", ARROW_SVG);
        injectReplace(".section-settings-toggle", SETTINGS_SVG);
        injectReplace(".share-button-profile", SHARE_SVG);
        injectPrepend(".shout-reply, .js-shout-reply", REPLY_SVG);
        injectProfileIcons();
        if (document.body) observer.observe(document.body, { childList: !0, subtree: !0 });
    }
    const observer = new MutationObserver(runInjections);
    function init() {
        runInjections();
        if (document.body) observer.observe(document.body, { childList: !0, subtree: !0 });
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
