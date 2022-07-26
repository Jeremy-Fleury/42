/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Header.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:11 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/28 15:43:42 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";

import {
	AppBar,
	Button,
	makeStyles,
	Toolbar,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";

import * as constants from "../../services/constants";
import { AccountMenu } from "../user/AccountMenu";
import { SignInDialog } from "../user/SignInDialog";
import { SignUpDialog } from "../user/SignUpDialog";
import { NotificationsMenu } from "./NotificationsMenu";
import { socket } from "./App";
import { getNotificationsAPI } from "../../services/apiCalls";
import { Inotification } from "../../types/types";
import { errorHandling } from "../../services/profileUtils";

const useStyles = makeStyles((theme) => ({
	appBar: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		flex: 1,
		margin: 0,
	},
	menuOptions: {
		display: "flex",
	},
	logo: {
		display: "flex",
		justifySelf: "flex-start",
	},
	accountMenu: {
		display: "flex",
		justifySelf: "end",
	},
	button: {
		color: theme.palette.primary.contrastText,
	},
}));

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	username: state.user.profile && state.user.profile.username,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const HeaderComponent = (props: Props) => {
	const classes = useStyles();
	const [notifications, setNotifications] = useState<Inotification[]>([]);
	const [username, setUsername] = useState("");
	const controller = new AbortController();

	const ref = useRef(notifications);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

	function updateNotifications(notifications: Inotification[]) {
		ref.current = notifications;
		setNotifications(notifications);
	}

	useEffect(() => {
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let isMounted = true;
		if (props.loggedIn) {
			if (props.username) {
				isMounted && setUsername(props.username);
				socket.on("notification" + props.username, pushNotification);
			}
			getNotificationsAPI(props.loggedIn, controller.signal)
				.then((json) => {
					json && json.length && updateNotifications(json);
				})
				.catch((error) => errorHandling(error, props.dispatch));
		} else {
			socket.off("notification" + username);
			updateNotifications([]);
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.loggedIn, props.username]);

	function pushNotification(notification: Inotification) {
		const tmp = [...ref.current];
		tmp.unshift(notification);
		updateNotifications(tmp);
	}

	return (
		<React.Fragment>
			<AppBar className={classes.appBar}>
				<Toolbar className={classes.appBar}>
					{!isMobile && (
						<div className={classes.logo}>
							<Link
								to={
									props.loggedIn
										? constants.SEARCH_ROUTE
										: constants.LANDING_ROUTE
								}
							>
								<img
									src={require("../../images/logo_white.png")}
									style={{ maxWidth: 100 }}
									alt="logo"
								/>
							</Link>
						</div>
					)}
					{props.loggedIn && (
						<React.Fragment>
							<div className={classes.menuOptions}>
								<Link
									to={"/chat"}
									style={{ color: "inherit", textDecoration: "inherit" }}
								>
									<Button
										classes={{
											root: classes.button,
										}}
										startIcon={<ChatIcon />}
									>
										CHAT
									</Button>
								</Link>
								<Link
									to={"/search"}
									style={{ color: "inherit", textDecoration: "inherit" }}
								>
									<Button
										classes={{
											root: classes.button,
										}}
										startIcon={<FavoriteIcon />}
									>
										EXPLORE
									</Button>
								</Link>
							</div>
							<div className={classes.accountMenu}>
								<NotificationsMenu
									notifications={ref.current}
									setNotifications={updateNotifications}
								/>
								<Link
									to={"/my-profile"}
									style={{ color: "inherit", textDecoration: "inherit" }}
								>
									<IconButton
										classes={{
											root: classes.button,
										}}
									>
										<PersonIcon />
									</IconButton>
								</Link>
								<AccountMenu />
							</div>
						</React.Fragment>
					)}
					{!isMobile && !props.loggedIn && (
						<div className={classes.accountMenu}>
							<SignInDialog />
							<SignUpDialog />
						</div>
					)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export const Header = withReduxProps(HeaderComponent);
