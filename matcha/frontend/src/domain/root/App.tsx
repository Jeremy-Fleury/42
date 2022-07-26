/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:08 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/25 12:24:00 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";

import { makeStyles } from "@material-ui/core";

import { GlobalSnackbar } from "../../component/GlobalSnackbar";
import { Header } from "./Header";
import { Router } from "./Router";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	main: {
		marginTop: 64,
		display: "flex",
		flexGrow: 1,
		height: "90vh",
		alignItems: "center",
		justifyContent: "center",
	},
}));

export const socket = socketIOClient("http://127.0.0.1:3001", {
	autoConnect: false,
});

const AppComponent = (props: Props) => {
	const classes = useStyles();

	useEffect(() => {
		if (props.loggedIn && props.profile) {
			socket.connect();
			socket.on("connect", () => {
				socket.emit("online", {
					id: props.profile.userId,
				});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.loggedIn, props.profile]);

	return (
		<BrowserRouter>
			{/* <CssBaseline /> */}
			<Header />
			<div className={classes.main}>
				<GlobalSnackbar />
				<Router />
			</div>
			{/* <Footer /> */}
		</BrowserRouter>
	);
};

export const App = withReduxProps(AppComponent);
