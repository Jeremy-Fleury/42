/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ModifyPasswordDialog.tsx                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/31 16:34:56 by jfleury          ###   ########.fr       */
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
import { modifyPasswordAPI } from '../../services/apiCalls';
import { actionUi_showSnackbar } from '../../store/ui/action';

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function ModifyPasswordDialogComponent(props: Props) {
	const [open, setOpen] = useState(false);
	let [currentPassword, setCurrentPassword] = useState<string | null>('');
	let [newPassword, setNewPassword] = useState<string | null>('');
	let [newPasswordError, setNewPasswordError] = useState(false);
	let [passwordConfirm, setPasswordConfirm] = useState<string | null>('');
	let [passwordConfirmError, setPasswordConfirmError] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setCurrentPassword('');
		setNewPassword('');
		setPasswordConfirm('');
		setNewPasswordError(false);
		setPasswordConfirmError(false);
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleClose();
	}

	function handleCurrentPassword(e: React.ChangeEvent<HTMLInputElement>) {
		setCurrentPassword(e.currentTarget.value);
	}

	function handleNewPassword(e: React.ChangeEvent<HTMLInputElement>) {
		setNewPassword(e.currentTarget.value);
		setNewPasswordError(!isPasswordValid(e.currentTarget.value));
	}

	function handlePasswordConfirm(e: React.ChangeEvent<HTMLInputElement>) {
		setPasswordConfirm(e.currentTarget.value);
		setPasswordConfirmError(!arePasswordsIdentical(e.currentTarget.value));
	}

	function isPasswordValid(password: string | null) {
		return typeof password === 'string' &&
			password.match(constants.REGEX_PASSWORD)
			? true
			: false;
	}

	function arePasswordsIdentical(passwordConfirm: string | null) {
		return newPassword === passwordConfirm;
	}

	const handleModifyPassword = () => {
		let details = {
			password: currentPassword,
			newPassword: newPassword,
		};

		modifyPasswordAPI(details, props.loggedIn).catch((error) => {
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
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				Modify Password
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">
						Modify Password
					</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							label="Current password"
							type="password"
							variant="filled"
							fullWidth
							value={currentPassword}
							onChange={handleCurrentPassword}
						/>
						<TextField
							margin="dense"
							label="New password"
							type="password"
							variant="filled"
							fullWidth
							value={newPassword}
							onChange={handleNewPassword}
							error={newPasswordError}
							helperText={
								newPasswordError &&
								constants.PASSWORD_HELPER_ERROR
							}
						/>
						<TextField
							margin="dense"
							label="Confirm new password"
							type="password"
							variant="filled"
							fullWidth
							value={passwordConfirm}
							onChange={handlePasswordConfirm}
							error={passwordConfirmError}
							helperText={
								passwordConfirmError &&
								constants.PASSWORD_CONFIRM_HELPER_ERROR
							}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={handleModifyPassword}
							type="submit"
							color="primary"
						>
							Confirm
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const ModifyPasswordDialog = withReduxProps(
	ModifyPasswordDialogComponent
);
