import React, { createContext, useState } from "react";

export const Brim = createContext();

export const Control = (props) => {
	const [control, setcontrol] = useState({
		currentDevice: "Hp Pavilion",

		user: {
			id: "nM3l2KmFy8A8ZwVvxD2k",
			firstName: "",
			lastName: "",
			email: "",
			collectionId: "HwVasR1GVohvQBAm4x86",
		},

		settings: {
			instantArchive: true,
			archiveDelay: 3,
		},
	});

	return (
		<Brim.Provider value={[control, setcontrol]}>
			{props.children}
		</Brim.Provider>
	);
};
