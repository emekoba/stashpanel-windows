import RotateLoader from "react-spinners/RotateLoader";
import PuffLoader from "react-spinners/PuffLoader";
import RingLoader from "react-spinners/RingLoader";
import PulseLoader from "react-spinners/PulseLoader";
import RiseLoader from "react-spinners/RiseLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import ClipLoader from "react-spinners/ClipLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";
import { useEffect } from "react";
import "./loader.css";
import { CloudOffIcon } from "../../Resources/Resources";
import { connect } from "react-redux";

export const LoaderState = {
	LOADING: "LOADING",
	SUCCESS: "SUCCESS",
	FAILURE: "FAILURE",
	OFFLINE: "OFFLINE",
};

function Loader({ isLoading, currentLoaderState, size, type, loaderStyles }) {
	const _loader_type = "pulse";

	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
		background: none;
	`;

	const _loader_props = {
		color: "var(--glass)",
		loading: isLoading,
		css: override,
		size: size ?? 6,
	};

	useEffect(() => {
		const _loader = document.querySelector(".loader");

		if (_loader) {
			_loader.style.animation = `${
				isLoading
					? "open-loader-animation 0.5s forwards"
					: "close-loader-animation 0.5s forwards"
			}`;

			setTimeout(
				() => {
					Array.from(_loader.childNodes).map((each) => {
						each.style.display = `${isLoading ? "flex" : "none"}`;
					});
				},
				isLoading ? 400 : 0
			);

			setTimeout(() => {
				_loader.style.display = `${isLoading ? "flex" : "none"}`;
			}, 350);
		}
	}, [isLoading]);

	function getLoader() {
		let _loader_comp;

		if (currentLoaderState === LoaderState.OFFLINE) {
			_loader_comp = (
				<CloudOffIcon
					style={{
						fontSize: 23,
						color: "var(--glass)",
						width: "100%",
					}}
				/>
			);
		} else {
			switch (type ?? _loader_type) {
				case "scale":
					_loader_comp = <ScaleLoader {..._loader_props} />;
					break;

				case "ring":
					_loader_comp = <RingLoader {..._loader_props} />;
					break;

				case "puff":
					_loader_comp = <PuffLoader {..._loader_props} />;
					break;

				case "rotate":
					_loader_comp = <RotateLoader {..._loader_props} />;
					break;

				case "pulse":
					_loader_comp = <PulseLoader {..._loader_props} />;
					break;

				case "clip":
					_loader_comp = <ClipLoader {..._loader_props} />;
					break;

				case "rise":
					_loader_comp = <RiseLoader {..._loader_props} />;
					break;

				case "propagate":
					_loader_comp = <PropagateLoader {..._loader_props} />;
					break;

				default:
					break;
			}
		}

		return <div className="loader-icon-scaffold">{_loader_comp}</div>;
	}

	return <div className="loader">{getLoader()}</div>;
}

function mapStateToProps(state) {
	return {
		isLoading: state.loader.isLoading,
		currentLoaderState: state.loader.loaderState,
	};
}

export default connect(mapStateToProps)(Loader);
