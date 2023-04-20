const API_URL = "http://localhost:3000"

const registrationForm = document.querySelector(".registration-form");
const loginForm = document.querySelector(".login-form");
const switchBtns = document.querySelectorAll(".switch a");
const loader = document.querySelector(".loader");
const statusMessage = document.querySelector(".status-message");

switchBtns.forEach((switchBtn) => switchBtn.addEventListener("click", () => {
    registrationForm.classList.toggle("hide");
    loginForm.classList.toggle("hide");
}));

registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = registrationForm.name.value;
    const email = registrationForm.email.value;
    const password = registrationForm.password.value;

    loader.classList.remove("hide");

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({name, email, password})
        })
        if (!response.ok) {
            throw Error(await response.text())
        }
        registrationForm.reset();
        alert('Registration successful!');
    } catch (error) {
        statusMessage.textContent = error
        statusMessage.style.display = "block"
    } finally {
        loader.classList.add("hide");
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = loginForm.loginEmail.value;
    const password = loginForm.loginPassword.value;

    loader.classList.remove("hide");

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({email, password})
        })
        if (!response.ok) {
            throw Error(await response.text())
        }
        alert('Login successful!');
        loginForm.reset();
    } catch (error) {
        statusMessage.textContent = error
        statusMessage.style.display = "block"
    } finally {
        loader.classList.add("hide");
    }
});
