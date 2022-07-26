/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseProfileForm.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/15 18:39:58 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { handleGeoLocationAPI } from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_geolocation } from "../../store/user/action";
import { useGeolocation } from "../../services/useGeolocation";
import { BaseProfileFormContent } from "./BaseProfileFormContent";
import { Iprofile } from "../../types/types";
import { createProfile, errorHandling } from "../../services/profileUtils";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	currentGeolocation: state.user.currentGeolocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const profileInit = {
	firstname: "",
	lastname: "",
	username: "",
	dob: null,
	sexualOrientation: "",
	gender: "",
	geoLocationAuthorization: false,
	bio: "",
};

function BaseProfileFormComponent(props: Props) {
	const [profile, setProfile] = useState<Iprofile>(profileInit);
	const [disabled, setDisabled] = useState(false);
	const controller = new AbortController();

	const geolocation = useGeolocation();

	useEffect(() => {
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (geolocation) {
			props.dispatch(
				actionUser_geolocation({
					geolocation: geolocation,
				})
			);
			handleGeoLocationAPI(geolocation, props.loggedIn).catch((error) =>
				errorHandling(error, props.dispatch)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geolocation]);

	const handleSubmit = async () => {
		await Promise.all([createProfile(profile, props.loggedIn, props.dispatch)]);
	};

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<BaseProfileFormContent
					setProfile={setProfile}
					profile={profile}
					setDisabled={setDisabled}
					dynamicUsername
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					fullWidth
					disabled={disabled}
				>
					Submit
				</Button>
			</Grid>
		</React.Fragment>
	);
}

export const BaseProfileForm = withReduxProps(BaseProfileFormComponent);
