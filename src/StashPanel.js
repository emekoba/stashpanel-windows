import "./stashpanel.css";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import MenuBar from "./Components/MenuBar/MenuBar";
import { menu } from "./Resources/Resources";

function StashPanel() {
	function toggleArchive() {}

	return (
		<div className="stashpanel">
			<MenuBar />

			<Home />

			{/* <img className="close" src={close} /> */}

			{/* <img src={down} className="doubledown" /> */}

			{/* <Footer /> */}

			<div className="open-archive" onClick={toggleArchive}>
				<img className="bounce-on-click" src={menu} />
			</div>
		</div>
	);
}

export default StashPanel;
