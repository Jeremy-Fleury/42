/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MaterialDoubleSlider.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/21 21:19:49 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/11 18:33:08 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import Slider from "@material-ui/core/Slider";

type Props = {
	min: number;
	max: number;
	value: number[] | number;
	handleChange: (
		event: React.ChangeEvent<{}>,
		value: number | number[]
	) => void;
};

export const MaterialDoubleSlider = (props: Props) => {
	return (
		<Slider
			min={props.min}
			max={props.max}
			value={props.value}
			onChange={props.handleChange}
			valueLabelDisplay="auto"
			aria-labelledby="range-slider"
			color="secondary"
		/>
	);
};
