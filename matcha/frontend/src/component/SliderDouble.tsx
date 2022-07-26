/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SliderDouble.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:14 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/24 14:19:14 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import "./SliderDouble.css";

interface Props {
	min: number;
	max: number;
	step: number;
}

const styleInputLeft: React.CSSProperties = {
	position: "absolute",
	width: "100%",
	height: "0.5vh",
	zIndex: 2,
	WebkitAppearance: "none",
	pointerEvents: "none",
	opacity: 0,
};

const styleInputRight: React.CSSProperties = {
	position: "absolute",
	width: "100%",
	height: "0.5vh",
	zIndex: 2,
	WebkitAppearance: "none",
	pointerEvents: "none",
	opacity: 0,
};

const styleSlider: React.CSSProperties = {
	position: "relative",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "4vh",
	width: "80%",
};
const styleTrack: React.CSSProperties = {
	position: "absolute",
	backgroundColor: "#ff77a9",
	zIndex: 1,
	width: "100%",
	height: "0.5vh",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	borderRadius: "10%",
};

const styleHover: React.CSSProperties = {
	boxShadow: "0 0 0 10px rgba(236,64,122, 0.2)",
};

const styleClick: React.CSSProperties = {
	boxShadow: "0 0 0 15px rgba(236,64,122, 0.4)",
};

export const SliderDouble = (props: Props) => {
	const [valueLeft, setValueLeft] = useState(props.min);
	const [valueRight, setValueRight] = useState(props.max);
	const [isHoveredRight, setValueIsHoveredRight] = useState(false);
	const [isClickedRight, setValueIsClickedRight] = useState(false);
	const [isHoveredLeft, setValueIsHoveredLeft] = useState(false);
	const [isClickedLeft, setValueIsClickedLeft] = useState(false);

	function computeLeft() {
		return ((valueLeft - props.min) / (props.max - props.min)) * 100;
	}

	function computeRight() {
		return 100 - ((valueRight - props.min) / (props.max - props.min)) * 100;
	}

	function handleChangeLeft(event: React.ChangeEvent<HTMLInputElement>) {
		valueRight > parseInt(event.currentTarget.value) &&
			setValueLeft(parseInt(event.currentTarget.value));
	}

	function handleChangeRight(event: React.ChangeEvent<HTMLInputElement>) {
		valueLeft < parseInt(event.currentTarget.value) &&
			setValueRight(parseInt(event.currentTarget.value));
	}

	function handleMouseEnterRight(event: React.MouseEvent) {
		setValueIsHoveredRight(true);
	}

	function handleMouseLeaveRight(event: React.MouseEvent) {
		setValueIsHoveredRight(false);
	}

	function handleMouseDownRight(event: React.MouseEvent) {
		setValueIsClickedRight(true);
	}

	function handleMouseUpRight(event: React.MouseEvent) {
		setValueIsClickedRight(false);
	}

	function handleMouseEnterLeft(event: React.MouseEvent) {
		setValueIsHoveredLeft(true);
	}

	function handleMouseLeaveLeft(event: React.MouseEvent) {
		setValueIsHoveredLeft(false);
	}

	function handleMouseDownLeft(event: React.MouseEvent) {
		setValueIsClickedLeft(true);
	}

	function handleMouseUpLeft(event: React.MouseEvent) {
		setValueIsClickedLeft(false);
	}

	const styleThumbLeft: React.CSSProperties = {
		position: "absolute",
		top: "50%",
		zIndex: 2,
		width: "16px",
		height: "16px",
		backgroundColor: "#b4004e",
		borderRadius: "50%",
		left: `${computeLeft()}%`,
		transform: `translate(-${computeLeft()}%, -50%)`,
		transition: "box-shadow .3s"
	};

	const styleThumbRight: React.CSSProperties = {
		position: "absolute",
		top: "50%",
		zIndex: 2,
		width: "16px",
		height: "16px",
		backgroundColor: "#b4004e",
		borderRadius: "50%",
		transform: `translate(${computeRight()}%, -50%)`,
		right: `${computeRight()}%`,
		transition: "box-shadow .3s"
	};

	const styleRange: React.CSSProperties = {
		position: "absolute",
		backgroundColor: "#b4004e",
		height: "0.6vh",
		zIndex: 2,
		top: "50%",
		left: `${computeLeft()}%`,
		right: `${computeRight()}%`,
		borderRadius: "10%",
		pointerEvents: "none",
		transform: "translate(0, -50%)",
	};

	return (
		<div style={styleSlider}>
			<div style={styleTrack}></div>
			<div style={styleRange}></div>
			<div
				style={Object.assign(
					{},
					styleThumbLeft,
					isHoveredLeft && styleHover,
					isClickedLeft && styleClick
				)}
			></div>
			<div
				style={Object.assign(
					{},
					styleThumbRight,
					isHoveredRight && styleHover,
					isClickedRight && styleClick
				)}
			></div>

			<input
				style={styleInputLeft}
				type="range"
				min={props.min}
				max={props.max}
				step={props.step}
				value={valueLeft}
				onChange={handleChangeLeft}
				onMouseEnter={handleMouseEnterLeft}
				onMouseLeave={handleMouseLeaveLeft}
				onMouseDown={handleMouseDownLeft}
				onMouseUp={handleMouseUpLeft}
			/>

			<input
				style={styleInputRight}
				type="range"
				min={props.min}
				max={props.max}
				step={props.step}
				value={valueRight}
				onChange={handleChangeRight}
				onMouseEnter={handleMouseEnterRight}
				onMouseLeave={handleMouseLeaveRight}
				onMouseDown={handleMouseDownRight}
				onMouseUp={handleMouseUpRight}
			/>
		</div>
	);
};
