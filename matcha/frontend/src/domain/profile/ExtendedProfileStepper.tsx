/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ExtendedProfileStepper.tsx                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/28 10:47:22 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";

import { ProfileOptional1 } from "./ProfileOptional1";
import { ProfileOptional2 } from "./ProfileOptional2";
import { ProfileOptional3 } from "./ProfileOptional3";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_geolocation } from "../../store/user/action";
import {
	submitPictures,
	updateProfile,
	submitTags,
	submitUsageLocation,
	isProfileComplete,
	errorHandling,
} from "../../services/profileUtils";
import { useGeolocation } from "../../services/useGeolocation";
import { handleGeoLocationAPI } from "../../services/apiCalls";
import { Iprofile } from "../../types/types";
import { CustomLoader } from "../../component/CustomLoader";
import { useHistory } from "react-router-dom";
import * as constants from "../../services/constants";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
	currentGeolocation: state.user.currentGeolocation,
	profile: state.user.profile,
	imgs: state.user.imgs,
	tagList: state.user.tagList,
	usagelocation: state.user.usagelocation,
	isProfileComplete: isProfileComplete(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList,
		state.user.imgs
	),
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ExtendedProfileStepperComponent(props: Props) {
	const [activeStep, setActiveStep] = useState(0);
	const [usageLocation, setUsageLocation] = useState({
		...props.usagelocation,
	});
	const [profile, setProfile] = useState<Iprofile>({
		...props.profile,
	});
	const [tagList, setTagList] = useState<string[]>([...props.tagList]);
	const steps = getSteps();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const history = useHistory();
	const [imgs, setImgs] = useState<(string | null)[]>([...props.imgs]);

	const geolocation = useGeolocation();

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

	function getSteps() {
		return [0, 1, 2];
	}

	const handleSubmit = async () => {
		setLoading(true);
		await Promise.all([
			updateProfile(
				profile,
				props.loggedIn,
				props.dispatch,
				props.isProfileComplete
			),
			submitTags(tagList, props.loggedIn, props.dispatch),
			submitPictures(imgs, props.loggedIn, props.dispatch),
			submitUsageLocation(usageLocation, props.loggedIn, props.dispatch),
		]);
		history.push({
			pathname: constants.LANDING_ROUTE,
			state: profile,
		});
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setDisabled(true);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		setDisabled(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
	};

	function getStepContent() {
		switch (activeStep) {
			case 0:
				return (
					<ProfileOptional1
						setProfile={setProfile}
						setDisabled={setDisabled}
						profile={profile}
					/>
				);
			case 1:
				return (
					<ProfileOptional2
						handleChange={handleChange}
						setDisabled={setDisabled}
						imgs={imgs}
						setImgs={setImgs}
						profile={profile}
						tagList={tagList}
						setTagList={setTagList}
					/>
				);
			case 2:
				return (
					<ProfileOptional3
						handleChange={handleChange}
						setDisabled={setDisabled}
						profile={profile}
						setProfile={setProfile}
						usageLocation={usageLocation}
						setUsageLocation={setUsageLocation}
					/>
				);
			default:
				return <Typography color="primary">All steps completed</Typography>;
		}
	}

	return (
		<React.Fragment>
			{loading ? (
				<CustomLoader />
			) : (
				<React.Fragment>
					<Grid item xs={12}>
						<Stepper activeStep={activeStep}>
							{steps.map((label, key) => (
								<Step key={key}>
									<StepLabel></StepLabel>
								</Step>
							))}
						</Stepper>
					</Grid>
					<Grid
						item
						container
						xs={12}
						justify="center"
						alignItems="center"
						alignContent="center"
					>
						{getStepContent()}
					</Grid>
					<Grid item xs={12} md={6}>
						<Button disabled={activeStep === 0} onClick={handleBack} fullWidth>
							Back
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							variant="contained"
							color="primary"
							onClick={
								activeStep === steps.length - 1 ? handleSubmit : handleNext
							}
							fullWidth
							disabled={disabled}
						>
							{activeStep === steps.length - 1 ? "Finish" : "Continue"}
						</Button>
					</Grid>
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

export const ExtendedProfileStepper = withReduxProps(
	ExtendedProfileStepperComponent
);
