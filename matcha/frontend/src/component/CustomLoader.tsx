/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   CustomLoader.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/30 17:38:42 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/26 11:38:26 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { makeStyles } from "@material-ui/core";
import React from "react";

type Props = {};

const useStyles = makeStyles({
	imageIcon: {
		display: "flex",
		height: "inherit",
		width: "inherit",
	},
	iconRoot: {
		textAlign: "center",
	},
});

export const CustomLoader = (props: Props) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<img
				className={classes.imageIcon}
				src="http://localhost:3001/images/custom_loader.svg"
				alt="loader"
			/>
		</React.Fragment>
	);
};
