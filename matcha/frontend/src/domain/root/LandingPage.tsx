/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   LandingPage.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:19 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/15 16:28:35 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { SignInDialog } from "../user/SignInDialog";
import { SignUpDialog } from "../user/SignUpDialog";
import { Redirect, useLocation } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import * as constants from "../../services/constants";
import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { activateAccountAPI } from "../../services/apiCalls";
import { actionUser_activate } from "../../store/user/action";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { errorHandling } from "../../services/profileUtils";

const styleLanding: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	display: "flex",
	flexDirection: "column",
	width: "100vw",
	height: "100vh",
	background:
		"radial-gradient(circle, transparent, rgba(0,0,0,0.6)50%, rgba(0,0,0,1) 100%)",
	zIndex: 1,
};

const styleImg: React.CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100vw",
	maxHeight: "100vh",
	minHeight: "100vh",
	zIndex: 0,
	objectFit: "cover",
	userSelect: "none",
	WebkitUserSelect: "none",
	MozUserSelect: "none",
	KhtmlUserSelect: "none",
	msUserSelect: "none",
};

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	signupToken: state.user.signupToken,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const LandingPageComponent = (props: Props) => {
	const bg = require("../../images/background2.jpg");
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
	const [redirect, setRedirect] = useState<string | null>(null);
	let location = useLocation();

	useEffect(() => {
		if (props.loggedIn) {
			setRedirect(constants.SEARCH_ROUTE);
		}
	}, [props.loggedIn]);

	useEffect(() => {
		const parameters = new URLSearchParams(location.search);
		if (parameters.get("id")) {
			let id: number | string | null = parameters.get("id");
			id = id ? parseInt(id) : null;
			let details = {
				activationKey: parameters.get("activationKey"),
				id: id,
			};

			activateAccountAPI(details)
				.then(() => {
					props.dispatch(actionUser_activate({ token: props.signupToken }));
					props.dispatch(
						actionUi_showSnackbar({
							message: "Your account has been activated",
							type: "success",
						})
					);
				})
				.catch((error) => errorHandling(error, props.dispatch));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	if (redirect !== null) {
		return <Redirect to={redirect} />;
	} else {
		return (
			<React.Fragment>
				<img src={bg} style={styleImg} alt=""></img>
				<Grid
					item
					container
					justify="center"
					alignItems="center"
					style={styleLanding}
				>
					{isMobile && (
						<React.Fragment>
							<SignInDialog />
							<SignUpDialog />
						</React.Fragment>
					)}
				</Grid>
			</React.Fragment>
		);
	}
};

export const LandingPage = withReduxProps(LandingPageComponent);
