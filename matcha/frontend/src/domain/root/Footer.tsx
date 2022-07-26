import { Grid, Typography } from "@material-ui/core";
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Footer.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:23 by allefebv          #+#    #+#             */
/*   Updated: 2020/09/28 14:31:34 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

const styleFooter: React.CSSProperties = {
	display: "flex",
	color: "white",
	zIndex: 10,
	justifyContent: "center",
};

interface Props {}

export class Footer extends React.Component<Props> {
	render() {
		return (
			<Grid item xs={4} style={styleFooter}>
				<Typography>made by jfleury-allefebv</Typography>
			</Grid>
		);
	}
}
