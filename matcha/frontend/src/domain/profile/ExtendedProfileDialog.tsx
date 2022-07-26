/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ExtendedProfileDialog.tsx                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:07 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/13 13:02:34 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect, ConnectedProps } from "react-redux";
import { DialogContentText } from "@material-ui/core";
import * as constants from "../../services/constants";
import { Redirect } from "react-router-dom";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & ReduxProps;

function ExtendedProfileDialogComponent(props: Props) {
	const [redirect, setRedirect] = useState<string | null>(null);

	const handleClose = () => {
		props.setOpen(false);
	};

	function handleProfile() {
		setRedirect(constants.PROFILE_CREATION_ROUTE);
	}

	if (redirect !== null) {
		return (
			<Redirect
				to={{ pathname: redirect, state: { extended: "extended" } }}
			/>
		);
	} else {
		return (
			<React.Fragment>
				<Dialog
					open={props.open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Recommended Profiles
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							To access the recommended profiles list, you have to
							complete your personnal information
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleProfile}>
							Complete Profile
						</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
		);
	}
}

export const ExtendedProfileDialog = withReduxProps(
	ExtendedProfileDialogComponent
);
