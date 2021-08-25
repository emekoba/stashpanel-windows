import React, { createContext, useState } from "react";

export const Brim = createContext();

export const Control = (props) => {
	const [control, setcontrol] = useState({
		deviceId: "fukvUJHvPZ3KfGRNlvUd",

		collectionId: "eQFU59ZiUm2bNViUU29Q",

		archive: {},

		stage: {},

		user: {
			id: "kMSGxfO5H5SmwQoIGKC17b7pvWS2",
			firstName: "",
			lastName: "",
			email: "",
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
