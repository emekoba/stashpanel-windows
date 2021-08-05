import "./stashpanel.css";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import MenuBar from "./Components/MenuBar/MenuBar";
import { menu, CloseIcon, MenuIcon, MinimizeIcon } from "./Resources/Resources";

function StashPanel() {
	function toggleArchive() {}

	return (
		<div className="stashpanel">
			<div className="window-menu">
				<div className="window-menu-item">
					<MinimizeIcon style={{ ..._x.menuItem, paddingBottom: 5 }} />
				</div>

				<div className="window-menu-item drag-window">
					<MenuIcon style={_x.menuItem} />
				</div>

				<div className="window-menu-item">
					<CloseIcon style={_x.menuItem} />
				</div>
			</div>

			<MenuBar />

			<Home />

			{/* <img className="close" src={close} /> */}

			{/* <img src={down} className="doubledown" /> */}

			{/* <Footer /> */}

			{/* <div className="open-archive" onClick={toggleArchive}>
				<img className="bounce-on-click" src={menu} />
			</div> */}
		</div>
	);
}

export default StashPanel;

const _x = {
	menuItem: { color: "white", fontSize: 12 },
};
