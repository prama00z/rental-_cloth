import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";

const API_URL = "https://rental-cloth.onrender.com";

const CLOTH_IMAGES = {
    dress: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20800%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20x2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23b91c1c%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23ef4444%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22800%22%20fill%3D%22%23f8fafc%22%2F%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22105%22%20r%3D%2255%22%20fill%3D%22%23f1c7a9%22%2F%3E%3Cpath%20d%3D%22M235%20175%20Q300%20145%20365%20175%20L410%20330%20L475%20700%20Q300%20770%20125%20700%20L190%20330%20Z%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Cpath%20d%3D%22M235%20175%20L190%20340%20L130%20250%20L210%20185%20Z%22%20fill%3D%22%23991b1b%22%2F%3E%3Cpath%20d%3D%22M365%20175%20L410%20340%20L470%20250%20L390%20185%20Z%22%20fill%3D%22%23991b1b%22%2F%3E%3Cpath%20d%3D%22M190%20340%20Q300%20385%20410%20340%22%20fill%3D%22none%22%20stroke%3D%22%23fecaca%22%20stroke-width%3D%228%22%2F%3E%3Cpath%20d%3D%22M130%20690%20Q300%20625%20470%20690%22%20fill%3D%22none%22%20stroke%3D%22%23fca5a5%22%20stroke-width%3D%2212%22%2F%3E%3C%2Fsvg%3E',
    saree: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20800%22%3E%3Crect%20width%3D%22600%22%20height%3D%22800%22%20fill%3D%22%23fff7ed%22%2F%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22105%22%20r%3D%2252%22%20fill%3D%22%23f1c7a9%22%2F%3E%3Cpath%20d%3D%22M240%20170%20Q300%20145%20360%20170%20L390%20350%20L475%20730%20Q300%20780%20125%20730%20L210%20350%20Z%22%20fill%3D%22%23ec4899%22%2F%3E%3Cpath%20d%3D%22M350%20195%20Q420%20250%20495%20335%20L430%20390%20Q370%20325%20320%20275%20Z%22%20fill%3D%22%23f9a8d4%22%2F%3E%3Cpath%20d%3D%22M150%20680%20Q300%20720%20450%20680%22%20fill%3D%22none%22%20stroke%3D%22%23fef08a%22%20stroke-width%3D%2214%22%2F%3E%3Cpath%20d%3D%22M225%20220%20L375%20220%20M205%20270%20L395%20270%20M185%20320%20L415%20320%22%20stroke%3D%22%23fde68a%22%20stroke-width%3D%229%22%20opacity%3D%22.9%22%2F%3E%3Ccircle%20cx%3D%22280%22%20cy%3D%22115%22%20r%3D%225%22%20fill%3D%22%23be123c%22%2F%3E%3Cpath%20d%3D%22M260%2065%20Q300%2030%20340%2065%22%20fill%3D%22none%22%20stroke%3D%22%237f1d1d%22%20stroke-width%3D%2216%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E',
    sherwani: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20800%22%3E%3Crect%20width%3D%22600%22%20height%3D%22800%22%20fill%3D%22%23eff6ff%22%2F%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22105%22%20r%3D%2252%22%20fill%3D%22%23d6a77b%22%2F%3E%3Cpath%20d%3D%22M250%20170%20L350%20170%20L390%20350%20L450%20720%20Q300%20760%20150%20720%20L210%20350%20Z%22%20fill%3D%22%231e3a8a%22%2F%3E%3Cpath%20d%3D%22M270%20175%20L300%20225%20L330%20175%20L345%20330%20L255%20330%20Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M260%20230%20L340%20230%20M255%20280%20L345%20280%20M250%20330%20L350%20330%22%20stroke%3D%22%23fbbf24%22%20stroke-width%3D%229%22%2F%3E%3Cpath%20d%3D%22M210%20360%20Q300%20390%20390%20360%22%20fill%3D%22none%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%228%22%2F%3E%3C%2Fsvg%3E',
    suit: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20800%22%3E%3Crect%20width%3D%22600%22%20height%3D%22800%22%20fill%3D%22%23f8fafc%22%2F%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22105%22%20r%3D%2252%22%20fill%3D%22%23e0b08a%22%2F%3E%3Cpath%20d%3D%22M245%20170%20L355%20170%20L430%20310%20L475%20720%20L300%20750%20L125%20720%20L170%20310%20Z%22%20fill%3D%22%23111827%22%2F%3E%3Cpath%20d%3D%22M245%20170%20L300%20245%20L355%20170%20L350%20360%20L300%20310%20L250%20360%20Z%22%20fill%3D%22%23374151%22%2F%3E%3Cpath%20d%3D%22M300%20245%20L325%20330%20L275%20330%20Z%22%20fill%3D%22%23f8fafc%22%2F%3E%3Cpath%20d%3D%22M275%20330%20L325%20330%20L318%20720%20L282%20720%20Z%22%20fill%3D%22%231f2937%22%2F%3E%3Cpath%20d%3D%22M275%20330%20L215%20285%20L170%20410%22%20fill%3D%22none%22%20stroke%3D%22%23374151%22%20stroke-width%3D%2218%22%2F%3E%3Cpath%20d%3D%22M325%20330%20L385%20285%20L430%20410%22%20fill%3D%22none%22%20stroke%3D%22%23374151%22%20stroke-width%3D%2218%22%2F%3E%3C%2Fsvg%3E',
};

