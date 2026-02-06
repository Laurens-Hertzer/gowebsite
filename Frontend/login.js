const API_BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('auth-form');
    const registerForm = document.getElementById("register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username-login").value;
            const password = document.getElementById("password-login").value;

            fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            .then(async res => {
                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.error || "Login fehlgeschlagen");
                }
                return res.json();
            })
            .then(() => {
                window.location.href = "index.html";
            })
            .catch(err => alert(err.message));
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username-register").value;
            const password = document.getElementById("password-register").value;

            fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
            .catch(err => alert("Network error: " + err.message));
        });
    }
});
