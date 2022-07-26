/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DeleteAccountDialog.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/31 16:35:45 by jfleury          ###   ########.fr       */
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
import { deleteAPI } from '../../services/apiCalls';
import { actionUser_logout } from '../../store/user/action';
import { useHistory } from 'react-router-dom';
import { errorHandling } from '../../services/profileUtils';

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	user: state.user.user,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

function DeleteAccountDialogComponent(props: Props) {
	const [open, setOpen] = useState(false);
	let [password, setPassword] = useState<string | null>('');
	const history = useHistory();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleClose();
	}

	function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.currentTarget.value);
	}

	const handleDeleteAccount = () => {
		let details = {
			password: password,
		};

		deleteAPI(details, props.loggedIn)
			.then(() => {
				props.dispatch(actionUser_logout());
				history.push(constants.LANDING_ROUTE);
			})
			.catch((error) => errorHandling(error, props.dispatch));
	};

	return (
		<React.Fragment>
			<Button
				style={{ width: 200, height: 50 }}
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
				Delete Account
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">
						Delete Account
					</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
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
							onClick={handleDeleteAccount}
							type="submit"
							color="primary"
							disabled={password === ''}
						>
							DELETE MY ACCOUNT
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</React.Fragment>
	);
}

export const DeleteAccountDialog = withReduxProps(DeleteAccountDialogComponent);
