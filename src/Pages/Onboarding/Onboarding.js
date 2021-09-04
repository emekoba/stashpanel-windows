import React, { useEffect, useState } from "react";
import "./onboarding.css";
import Login from "../Login/Login";
import Splash from "../Splash/Splash";
import Register from "../Register/Register";

export default function Onboarding() {
	const [onboarding, setonboarding] = useState({
		route: "login",
	});

	useEffect(
		() => setTimeout(() => setonboarding({ ...onboarding, route: "login" }), 0),
		[null]
	);

	function getRoute() {
		switch (onboarding.route) {
			case "login":
				return <Login />;
				break;

			case "register":
				return <Register />;
				break;

			case "splash":
				break;

			case "add-collection":
				break;

			default:
				break;
		}
	}

	function goToRegister() {}

	function goToLogin() {}

	return (
		<div className="onboarding hideScroll">
			{!onboarding.route === "splash" ? <Splash /> : <>{getRoute()}</>}
		</div>
	);
}