const getClothImage = (cloth) => {
    const text = `${cloth?.cloth_name || ""} ${cloth?.category || ""}`.toLowerCase();

    if (text.includes("saree")) return CLOTH_IMAGES.saree;
    if (text.includes("sherwani")) return CLOTH_IMAGES.sherwani;
    if (text.includes("suit") || text.includes("tuxedo")) return CLOTH_IMAGES.suit;

    return CLOTH_IMAGES.dress;
};

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage("Logging in...");

        try {
            const response = await axios.post(
                `${API_URL}/users/login`,
                {
                    email,
                    password,
                }
            );

            const data = response.data;

            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("role", data.role || "");

                setMessage("Login successful!");

                if (data.role === "user") {
                    navigate("/clothes");
                } else if (data.role === "vendor") {
                    navigate("/vendor-dashboard");
                } else {
                    navigate("/dashboard");
                }
            } else {
                setMessage(
                    data.message || "Invalid email or password"
                );
            }
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Invalid email or password"
            );
        }
    };

    return (
        <div className="login-page">
            <div className="login-overlay"></div>

            <div className="login-left-copy">
                <span className="login-eyebrow">
                    CLOTH RENTAL PLATFORM
                </span>

                <h2>
                    Style More.
                    <br />
                    Own Less.
                </h2>

                <p>
                    Rent premium outfits for weddings,
                    parties, celebrations and every
                    special occasion.
                </p>
            </div>

            <div className="login-card">
                <div className="login-brand">
                    <div className="login-brand-mark">
                        ♧
                    </div>

                    <div>
                        <div className="login-brand-name">
                            Rent<span>&</span>Wear
                        </div>

                        <div className="login-brand-tagline">
                            RENT. WEAR. RETURN. REPEAT.
                        </div>
                    </div>
                </div>

                <div className="login-heading">
                    <h1>Welcome Back</h1>

                    <p>
                        Login to continue your style journey.
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="login-input-box">
                        <span>✉</span>

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="login-input-box">
                        <span>🔒</span>

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="login-options">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <span className="forgot-password">
                            Forgot password?
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="login-submit-btn"
                    >
                        <span>Login</span>
                        <span>→</span>
                    </button>
                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

                <div className="login-divider">
                    <span></span>
                    <p>or</p>
                    <span></span>
                </div>

                <p className="login-signup-text">
                    New to Rent &amp; Wear?
                </p>

                <Link
                    to="/signup"
                    className="login-create-link"
                >
                    Create an account
                </Link>
            </div>

            <div className="login-features">
                <div className="login-feature">
                    <span>◌</span>
                    <div>
                        <strong>Trending Outfits</strong>
                        <small>
                            Discover styles for every occasion
                        </small>
                    </div>
                </div>

                <div className="login-feature">
                    <span>◫</span>
                    <div>
                        <strong>Flexible Rental</strong>
                        <small>
                            Rent for the duration you need
                        </small>
                    </div>
                </div>

                <div className="login-feature">
                    <span>✓</span>
                    <div>
                        <strong>Quality Assured</strong>
                        <small>
                            Verified outfits from trusted vendors
                        </small>
                    </div>
                </div>

                <div className="login-feature">
                    <span>↻</span>
                    <div>
                        <strong>Easy Returns</strong>
                        <small>
                            Simple and hassle-free return process
                        </small>
                    </div>
                </div>
            </div>

            <div className="login-trustbar">
                <div>
                    <strong>✓</strong>
                    <span>
                        <b>Safe &amp; Secure</b>
                        <small>Your data is protected</small>
                    </span>
                </div>

                <div>
                    <strong>♧</strong>
                    <span>
                        <b>24/7 Support</b>
                        <small>We're here to help</small>
                    </span>
                </div>

                <div>
                    <strong>↻</strong>
                    <span>
                        <b>Hassle Free</b>
                        <small>Easy return process</small>
                    </span>
                </div>
            </div>
        </div>
    );
}

