const API_URL = "http://127.0.0.1:8001";


const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch(`${API_URL}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        document.getElementById("message").textContent = data.message;

        if (response.ok) {
            signupForm.reset();
        }
    });
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        document.getElementById("message").textContent = data.message;

        if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
        }
    });
}
const clothForm = document.getElementById("clothForm");

if (clothForm) {
    clothForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const clothData = {
            vendor_id: Number(document.getElementById("vendor_id").value),
            cloth_name: document.getElementById("cloth_name").value,
            category: document.getElementById("category").value,
            size: document.getElementById("size").value,
            price: Number(document.getElementById("price").value),
            availability: document.getElementById("availability").value,
            description: document.getElementById("description").value
        };

        try {
            const response = await fetch("http://127.0.0.1:8001/clothes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(clothData)
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById("message").textContent =
                    "Cloth added successfully!";
                clothForm.reset();
            } else {
                document.getElementById("message").textContent =
                    data.detail || "Failed to add cloth.";
            }

        } catch (error) {
            document.getElementById("message").textContent =
                "Could not connect to backend.";
            console.error(error);
        }
    });
}