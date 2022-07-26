/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ForgotPasswordDialog.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:44 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/29 12:11:29 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { resetPasswordAPI } from "../../services/apiCalls";
import { actionUi_showSnackbar } from "../../store/ui/action";
import * as constants from "../../services/constants";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ForgotPasswordDialogComponent(props: Props) {
	const [open, setOpen] = React.useState(false);
	const [email, setEmail] = React.useState("");
	let [emailError, setEmailError] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.currentTarget.value);
		isEmailValid(e.currentTarget.value) && setEmailError(false);
	}

	function isEmailValid(email: string | null) {
		return typeof email === "string" && email.match(constants.REGEX_EMAIL)
			? true
			: false;
	}

	function handleBlurEmail(e: React.FocusEvent<HTMLInputElement>) {
		if (email !== "") {
			setEmailError(!isEmailValid(email));
		}
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		let details = {
			email: email,
		};

		resetPasswordAPI(details)
			.then(() => {
				props.dispatch(
					actionUi_showSnackbar({
						message: "We've just emailed you a temporary password",
						type: "success",
					})
				);
			})
			.catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: error.message,
						type: "error",
					})
				);
				console.log(error.message);
			});
		handleClose();
	}

	return (
		<div>
			<Button color="primary" onClick={handleClickOpen}>
				Forgot password
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Forgot password</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							label="Email Address"
							type="email"
							variant="filled"
							fullWidth
							value={email}
							onChange={handleEmail}
							error={emailError}
							helperText={emailError && constants.EMAIL_HELPER_ERROR}
							onBlur={handleBlurEmail}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							type="submit"
							color="primary"
							disabled={!isEmailValid(email)}
						>
							Reset password
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const ForgotPasswordDialog = withReduxProps(
	ForgotPasswordDialogComponent
);