function Signup() {
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignup = async () => {
        setMessage("");

        const cleanName = name.trim();
        const cleanEmail = email.trim();

        if (!role) {
            setMessage("Please select User or Vendor.");
            return;
        }

        if (!cleanName) {
            setMessage("Please enter your full name.");
            return;
        }

        if (!cleanEmail) {
            setMessage("Please enter your email address.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setMessage("Please enter a password.");
            return;
        }

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setMessage("Creating account...");

        try {
            const response = await axios.post(
                `${API_URL}/users/signup`,
                {
                    name: cleanName,
                    email: cleanEmail,
                    password,
                    role,
                }
            );

            setMessage(
                response.data.message ||
                "Account created successfully!"
            );

            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Signup failed. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-overlay"></div>

            <div className="signup-left-copy">
                <span className="eyebrow">
                    CLOTH RENTAL PLATFORM
                </span>

                <h2>
                    Style More.
                    <br />
                    Own Less.
                </h2>

                <p>
                    Rent premium outfits for weddings,
                    parties, celebrations and every
                    special occasion.
                </p>
            </div>

            <div className="signup-card">
                <div className="brand">
                    <div className="brand-mark">
                        ♧
                    </div>

                    <div>
                        <div className="brand-name">
                            Rent<span>&</span>Wear
                        </div>

                        <div className="brand-tagline">
                            RENT. WEAR. RETURN. REPEAT.
                        </div>
                    </div>
                </div>

                <div className="signup-heading">
                    <h1>Create Your Account</h1>

                    <p>
                        Join Rent &amp; Wear and start your style journey.
                    </p>
                </div>

                <div className="role-buttons">
                    <button
                        type="button"
                        className={
                            role === "user"
                                ? "role-card active"
                                : "role-card"
                        }
                        onClick={() => setRole("user")}
                    >
                        <span className="role-icon">
                            👤
                        </span>

                        <span>
                            <strong>User Signup</strong>
                            <small>I want to rent</small>
                        </span>
                    </button>

                    <button
                        type="button"
                        className={
                            role === "vendor"
                                ? "role-card active"
                                : "role-card"
                        }
                        onClick={() => setRole("vendor")}
                    >
                        <span className="role-icon">
                            🏪
                        </span>

                        <span>
                            <strong>Vendor Signup</strong>
                            <small>I want to list outfits</small>
                        </span>
                    </button>
                </div>

                <div
                    className="signup-form"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            handleSignup();
                        }
                    }}
                >
                    <div className="input-box">
                        <span>👤</span>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="input-box">
                        <span>✉</span>

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>

                    <div className="input-box">
                        <span>🔒</span>

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <button
                        className="create-account-btn"
                        type="button"
                        onClick={handleSignup}
                        disabled={isSubmitting}
                        style={{
                            position: "relative",
                            zIndex: 9999,
                            pointerEvents: "auto",
                            touchAction: "manipulation",
                        }}
                    >
                        <span>
                            {isSubmitting
                                ? "Creating Account..."
                                : "Create Account"}
                        </span>
                        <span>{isSubmitting ? "..." : "→"}</span>
                    </button>
                </div>

                {message && (
                    <p className="signup-message">
                        {message}
                    </p>
                )}

                <p className="login-link">
                    Already have an account?
                    <Link to="/">Login</Link>
                </p>
            </div>

            <div className="signup-features">
                <div className="feature-item">
                    <span>◌</span>
                    <div>
                        <strong>Trending Outfits</strong>
                        <small>
                            Find styles for every occasion
                        </small>
                    </div>
                </div>

                <div className="feature-item">
                    <span>◫</span>
                    <div>
                        <strong>Flexible Rental</strong>
                        <small>
                            Choose your rental duration
                        </small>
                    </div>
                </div>

                <div className="feature-item">
                    <span>✓</span>
                    <div>
                        <strong>Quality Assured</strong>
                        <small>
                            Verified outfits from vendors
                        </small>
                    </div>
                </div>

                <div className="feature-item">
                    <span>↻</span>
                    <div>
                        <strong>Easy Returns</strong>
                        <small>
                            Simple and hassle-free returns
                        </small>
                    </div>
                </div>
            </div>

            <div className="signup-trustbar">
                <div>
                    <strong>✓</strong>
                    <span>
                        <b>Safe &amp; Secure</b>
                        <small>Your data is protected</small>
                    </span>
                </div>

                <div>
                    <strong>♧</strong>
                    <span>
                        <b>24/7 Support</b>
                        <small>We're here to help</small>
                    </span>
                </div>

                <div>
                    <strong>↻</strong>
                    <span>
                        <b>Hassle Free</b>
                        <small>Easy return process</small>
                    </span>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="simple-page">
            <div className="simple-card">
                <div className="simple-brand">
                    Rent<span>&</span>Wear
                </div>

                <h1>User Dashboard</h1>

                <p>
                    Welcome to your rental space.
                </p>

                <button
                    onClick={() => navigate("/clothes")}
                >
                    Browse Clothes
                </button>

                <button
                    onClick={() => navigate("/my-rentals")}
                >
                    My Rentals
                </button>

                <button
                    className="secondary-button"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

function VendorDashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="simple-page">
            <div className="simple-card">
                <div className="simple-brand">
                    Rent<span>&</span>Wear
                </div>

                <h1>Vendor Dashboard</h1>

                <p>
                    Manage your rental clothing collection.
                </p>

                <button
                    onClick={() => navigate("/vendor")}
                >
                    Vendor Registration
                </button>

                <button
                    onClick={() => navigate("/vendor-clothes")}
                >
                    My Added Clothes
                </button>

                <button
                    className="secondary-button"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

function Vendor() {
    const navigate = useNavigate();

    const [vendorName, setVendorName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const handleVendor = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/vendors/`,
                {
                    vendor_name: vendorName,
                    email,
                    phone,
                    address,
                }
            );

            if (
                response.status >= 200 &&
                response.status < 300
            ) {
                setMessage(
                    "Vendor added successfully!"
                );

                setTimeout(() => {
                    navigate("/vendor-clothes");
                }, 1000);
            }
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Failed to add vendor."
            );
        }
    };

    return (
        <div className="simple-page">
            <div className="simple-card">
                <div className="simple-brand">
                    Rent<span>&</span>Wear
                </div>

                <h1>Vendor Registration</h1>

                <form
                    onSubmit={handleVendor}
                    className="simple-form"
                >
                    <input
                        type="text"
                        placeholder="Vendor Name"
                        value={vendorName}
                        onChange={(e) =>
                            setVendorName(e.target.value)
                        }
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Register Vendor
                    </button>
                </form>

                {message && (
                    <p className="signup-message">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

function VendorClothes() {
    const [clothName, setClothName] = useState("");
    const [vendorId, setVendorId] = useState("");
    const [category, setCategory] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] =
        useState("Available");
    const [description, setDescription] =
        useState("");

    const [clothes, setClothes] = useState([]);
    const [message, setMessage] = useState("");

    const loadClothes = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/clothes/`
            );

            setClothes(response.data);
        } catch (error) {
            console.error(error);

            setMessage(
                "Could not load clothes."
            );
        }
    };

    useEffect(() => {
        loadClothes();
    }, []);

    const handleCloth = async (event) => {
        event.preventDefault();

        try {
            await axios.post(
                `${API_URL}/clothes/`,
                {
                    vendor_id: Number(vendorId),
                    cloth_name: clothName,
                    category,
                    size,
                    price: Number(price),
                    availability,
                    description,
                }
            );

            setMessage(
                "Cloth added successfully!"
            );

            setClothName("");
            setVendorId("");
            setCategory("");
            setSize("");
            setPrice("");
            setAvailability("Available");
            setDescription("");

            loadClothes();
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Failed to add cloth."
            );
        }
    };

    return (
        <div className="clothes-page">
            <div className="clothes-container">

                <div className="clothes-header">
                    <div>
                        <div className="simple-brand">
                            Rent<span>&</span>Wear
                        </div>

                        <h1>
                            Vendor Clothing
                        </h1>

                        <p>
                            Add and manage rental outfits.
                        </p>
                    </div>

                    <Link
                        to="/vendor-dashboard"
                        className="logout-link"
                    >
                        Dashboard
                    </Link>
                </div>

                <div className="add-cloth-section">

                    <h2>Add Cloth</h2>

                    <form
                        onSubmit={handleCloth}
                        className="cloth-form"
                    >
                        <input
                            type="number"
                            placeholder="Vendor ID"
                            value={vendorId}
                            onChange={(e) =>
                                setVendorId(e.target.value)
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Cloth Name"
                            value={clothName}
                            onChange={(e) =>
                                setClothName(e.target.value)
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Size"
                            value={size}
                            onChange={(e) =>
                                setSize(e.target.value)
                            }
                            required
                        />

                        <input
                            type="number"
                            placeholder="Rental Price"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Availability"
                            value={availability}
                            onChange={(e) =>
                                setAvailability(e.target.value)
                            }
                            required
                        />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <button type="submit">
                            Add Cloth
                        </button>
                    </form>

                    {message && (
                        <p className="signup-message">
                            {message}
                        </p>
                    )}
                </div>

                <div className="clothes-grid">

                    {clothes.length === 0 ? (
                        <div className="empty-clothes">
                            No clothes added yet.
                        </div>
                    ) : (
                        clothes.map((cloth) => (
                            <div
                                className="cloth-card"
                                key={cloth.cloth_id}
                            >
                                <div className="cloth-image-placeholder">
                                    <img
                                        src={getClothImage(cloth)}
                                        alt={cloth.cloth_name}
                                        loading="lazy"
                                        onError={(event) => {
                                            event.currentTarget.onerror = null;
                                            event.currentTarget.src = CLOTH_IMAGES.dress;
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </div>

                                <div className="cloth-card-body">
                                    <h3>
                                        {cloth.cloth_name}
                                    </h3>

                                    <p>
                                        {cloth.category}
                                    </p>

                                    <p>
                                        Size: {cloth.size}
                                    </p>

                                    <div className="cloth-card-bottom">
                                        <strong>
                                            ₹{cloth.price}
                                        </strong>

                                        <span>
                                            {cloth.availability}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function Clothes() {
    const navigate = useNavigate();

    const [clothes, setClothes] = useState([]);
    const [message, setMessage] = useState("");

    const loadClothes = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/clothes/`
            );

            setClothes(response.data);
            setMessage("");
        } catch (error) {
            console.error(error);

            setMessage(
                "Could not load clothes."
            );
        }
    };

    useEffect(() => {
        loadClothes();
    }, []);

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="clothes-page">
            <div className="clothes-container">

                <div className="clothes-header">

                    <div>
                        <div className="simple-brand">
                            Rent<span>&</span>Wear
                        </div>

                        <h1>
                            Browse Clothes
                        </h1>

                        <p>
                            Find the perfect outfit for your
                            next special occasion.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>

                {message && (
                    <p className="signup-message">
                        {message}
                    </p>
                )}

                <div className="clothes-grid">

                    {clothes.length === 0 ? (
                        <div className="empty-clothes">
                            <h2>
                                No Clothes Available
                            </h2>

                            <p>
                                Vendors haven't added any
                                rental outfits yet.
                            </p>
                        </div>
                    ) : (
                        clothes.map((cloth) => (
                            <div
                                className="cloth-card"
                                key={cloth.cloth_id}
                            >

                                <div className="cloth-image-placeholder">
                                    👗
                                </div>

                                <div className="cloth-card-body">

                                    <span className="cloth-category">
                                        {cloth.category}
                                    </span>

                                    <h3>
                                        {cloth.cloth_name}
                                    </h3>

                                    <p>
                                        Size: {cloth.size}
                                    </p>

                                    <p>
                                        {cloth.description ||
                                            "Premium rental outfit"}
                                    </p>

                                    <div className="cloth-card-bottom">

                                        <strong>
                                            ₹{cloth.price}
                                        </strong>

                                        <span>
                                            {cloth.availability}
                                        </span>

                                    </div>

                                    <button
                                        type="button"
                                        className="rent-button"
                                        onClick={() => {
                                            localStorage.setItem(
                                                "selectedCloth",
                                                JSON.stringify(cloth)
                                            );

                                            navigate(
                                                "/cloth-details"
                                            );
                                        }}
                                    >
                                        View Details
                                    </button>

                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </div>
    );
}

function ClothDetails() {
    const navigate = useNavigate();

    const [cloth, setCloth] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const savedCloth =
            localStorage.getItem("selectedCloth");

        if (savedCloth) {
            try {
                setCloth(JSON.parse(savedCloth));
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    const handleAddToCart = () => {
        if (!cloth) {
            return;
        }

        const savedCart =
            localStorage.getItem("cart");

        let cart = [];

        if (savedCart) {
            try {
                cart = JSON.parse(savedCart);
            } catch (error) {
                console.error(error);
                cart = [];
            }
        }

        const existingItem = cart.find(
            (item) => item.cloth_id === cloth.cloth_id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...cloth,
                quantity: 1,
            });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        setMessage(
            `${cloth.cloth_name} added to cart!`
        );
    };

    if (!cloth) {
        return (
            <div className="simple-page">
                <div className="simple-card">
                    <h1>Cloth Not Found</h1>

                    <button
                        onClick={() =>
                            navigate("/clothes")
                        }
                    >
                        Back to Clothes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cloth-details-page">

            <div className="cloth-details-card">

                <div className="details-top-bar">
                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/clothes")
                        }
                    >
                        ← Back to Clothes
                    </button>

                    <button
                        className="cart-top-button"
                        onClick={() =>
                            navigate("/cart")
                        }
                    >
                        🛒 Cart
                    </button>
                </div>

                <div className="cloth-details-content">

                    <div className="cloth-details-image">
                        <img
                            src={getClothImage(cloth)}
                            alt={cloth.cloth_name}
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = CLOTH_IMAGES.dress;
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>

                    <div className="cloth-details-info">

                        <span className="cloth-category">
                            {cloth.category}
                        </span>

                        <h1>
                            {cloth.cloth_name}
                        </h1>

                        <p className="cloth-description">
                            {cloth.description ||
                                "Premium rental outfit for your special occasion."}
                        </p>

                        <div className="detail-row">
                            <span>Size</span>

                            <strong>
                                {cloth.size}
                            </strong>
                        </div>

                        <div className="detail-row">
                            <span>Rental Price</span>

                            <strong>
                                ₹{cloth.price}
                            </strong>
                        </div>

                        <div className="detail-row">
                            <span>Availability</span>

                            <strong>
                                {cloth.availability}
                            </strong>
                        </div>

                        {message && (
                            <p className="cart-success-message">
                                {message}
                            </p>
                        )}

                        <button
                            className="add-cart-button"
                            onClick={handleAddToCart}
                        >
                            🛒 Add to Cart
                        </button>

                        <button
                            className="buy-now-button"
                            onClick={() => {
                                handleAddToCart();
                                navigate("/cart");
                            }}
                        >
                            Rent Now →
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
function Cart() {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart =
            localStorage.getItem("cart");

        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error(error);
                setCart([]);
            }
        }
    }, []);

    const updateCart = (clothId, change) => {
        const updatedCart = cart
            .map((item) => {
                if (item.cloth_id === clothId) {
                    return {
                        ...item,
                        quantity: item.quantity + change,
                    };
                }

                return item;
            })
            .filter(
                (item) => item.quantity > 0
            );

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    const removeItem = (clothId) => {
        const updatedCart = cart.filter(
            (item) => item.cloth_id !== clothId
        );

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) * item.quantity,
        0
    );

    return (
        <div className="cart-page">

            <div className="cart-container">

                <div className="cart-header">

                    <div>
                        <div className="simple-brand">
                            Rent<span>&</span>Wear
                        </div>

                        <h1>
                            Your Cart
                        </h1>

                        <p>
                            Review your selected rental outfits.
                        </p>
                    </div>

                    <button
                        className="cart-back-button"
                        onClick={() =>
                            navigate("/clothes")
                        }
                    >
                        ← Continue Shopping
                    </button>

                </div>

                {cart.length === 0 ? (

                    <div className="empty-cart">

                        <div className="empty-cart-icon">
                            🛒
                        </div>

                        <h2>
                            Your cart is empty
                        </h2>

                        <p>
                            Browse our available outfits
                            and add something you love.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/clothes")
                            }
                        >
                            Browse Clothes
                        </button>

                    </div>

                ) : (

                    <div className="cart-layout">

                        <div className="cart-items">

                            {cart.map((item) => (

                                <div
                                    className="cart-item"
                                    key={item.cloth_id}
                                >

                                    <div className="cart-item-image">
                                        👗
                                    </div>

                                    <div className="cart-item-info">

                                        <span className="cloth-category">
                                            {item.category}
                                        </span>

                                        <h3>
                                            {item.cloth_name}
                                        </h3>

                                        <p>
                                            Size: {item.size}
                                        </p>

                                        <strong>
                                            ₹{item.price}
                                        </strong>

                                    </div>

                                    <div className="cart-item-actions">

                                        <div className="quantity-controls">

                                            <button
                                                onClick={() =>
                                                    updateCart(
                                                        item.cloth_id,
                                                        -1
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateCart(
                                                        item.cloth_id,
                                                        1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            className="remove-button"
                                            onClick={() =>
                                                removeItem(
                                                    item.cloth_id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="cart-summary">

                            <h2>
                                Order Summary
                            </h2>

                            <div className="summary-row">
                                <span>
                                    Items
                                </span>

                                <strong>
                                    {cart.reduce(
                                        (sum, item) =>
                                            sum + item.quantity,
                                        0
                                    )}
                                </strong>
                            </div>

                            <div className="summary-row">
                                <span>
                                    Rental Total
                                </span>

                                <strong>
                                    ₹{total}
                                </strong>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-total">
                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{total}
                                </strong>
                            </div>

                            
                            <button
                                className="checkout-button"
                                onClick={() => navigate("/booking")}
                            >
                                Proceed to Booking →
                            </button>
                                

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}
function Booking() {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [bookingDate, setBookingDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [message, setMessage] = useState("");
    const [bookingId, setBookingId] = useState(null);

    const [paymentId, setPaymentId] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [paidAmount, setPaidAmount] = useState(0);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error(error);
                setCart([]);
            }
        }
    }, []);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            return null;
        }

        try {
            const payload = JSON.parse(
                atob(
                    token
                        .split(".")[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );

            return Number(payload.sub);
        } catch (error) {
            console.error("Could not read user ID:", error);
            return null;
        }
    };

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
                Number(item.quantity || 1),
        0
    );

    const handleBooking = async (event) => {
        event.preventDefault();

        if (cart.length === 0) {
            setMessage("Your cart is empty.");
            return;
        }

        if (!bookingDate || !returnDate) {
            setMessage(
                "Please select booking and return dates."
            );
            return;
        }

        if (returnDate <= bookingDate) {
            setMessage(
                "Return date must be after booking date."
            );
            return;
        }

        const userId = getUserIdFromToken();

        if (!userId) {
            setMessage(
                "User information not found. Please login again."
            );
            return;
        }

        try {
            let firstBookingId = null;

            for (const item of cart) {
                const response = await axios.post(
                    `${API_URL}/bookings/`,
                    {
                        user_id: userId,
                        cloth_id: item.cloth_id,
                        booking_date: bookingDate,
                        return_date: returnDate,
                    }
                );

                if (!firstBookingId) {
                    firstBookingId =
                        response.data.booking_id;
                }
            }

            setBookingId(firstBookingId);

            setMessage(
                "Booking confirmed successfully!"
            );
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Booking failed."
            );
        }
    };

    const handlePayment = async () => {
        if (!bookingId) {
            setMessage(
                "Booking information not found."
            );
            return;
        }

        try {
            setMessage("Processing payment...");

            const response = await axios.post(
                `${API_URL}/payments/`,
                {
                    booking_id: bookingId,
                    amount: total,
                }
            );

            setPaymentId(
                response.data.payment_id
            );

            setTransactionId(
                response.data.transaction_id
            );

            setPaidAmount(
                Number(response.data.amount)
            );

            setPaymentStatus(
                response.data.payment_status
            );

            setMessage(
                "Payment completed successfully!"
            );

            localStorage.removeItem("cart");
            setCart([]);
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Payment failed."
            );
        }
    };

    if (bookingId && !paymentId) {
        return (
            <div className="simple-page">
                <div className="simple-card">

                    <div className="simple-brand">
                        Rent<span>&</span>Wear
                    </div>

                    <div className="booking-success-icon">
                        ✓
                    </div>

                    <h1>
                        Booking Confirmed
                    </h1>

                    <p>
                        Your rental booking has been
                        successfully created.
                    </p>

                    <div className="booking-confirmation-box">

                        <p>
                            <strong>
                                Booking ID:
                            </strong>{" "}
                            #{bookingId}
                        </p>

                        <p>
                            <strong>
                                Booking Date:
                            </strong>{" "}
                            {bookingDate}
                        </p>

                        <p>
                            <strong>
                                Return Date:
                            </strong>{" "}
                            {returnDate}
                        </p>

                        <p>
                            <strong>
                                Total Amount:
                            </strong>{" "}
                            ₹{total}
                        </p>

                    </div>

                    {message && (
                        <p className="signup-message">
                            {message}
                        </p>
                    )}

                    <button
                        onClick={handlePayment}
                        className="checkout-button"
                    >
                        Pay Now →
                    </button>

                </div>
            </div>
        );
    }

    if (paymentId) {
        return (
            <div className="simple-page">
                <div className="simple-card">

                    <div className="simple-brand">
                        Rent<span>&</span>Wear
                    </div>

                    <div className="booking-success-icon">
                        ✓
                    </div>

                    <h1>
                        Payment Successful
                    </h1>

                    <p>
                        Your rental payment has been
                        completed successfully.
                    </p>

                    <div className="booking-confirmation-box">

                        <p>
                            <strong>
                                Booking ID:
                            </strong>{" "}
                            #{bookingId}
                        </p>

                        <p>
                            <strong>
                                Payment ID:
                            </strong>{" "}
                            #{paymentId}
                        </p>

                        <p>
                            <strong>
                                Transaction ID:
                            </strong>{" "}
                            #{transactionId}
                        </p>

                        <p>
                            <strong>
                                Amount Paid:
                            </strong>{" "}
                            ₹{paidAmount}
                        </p>

                        <p>
                            <strong>
                                Payment Status:
                            </strong>{" "}
                            {paymentStatus}
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/my-rentals")
                        }
                    >
                        My Rentals
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">

            <div className="booking-container">

                <div className="booking-header">

                    <div>
                        <div className="simple-brand">
                            Rent<span>&</span>Wear
                        </div>

                        <h1>
                            Rental Booking
                        </h1>

                        <p>
                            Choose your rental period
                            and confirm your outfit.
                        </p>
                    </div>

                    <button
                        className="cart-back-button"
                        onClick={() =>
                            navigate("/cart")
                        }
                    >
                        ← Back to Cart
                    </button>

                </div>

                <div className="booking-layout">

                    <div className="booking-form-card">

                        <h2>
                            Booking Details
                        </h2>

                        <form
                            onSubmit={handleBooking}
                            className="booking-form"
                        >

                            <div className="booking-field">

                                <label>
                                    Rental Start Date
                                </label>

                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) =>
                                        setBookingDate(
                                            e.target.value
                                        )
                                    }
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    required
                                />

                            </div>

                            <div className="booking-field">

                                <label>
                                    Return Date
                                </label>

                                <input
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) =>
                                        setReturnDate(
                                            e.target.value
                                        )
                                    }
                                    min={
                                        bookingDate ||
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    required
                                />

                            </div>

                            <div className="booking-field">

                                <label>
                                    Delivery Address
                                </label>

                                <textarea
                                    placeholder="Enter your delivery address"
                                    required
                                ></textarea>

                            </div>

                            <div className="booking-field">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>

                            {message && (
                                <p className="signup-message">
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="checkout-button"
                            >
                                Confirm Booking →
                            </button>

                        </form>

                    </div>

                    <div className="booking-summary">

                        <h2>
                            Rental Summary
                        </h2>

                        {cart.map((item) => (

                            <div
                                className="booking-item"
                                key={item.cloth_id}
                            >

                                <div className="booking-item-image">
                                    👗
                                </div>

                                <div>

                                    <strong>
                                        {item.cloth_name}
                                    </strong>

                                    <p>
                                        Qty:{" "}
                                        {item.quantity || 1}
                                    </p>

                                    <span>
                                        ₹{item.price}
                                    </span>

                                </div>

                            </div>

                        ))}

                        <div className="summary-divider"></div>

                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{total}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

function MyRentals() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [returningId, setReturningId] = useState(null);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            return null;
        }

        try {
            const payload = JSON.parse(
                atob(
                    token
                        .split(".")[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );

            return Number(payload.sub);
        } catch (error) {
            console.error(
                "Could not read user ID:",
                error
            );

            return null;
        }
    };

    const loadBookings = async () => {
        const userId = getUserIdFromToken();

        if (!userId) {
            setMessage(
                "User information not found. Please login again."
            );

            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${API_URL}/bookings/${userId}`
            );

            setBookings(response.data);
            setMessage("");
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.detail ||
                "Could not load your rentals."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleReturn = async (bookingId) => {
        try {
            setReturningId(bookingId);
            setMessage("");

            const response = await axios.put(
                `${API_URL}/bookings/${bookingId}/return`
            );

            setBookings((currentBookings) =>
                currentBookings.map((booking) =>
                    booking.booking_id === bookingId
                        ? {
                              ...booking,
                              status: response.data.status
                          }
                        : booking
                )
            );

            setMessage(
                "Rental returned successfully!"
            );
        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.detail ||
                "Failed to return rental."
            );
        } finally {
            setReturningId(null);
        }
    };

    return (
        <div className="clothes-page">

            <div className="clothes-container">

                <div className="clothes-header">

                    <div>
                        <div className="simple-brand">
                            Rent<span>&</span>Wear
                        </div>

                        <h1>
                            My Rentals
                        </h1>

                        <p>
                            View your rental bookings
                            and order details.
                        </p>
                    </div>

                    <button
                        className="cart-back-button"
                        onClick={() =>
                            navigate("/clothes")
                        }
                    >
                        ← Browse Clothes
                    </button>

                </div>

                {loading && (
                    <div className="empty-clothes">
                        <h2>
                            Loading rentals...
                        </h2>
                    </div>
                )}

                {!loading && message && (
                    <p className="signup-message">
                        {message}
                    </p>
                )}

                {!loading &&
                    !message &&
                    bookings.length === 0 && (
                        <div className="empty-clothes">

                            <h2>
                                No Rentals Yet
                            </h2>

                            <p>
                                You have not made any
                                rental bookings yet.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/clothes")
                                }
                            >
                                Browse Clothes
                            </button>

                        </div>
                    )}

                {!loading &&
                    bookings.length > 0 && (

                        <div className="clothes-grid">

                            {bookings.map((booking) => (

                                <div
                                    className="cloth-card"
                                    key={booking.booking_id}
                                >

                                    <div className="cloth-image-placeholder">
                                        👗
                                    </div>

                                    <div className="cloth-card-body">

                                        <span className="cloth-category">
                                            {booking.category}
                                        </span>

                                        <h3>
                                            {booking.cloth_name}
                                        </h3>

                                        <p>
                                            Booking ID: #
                                            {booking.booking_id}
                                        </p>

                                        <p>
                                            Rental Date:{" "}
                                            {booking.booking_date}
                                        </p>

                                        <p>
                                            Return Date:{" "}
                                            {booking.return_date}
                                        </p>

                                        <div className="cloth-card-bottom">

                                            <strong>
                                                ₹{booking.price}
                                            </strong>

                                            <span>
                                                {booking.status}
                                            </span>

                                        </div>

                                        {booking.status !== "Returned" && (
                                            <button
                                                className="rent-button"
                                                onClick={() =>
                                                    handleReturn(
                                                        booking.booking_id
                                                    )
                                                }
                                                disabled={
                                                    returningId ===
                                                    booking.booking_id
                                                }
                                            >
                                                {returningId ===
                                                booking.booking_id
                                                    ? "Returning..."
                                                    : "Return Rental"}
                                            </button>
                                        )}

                                        {booking.status === "Returned" && (
                                            <p className="cart-success-message">
                                                ✓ Rental Returned
                                            </p>
                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

            </div>

        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/vendor-dashboard"
                    element={<VendorDashboard />}
                />

                <Route
                    path="/vendor"
                    element={<Vendor />}
                />

                <Route
                    path="/vendor-clothes"
                    element={<VendorClothes />}
                />

                <Route
                    path="/clothes"
                    element={<Clothes />}
                />

                <Route
                    path="/cloth-details"
                    element={<ClothDetails />}
                />
                <Route
                    path="/cart"
                    element={<Cart />}
                />
                <Route
                    path="/booking"
                    element={<Booking />}
                />

                <Route
                    path="/my-rentals"
                    element={<MyRentals />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;