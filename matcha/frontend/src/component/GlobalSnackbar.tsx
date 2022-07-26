/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   GlobalSnackbar.tsx                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/09 15:52:58 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/09 16:24:42 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { actionUi_clearSnackbar } from "../store/ui/action";

const withReduxProps = connect((state: any) => ({
	snackbarOpen: state.ui.snackbarOpen,
	snackbarMessage: state.ui.snackbarMessage,
	snackbarType: state.ui.snackbarType,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const GlobalSnackbarComponent = (props: Props) => {
	const handleSnackbarClose = (
		event?: React.SyntheticEvent,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		props.dispatch(actionUi_clearSnackbar());
	};

	return (
		<Snackbar
			open={props.snackbarOpen}
			autoHideDuration={5000}
			onClose={handleSnackbarClose}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
			<Alert onClose={handleSnackbarClose} severity={props.snackbarType}>
				{props.snackbarMessage}
			</Alert>
		</Snackbar>
	);
};

export const GlobalSnackbar = withReduxProps(GlobalSnackbarComponent);
