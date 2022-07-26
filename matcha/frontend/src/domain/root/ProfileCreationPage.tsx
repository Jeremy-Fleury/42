/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCreationPage.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:16:40 by senz              #+#    #+#             */
/*   Updated: 2020/11/06 13:05:48 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { Button, Grid } from "@material-ui/core";

import { BaseProfileForm } from "../profile/BaseProfileForm";
import { Redirect } from "react-router-dom";
import * as constants from "../../services/constants";
import { isProfileEmpty } from "../../services/profileUtils";
import { ExtendedProfileStepper } from "../profile/ExtendedProfileStepper";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	isProfileEmpty: isProfileEmpty(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList
	),
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	location?: any;
} & ReduxProps;

const ProfileCreationPageComponent = (props: Props) => {
	const [redirect, setRedirect] = useState<string | null>(null);
	const [next, setNext] = useState("");

	useEffect(() => {
		if (props.loggedIn === false) {
			setRedirect(constants.LANDING_ROUTE);
		}
	}, [props.loggedIn]);

	//case of redirection from main page to access extended profile
	useEffect(() => {
		if (
			props.location &&
			props.location.state &&
			props.location.state.extended
		) {
			setNext("extended");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleExtended = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setNext("extended");
	};

	const handleSkip = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setNext("skip");
	};

	function getComponent() {
		switch (next) {
			case "":
				return (
					<React.Fragment>
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleSkip}
							fullWidth
						>
							Skip
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleExtended}
							fullWidth
						>
							Complete Extended Profile
						</Button>
					</React.Fragment>
				);
			case "skip":
				setRedirect(constants.SEARCH_ROUTE);
				break;
			case "extended":
				return <ExtendedProfileStepper />;
		}
	}

	if (redirect !== null) {
		return <Redirect to={redirect} />;
	} else {
		return (
			<React.Fragment>
				<Grid
					item
					container
					xs={8}
					md={6}
					lg={3}
					justify="center"
					alignItems="center"
				>
					{props.isProfileEmpty ? <BaseProfileForm /> : getComponent()}
				</Grid>
			</React.Fragment>
		);
	}
};

export const ProfileCreationPage = withReduxProps(ProfileCreationPageComponent);
