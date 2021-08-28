import React, { useState } from "react";
import "./login.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { login } from "../../Services/firebase.service";

export default function Login({ goToRegister }) {
	const [form, setform] = useState({
		email: "",
		password: "",
		passwordVisible: false,
	});

	function updateForm(e, field) {
		setform({ ...form, [`${field}`]: e.target.value });
	}

	function toggleVisibility() {
		setform({ ...form, passwordVisible: !form.passwordVisible });
	}

	function handleLogin() {
		login(form.email, form.password);
	}

	return (
		<div className="login">
			<div className="left-side"></div>

			<div className="right-side">
				{/* <p>Get Started</p>

					<p>
						Need an account? <span>Regiater</span>
					</p>

					<button>Sign In With Google</button> */}

				{/* <RussTextField
						value={"russ"}
						onChange={updateForm}
						// required
						// type="email"
						// label="Email Address"
					/> */}

				<div style={{ height: 100 }} />

				<div className="login-input-placeholder-container">
					<p className="login-placeholder">email</p>

					<input
						value={form.email}
						className="login-input"
						type="email"
						onChange={(e) => updateForm(e, "email")}
					/>
				</div>

				<div className="login-input-placeholder-container">
					<p className="login-placeholder">password</p>

					<input
						value={form.password}
						className="login-input"
						type={form.passwordVisible ? "text" : "password"}
						onChange={(e) => updateForm(e, "password")}
					/>

					<div className="toggle-visible" onClick={toggleVisibility}>
						{form.passwordVisible ? (
							<VisibilityIcon style={{ color: "white", fontSize: 15 }} />
						) : (
							<VisibilityOffIcon style={{ color: "white", fontSize: 15 }} />
						)}
					</div>
				</div>

				<button className="login-btn" onClick={handleLogin}>
					Login
				</button>
			</div>
		</div>
	);
}
