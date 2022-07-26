/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModifyEmailDialog.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/31 16:35:55 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import * as constants from '../../services/constants';
import { modifyEmailAPI } from '../../services/apiCalls';
import { actionUi_showSnackbar } from '../../store/ui/action';

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ModifyEmailDialogComponent(props: Props) {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState(props.user.email);
	const [emailError, setEmailError] = useState(false);
	let [password, setPassword] = useState<string | null>('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setPassword('');
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleClose();
	}

	function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.currentTarget.value);
		setEmailError(!isEmailValid(e.currentTarget.value));
	}

	function isEmailValid(email: string | null) {
		return typeof email === 'string' && email.match(constants.REGEX_EMAIL);
	}

	function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	const handleChangeEmail = () => {
		let details = {
			newEmail: email,
			password: password,
		};

		modifyEmailAPI(details, props.loggedIn).catch((error) => {
			props.dispatch(
				actionUi_showSnackbar({
					message: error.message,
					type: 'error',
				})
			);
			console.log(error.message);
		});
	};

	return (
		<div>
			<Button
				style={{ width: 200, height: 50 }}
				fullWidth
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				Modify Email
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">
						Modify Email
					</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							label="Email Address"
							type="email"
							variant="filled"
							fullWidth
							value={email}
							onChange={handleEmail}
							error={emailError}
							helperText={
								emailError && constants.EMAIL_HELPER_ERROR
							}
						/>
						<TextField
							margin="dense"
							label="Password"
							type="password"
							variant="filled"
							fullWidth
							value={password}
							onChange={handlePassword}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={handleChangeEmail}
							type="submit"
							color="primary"
							disabled={
								!isEmailValid(email) ||
								props.user.email === email ||
								password === ''
							}
						>
							Modify Email
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const ModifyEmailDialog = withReduxProps(ModifyEmailDialogComponent);
