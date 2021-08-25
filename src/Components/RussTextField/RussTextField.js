import React from "react";
import { CircularProgress, IconButton, Typography } from "@material-ui/core";
import { TextValidator } from "react-material-ui-form-validator";
import { useStyles } from "./RussTextField.style";

export default function RussTextField({
	type,
	required,
	fullWidth,
	value,
	onChange,
	endIcon,
	size,
	label,
	onEndIconClick,
	loader,
	variant,
	forValidator,
	disabled,
	labelStyles,
	customClasses,
	labelVariant,
}) {
	const classes = useStyles();

	function resolveValidatorParams() {
		switch (type) {
			case "email":
				return "isEmail";

			case "password":
				return "isPassword";

			case "customUrl":
				return "isString";

			case "number":
				return "isNumber";

			default:
				return "isString";
		}
	}

	function resolveEndIcon() {
		const _endIcon = (
			<IconButton
				style={{ padding: endIcon && loader ? 10 : 0 }}
				onClick={onEndIconClick}
			>
				{endIcon}
			</IconButton>
		);

		const _loader = (
			<div style={{ marginTop: 7 }}>
				<CircularProgress
					size={20}
					// style={{ background: color ?? "#ff6900" }}
				/>
			</div>
		);

		if (endIcon && loader)
			return (
				<>
					{_endIcon} {!disabled && _loader}
				</>
			);
		else if (endIcon) return _endIcon;
		else if (loader) return !disabled && _loader;
	}

	function resolveFieldType() {
		switch (type) {
			default:
				return (
					<>
						{variant === "topside" && (
							<Typography
								className="input-label"
								htmlFor={type}
								style={{
									...labelStyles,
									marginLeft: labelVariant === "margined" ? 20 : null,
									fontWeight: labelVariant === "margined" ? "bold" : null,
									fontSize: labelVariant === "margined" ? 14 : null,
								}}
							>
								{label}
							</Typography>
						)}

						<TextValidator
							variant="outlined"
							size={size ?? "small"}
							required={required ? true : false}
							fullWidth={fullWidth === false ? false : true}
							id={type}
							label={label && variant !== "topside" ? type : null}
							type={type ?? "text"}
							name={type}
							disabled={disabled ? true : false}
							className={[classes.inputWrapper, customClasses]}
							InputProps={{
								classes: {
									notchedOutline: classes.notchedOutline,
								},

								endAdornment: resolveEndIcon(),
							}}
							autoComplete={type}
							value={value}
							onChange={(e) => onChange(e, type)}
							validators={[
								`${required ? "required" : ""}`,
								`${resolveValidatorParams()}`,
							]}
							errorMessages={[
								`${forValidator ?? type} is required", "Not a valid ${
									forValidator ?? type
								}`,
							]}
						/>
					</>
				);
		}
	}

	return <div>{resolveFieldType()}</div>;
}
