/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AccountMenu.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:06 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/31 16:57:29 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	Divider,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { actionUser_logout } from '../../store/user/action';
import { useHistory } from 'react-router-dom';

import * as constants from '../../services/constants';

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

const AccountMenuComponent = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const history = useHistory();
	const classes = useStyles();

	function handleClick(event: React.MouseEvent) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	function handleLogout() {
		handleClose();
		props.dispatch(actionUser_logout());
		history.push(constants.LANDING_ROUTE);
	}

	return (
		<div>
			<IconButton
				classes={{
					root: classes.button,
				}}
				onClick={handleClick}
			>
				<KeyboardArrowDownIcon
					aria-controls="simple-menu"
					aria-haspopup="true"
				/>
			</IconButton>
			<Menu
				style={{ marginTop: 41 }}
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Link
					to={'/account-settings'}
					style={{ color: 'inherit', textDecoration: 'inherit' }}
				>
					<MenuItem
						onClick={handleClose}
						style={{ width: 200, justifyContent: 'center' }}
					>
						Account Settings
					</MenuItem>
				</Link>

				<MenuItem
					onClick={handleLogout}
					style={{ width: 200, justifyContent: 'center' }}
				>
					Logout
				</MenuItem>
			</Menu>
		</div>
	);
};

export const AccountMenu = withReduxProps(AccountMenuComponent);
