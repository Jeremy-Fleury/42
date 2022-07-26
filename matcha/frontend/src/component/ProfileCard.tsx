/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCard.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/30 17:59:49 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/11 15:22:14 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button, CardMedia } from "@material-ui/core";
import * as constants from "../services/constants";
import { useHistory } from "react-router-dom";
import { IlistProfiles } from "../types/types";

const useStyles = makeStyles({
	root: {},
	media: {
		height: 0,
		paddingTop: "56%",
	},
});

type Props = {
	entry: IlistProfiles;
};

export function ProfileCard(props: Props) {
	const { username, age, bio } = props.entry.profile;
	const { distanceInKm } = props.entry.location;
	const classes = useStyles();
	const path = "http://localhost:3001/images/" + username + "img0";
	const history = useHistory();

	const handleRedirectProfile = () => {
		history.push({
			pathname: constants.VISIT_PROFILE,
			state: props.entry,
		});
	};

	const formatTags = (tags: string[]) => {
		return tags.map((tag) => (
			<Typography display="inline" key={tag}>
				#{tag}{" "}
			</Typography>
		));
	};

	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={path} />
			<CardContent>
				<Typography variant="body1">
					{username}, {age},{" "}
					{distanceInKm ? Math.ceil(distanceInKm) + "km" : "unknown location"}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{bio}
				</Typography>
				{props.entry.tag && formatTags(props.entry.tag)}
			</CardContent>
			<CardActions
				disableSpacing
				style={{ display: "flex", justifyContent: "center" }}
			>
				<Button
					startIcon={<AccountCircleIcon />}
					onClick={handleRedirectProfile}
				>
					<Typography variant="button">View Profile</Typography>
				</Button>
			</CardActions>
		</Card>
	);
}
