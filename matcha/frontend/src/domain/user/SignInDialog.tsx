/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   SignInDialog.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:07 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/25 15:42:42 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
	getBlackListAPI,
	getProfileAPI,
	signinAPI,
} from "../../services/apiCalls";
import * as constants from "../../services/constants";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";
import { connect, ConnectedProps } from "react-redux";
import {
	actionUser_setBlackList,
	actionUser_setImages,
	actionUser_setProfile,
	actionUser_setTagList,
	actionUser_signin,
	actionUser_usagelocation,
} from "../../store/user/action";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { errorHandling } from "../../services/profileUtils";
import { makeStyles } from "@material-ui/core";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	button: {
		color: theme.palette.primary.contrastText,
	},
}));

function SignInDialogComponent(props: Props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	let [email, setEmail] = useState<string>("");
	let [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState<string>("");
	const controller = new AbortController();
	let [passwordError, setPasswordError] = useState(false);

	useEffect(() => {
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClickOpen = () => {
		setEmailError(false);
		setPasswordError(false);
		setPassword("");
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setPassword("");
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.currentTarget.value);
		isEmailValid(e.currentTarget.value) && setEmailError(false);
	}

	function handleBlurEmail(e: React.FocusEvent<HTMLInputElement>) {
		email !== "" && setEmailError(!isEmailValid(email));
	}

	function isEmailValid(email: string | null) {
		return typeof email === "string" &&
			email.length < 50 &&
			email.match(constants.REGEX_EMAIL)
			? true
			: false;
	}

	function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	const handleSignIn = () => {
		let details = {
			email: email,
			password: password,
		};

		signinAPI(details)
			.then(async ({ user, token }) => {
				if (user.activated) {
					getBlackListAPI(token, controller.signal)
						.then((json) => {
							props.dispatch(actionUser_setBlackList({ blackList: json }));
						})
						.catch((error) => {
							errorHandling(error, props.dispatch);
						});
					getProfileAPI(token)
						.then((response: any) => {
							if (response) {
								props.dispatch(
									actionUser_setProfile({ profile: response.profile })
								);
								response.tag &&
									props.dispatch(
										actionUser_setTagList({ tagList: response.tag })
									);
								response.imgs &&
									props.dispatch(actionUser_setImages({ imgs: response.imgs }));
								props.dispatch(
									actionUser_usagelocation({
										usagelocation: response.location,
									})
								);
								props.dispatch(actionUser_signin({ user, token }));
							}
						})
						.catch(() => {});
				} else {
					props.dispatch(
						actionUi_showSnackbar({
							message: "Please check your emails to activate your account",
							type: "error",
						})
					);
					handleClose();
				}
			})
			.catch((error) => {
				props.dispatch(
					actionUi_showSnackbar({
						message: "Bad credentials",
						type: "error",
					})
				);
			});
	};

	return (
		<div>
			<Button
				classes={{
					root: classes.button,
				}}
				variant="outlined"
				onClick={handleClickOpen}
			>
				Sign in
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Sign in</DialogTitle>
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
						<TextField
							margin="dense"
							label="Password"
							type="password"
							variant="filled"
							fullWidth
							value={password}
							error={passwordError}
							helperText={passwordError && constants.PASSWORD_HELPER_ERROR}
							onChange={handlePassword}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<ForgotPasswordDialog />
						<Button
							disabled={!isEmailValid(email) || password === ""}
							onClick={handleSignIn}
							type="submit"
							color="primary"
						>
							Sign in
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const SignInDialog = withReduxProps(SignInDialogComponent);
