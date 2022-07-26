/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   InListProfileCard.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:05 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/15 15:22:20 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Avatar, Button, Card, Typography } from "@material-ui/core";
import { IlistProfiles, Iprofile } from "../types/types";
import { useHistory } from "react-router-dom";
import * as constants from "../services/constants";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { getProfileByUsernameAPI } from "../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { errorHandling } from "../services/profileUtils";

const styleCard: React.CSSProperties = {
	display: "flex",
	height: "8vh",
	width: "100%",
};

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	username: state.user.profile.username,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	profile: Iprofile;
} & ReduxProps;

function InListProfileCardComponent(props: Props) {
	const history = useHistory();
	const [profile, setProfile] = useState<IlistProfiles>();
	const controller = new AbortController();
	useEffect(() => {
		getProfileByUsernameAPI(
			props.loggedIn,
			props.profile.username,
			controller.signal
		)
			.then((profile) => setProfile(profile))
			.catch((error) => {
				errorHandling(error, props.dispatch);
			});
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const redirectToProfile = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		history.push({
			pathname: constants.VISIT_PROFILE,
			state: profile,
		});
	};

	return (
		<Card style={styleCard}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					flexGrow: 1,
				}}
			>
				<Avatar
					src={
						"http://localhost:3001/images/" + props.profile.username + "img0"
					}
				></Avatar>
				<Typography variant="body1">{props.profile.username}</Typography>
				<Button startIcon={<AccountCircleIcon />} onClick={redirectToProfile}>
					<Typography variant="button">View Profile</Typography>
				</Button>
			</div>
		</Card>
	);
}

export const InListProfileCard = withReduxProps(InListProfileCardComponent);
