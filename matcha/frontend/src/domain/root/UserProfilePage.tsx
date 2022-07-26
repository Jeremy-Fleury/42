/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UserProfilePage.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/28 17:10:44 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import {
	Button,
	CircularProgress,
	Grid,
	makeStyles,
	Paper,
	Typography,
} from "@material-ui/core";
import { ProfileCardsScroll } from "../../component/ProfileCardsScroll";
import {
	getProfileAPI,
	getProfileLikesAPI,
	getProfileVisitsAPI,
	handleGeoLocationAPI,
} from "../../services/apiCalls";
import { connect, ConnectedProps } from "react-redux";
import { actionUser_geolocation } from "../../store/user/action";
import { BaseProfileFormContent } from "../profile/BaseProfileFormContent";
import { ProfileOptional1 } from "../profile/ProfileOptional1";
import { ProfileOptional2 } from "../profile/ProfileOptional2";
import { ProfileOptional3 } from "../profile/ProfileOptional3";
import { Iprofile, Iaddress } from "../../types/types";
import {
	errorHandling,
	hasOwnProperty,
	isProfileComplete,
	submitPictures,
	submitTags,
	submitUsageLocation,
	updateProfile,
} from "../../services/profileUtils";
import { useGeolocation } from "../../services/useGeolocation";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	profile: state.user.profile as Iprofile,
	tagList: state.user.tagList,
	usageLocation: state.user.usagelocation,
	imgs: state.user.imgs,
	isProfileComplete: isProfileComplete(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList,
		state.user.imgs
	),
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	paperScroll: {
		height: "100%",
		overflow: "hidden",
		paddingTop: "16px",
		paddingBottom: "16px",
		backgroundColor: theme.palette.secondary.main,
	},
	paperProfile: {
		padding: "16px",
	},
	main: {
		height: "95%",
		justifyContent: "center",
	},
}));

const UserProfilePageComponent = (props: Props) => {
	const classes = useStyles();
	const [profile, setProfile] = useState<Iprofile>({ ...props.profile });
	const [tagList, setTagList] = useState<string[]>([...props.tagList]);
	const [usageLocation, setUsageLocation] = useState<Iaddress>({
		...props.usageLocation,
	});
	const [profileVisits, setProfileVisits] = useState<Iprofile[]>();
	const [profileLikes, setProfileLikes] = useState<Iprofile[]>();
	const [imgs, setImgs] = useState<(string | null)[]>([...props.imgs]);
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const controller = new AbortController();

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

	useEffect(() => {
		let isMounted = true;
		isMounted && setImgs(props.imgs);
		return () => {
			isMounted = false;
		};
	}, [props.imgs]);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			setTagList([...props.tagList]);
			setUsageLocation({ ...props.usageLocation });
		}
		return () => {
			isMounted = false;
		};
	}, [props.usageLocation, props.tagList]);

	useEffect(() => {
		let isMounted = true;
		let timeout = setTimeout(() => {
			isMounted && setDisabled(false);
		}, 2000);
		getProfileAPI(props.loggedIn, controller.signal)
			.then((response: any) => {
				if (response && isMounted) {
					setProfile({ ...profile, online: profile.online });
				}
			})
			.catch((error) => errorHandling(error, props.dispatch));
		getProfileVisitsAPI(props.loggedIn, controller.signal)
			.then((json: Iprofile[] | void) => {
				if (json && isMounted) {
					setProfileVisits(json);
				}
			})
			.catch((error) => errorHandling(error, props.dispatch));
		getProfileLikesAPI(props.loggedIn, controller.signal)
			.then((json: Iprofile[] | void) => {
				if (json && isMounted) {
					setProfileLikes(json);
				}
			})
			.catch((error) => errorHandling(error, props.dispatch));
		return () => {
			isMounted = false;
			clearTimeout(timeout);
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
	};

	const handleSubmit = () => {
		setLoading(true);
		setDisabled(true);
		updateProfile(
			profile,
			props.loggedIn,
			props.dispatch,
			props.isProfileComplete
		);
		submitTags(tagList, props.loggedIn, props.dispatch);
		submitPictures(imgs, props.loggedIn, props.dispatch);
		usageLocation &&
			hasOwnProperty(usageLocation, "city") &&
			submitUsageLocation(usageLocation, props.loggedIn, props.dispatch);
	};

	return (
		<Grid item container direction="row" className={classes.main}>
			<Grid
				container
				item
				xs={12}
				sm={8}
				md={6}
				style={{ margin: "10px" }}
				alignContent="center"
				justify="center"
			>
				<Paper className={classes.paperProfile}>
					<Grid container justify="center">
						<Grid item xs={12} md={10} lg={8}>
							<ProfileOptional2
								handleChange={handleChangeProfile}
								imgs={imgs}
								setImgs={setImgs}
								profile={profile}
								tagList={tagList}
								setTagList={setTagList}
							/>
						</Grid>
						<Grid item xs={12} md={10} lg={8}>
							<Typography>
								{"Popularity score: " + props.profile.popularityScore}
							</Typography>
							<BaseProfileFormContent
								profile={profile}
								setProfile={setProfile}
								dynamicUsername={false}
							/>
						</Grid>
						<Grid item xs={12} md={10} lg={8}>
							<ProfileOptional1 setProfile={setProfile} profile={profile} />
						</Grid>
						<Grid item xs={12} md={10} lg={8}>
							<ProfileOptional3
								usageLocation={usageLocation}
								setUsageLocation={setUsageLocation}
								handleChange={handleChangeProfile}
								profile={profile}
								setProfile={setProfile}
							/>
						</Grid>
						<Grid item xs={12} lg={8}>
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								fullWidth
								disabled={disabled}
								startIcon={loading ? <CircularProgress /> : null}
							>
								Update Profile
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<Grid
				container
				item
				xs={12}
				sm={8}
				md={5}
				style={{
					height: "100%",
					justifyContent: "center",
					margin: "10px",
				}}
				spacing={3}
			>
				<Grid item xs={12} lg={8} style={{ height: "50%" }}>
					<Paper className={classes.paperScroll}>
						<Typography align="center" variant="h6">
							Likes you have received
						</Typography>
						{profileLikes?.length ?? false ? (
							<ProfileCardsScroll list={profileLikes} />
						) : (
							<Typography align="center">
								No one has liked your profile yet
							</Typography>
						)}
					</Paper>
				</Grid>
				<Grid item xs={12} lg={8} style={{ height: "50%" }}>
					<Paper className={classes.paperScroll}>
						<Typography align="center" variant="h6">
							Visits you have received
						</Typography>
						{profileVisits?.length ?? false ? (
							<ProfileCardsScroll list={profileVisits} />
						) : (
							<Typography align="center">
								No one has visited your profile yet
							</Typography>
						)}
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
};

export const UserProfilePage = withReduxProps(UserProfilePageComponent);
