import React, { useState } from "react";
import "./register.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { register } from "../../Services/firebase.service";

export default function Register({ goToRegister }) {
	const [form, setform] = useState({
		firstname: "",
		lastname: "",
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

	async function handleRegister() {
		register(form.firstname, form.lastname, form.email, form.password);
	}

	return (
		<div className="register">
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

				<div className="register-input-placeholder-container">
					<p className="register-placeholder">firstname</p>

					<input
						value={form.firstname}
						className="register-input"
						type="firstname"
						onChange={(e) => updateForm(e, "firstname")}
					/>
				</div>

				<div className="register-input-placeholder-container">
					<p className="register-placeholder">lastname</p>

					<input
						value={form.lastname}
						className="register-input"
						type="lastname"
						onChange={(e) => updateForm(e, "lastname")}
					/>
				</div>

				<div className="register-input-placeholder-container">
					<p className="register-placeholder">email</p>

					<input
						value={form.email}
						className="register-input"
						type="email"
						onChange={(e) => updateForm(e, "email")}
					/>
				</div>

				<div className="register-input-placeholder-container">
					<p className="register-placeholder">password</p>

					<input
						value={form.password}
						className="register-input"
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

				<button className="register-btn" onClick={handleRegister}>
					Register
				</button>
			</div>
		</div>
	);
}
