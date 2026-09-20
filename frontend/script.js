const API_URL = "http://127.0.0.1:8001";


// ==================== SIGNUP ====================

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


// ==================== LOGIN ====================

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

            // After login, go to vendor registration
            window.location.href = "vendor.html";
        }
    });
}


// ==================== ADD CLOTH ====================

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
            const response = await fetch(`${API_URL}/clothes/`, {
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

                // Refresh clothes list
                loadClothes();

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


// ==================== ADD VENDOR ====================

const vendorForm = document.getElementById("vendorForm");

if (vendorForm) {
    vendorForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const vendorData = {
            vendor_name: document.getElementById("vendor_name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value
        };

        try {
            const response = await fetch(`${API_URL}/vendors/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(vendorData)
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById("message").textContent =
                    "Vendor added successfully!";

                vendorForm.reset();

                // After vendor registration, go to clothes page
                window.location.href = "cloths.html";

            } else {
                document.getElementById("message").textContent =
                    data.detail || "Failed to add vendor.";
            }

        } catch (error) {
            document.getElementById("message").textContent =
                "Could not connect to backend.";

            console.error(error);
        }
    });
}


// ==================== LOAD CLOTHES ====================

async function loadClothes() {

    const clothesList = document.getElementById("clothesList");

    if (!clothesList) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/clothes/`);

        if (!response.ok) {
            throw new Error("Failed to load clothes");
        }

        const clothes = await response.json();

        clothesList.innerHTML = "";

        if (clothes.length === 0) {
            clothesList.textContent = "No clothes available.";
            return;
        }

        clothes.forEach(function (cloth) {

            const item = document.createElement("div");

            item.innerHTML = `
                <h3>${cloth.cloth_name}</h3>
                <p>Category: ${cloth.category}</p>
                <p>Size: ${cloth.size}</p>
                <p>Price: ₹${cloth.price}</p>
                <p>Availability: ${cloth.availability}</p>
                <p>${cloth.description}</p>
                <hr>
            `;

            clothesList.appendChild(item);
        });

    } catch (error) {

        clothesList.textContent = "Could not load clothes.";

        console.error(error);
    }
}


// ==================== LOAD CLOTHES ON PAGE OPEN ====================

loadClothes();