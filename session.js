// ============================================================
// session.js — SmartBiz Session Manager
// Include this in every protected page (dashboard, products, etc.)
// ============================================================

const SESSION_TIMEOUT_MS  = 10 * 60 * 1000; // 10 minutes inactivity
const TOKEN_REFRESH_MS    = 9 * 60 * 1000;  // Refresh token every 9 minutes

let inactivityTimer   = null;
let refreshInterval   = null;

// ─── 1. On page load — verify session is valid ───────────────
(function checkSession() {
    const token    = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
        forceLogout("inactivity");
        return;
    }

    // Session is valid — start timers
    startInactivityTimer();
    startTokenRefresh();
})();


// ─── 2. Inactivity Timer ─────────────────────────────────────
function startInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        forceLogout("inactivity");
    }, SESSION_TIMEOUT_MS);
}

// Reset timer on any user activity
["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"].forEach(event => {
    document.addEventListener(event, () => {
        startInactivityTimer();
    }, { passive: true });
});


// ─── 3. Auto Token Refresh ───────────────────────────────────
function startTokenRefresh() {
    clearInterval(refreshInterval);
    refreshInterval = setInterval(async () => {
        await refreshAccessToken();
    }, TOKEN_REFRESH_MS);
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        forceLogout("inactivity");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken })
        });

        if (response.ok) {
            const data = await response.json();
            // Update tokens in localStorage
            localStorage.setItem("token",        data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
        } else {
            // Refresh token expired or invalid — force logout
            forceLogout("inactivity");
        }
    } catch (err) {
        // Server unreachable — force logout
        forceLogout("inactivity");
    }
}


// ─── 4. Force Logout ─────────────────────────────────────────
async function forceLogout(reason) {
    clearTimeout(inactivityTimer);
    clearInterval(refreshInterval);

    // Save current page so user returns here after re-login
    sessionStorage.setItem("lastPage",     window.location.href);
    sessionStorage.setItem("logoutReason", reason);

    // Call backend logout to invalidate refresh token
    const username = localStorage.getItem("username");
    if (username) {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username })
            });
        } catch (err) {
            // Ignore — still clear local session
        }
    }

    // Clear all local session data
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");

    // Redirect to login
    window.location.href = "index.html";
}


// ─── 5. Manual Logout (call this from your logout buttons) ───
async function logout() {
    await forceLogout("manual");
}


// ─── 6. Auth header helper (use in every API fetch call) ─────
function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    };
}