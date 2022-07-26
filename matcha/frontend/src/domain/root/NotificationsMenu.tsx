/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   NotificationsMenu.tsx                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/02 18:22:04 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/31 16:57:38 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	Badge,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IlistProfiles, Inotification } from '../../types/types';
import { CustomAvatar } from '../../component/CustomAvatar';
import * as constants from '../../services/constants';
import {
	getProfileByUsernameAPI,
	readNotificationAPI,
	deleteNotificationAPI,
} from '../../services/apiCalls';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CloseIcon from '@material-ui/icons/Close';
import { getTimeElapsed } from '../../services/timeUtils';
import { errorHandling } from '../../services/profileUtils';

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
	searchList: state.profilesList.search as IlistProfiles[],
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	notifications: Inotification[];
	setNotifications: (notifications: Inotification[]) => void;
} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	item: {
		whiteSpace: 'normal',
		width: '500px',
		[theme.breakpoints.down('lg')]: {
			width: '30vw',
		},
		[theme.breakpoints.down('md')]: {
			width: '50vw',
		},
		[theme.breakpoints.down('sm')]: {
			width: '60vw',
		},
		[theme.breakpoints.down('xs')]: {
			width: '90vw',
		},
	},
	textGray: {
		color: 'grey',
	},
	textPop: {
		color: theme.palette.primary.main,
	},
	button: {
		color: theme.palette.primary.contrastText,
	},
	list: {},
}));

const NotificationsMenuComponent = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const classes = useStyles();
	const history = useHistory();
	const [isReadLoading, setIsReadLoading] = useState(false);

	function handleClick(event: React.MouseEvent) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const getNotificationText = (type: string) => {
		switch (type) {
			case 'view':
				return ' has seen your profile';
			case 'like':
				return ' has liked your profile';
			case 'likeBack':
				return ' just matched with you';
			case 'unlike':
				return ' stopped to like your profile';
			case 'message':
				return ' sent you a message';
		}
	};

	useEffect(() => {
		let isMounted = true;
		let timeout = setTimeout(() => {
			if (isMounted) {
				setIsReadLoading(false);
			}
		}, 400);
		return () => {
			clearTimeout(timeout);
			isMounted = false;
		};
	}, [props.notifications]);

	const redirectToProfile = async (notifierUsername: string) => {
		let profile = await getProfileByUsernameAPI(
			props.loggedIn,
			notifierUsername
		);
		if (profile) {
			history.push({
				pathname: constants.VISIT_PROFILE,
				state: profile,
			});
		}
		handleClose();
	};

	const redirectToChat = () => {
		history.push({
			pathname: constants.CHAT_ROUTE,
		});
		handleClose();
	};

	const handleClickNotification = (
		notification: Inotification,
		index: number
	) => {
		if (!isReadLoading) {
			setIsReadLoading(true);
			notification.notification.notification.split(',')[0] === 'message'
				? redirectToChat()
				: redirectToProfile(notification.notifierProfile.username);
			handleReadNotification(notification, index);
		}
	};

	const handleReadNotification = (
		notification: Inotification,
		index: number
	) => {
		setIsReadLoading(true);
		const tmp = [...props.notifications];
		tmp[index] = notification;
		tmp[index].notification.isRead = true;
		props.setNotifications(tmp);
		readNotificationAPI(
			{ id: notification.notification.id },
			props.loggedIn
		).catch((error) => errorHandling(error, props.dispatch));
	};

	const handleDeleteNotification = async (notification: Inotification) => {
		props.setNotifications(
			props.notifications.filter(
				(entry) =>
					entry.notification.id !== notification.notification.id
			)
		);
		await deleteNotificationAPI(
			{ id: notification.notification.id },
			props.loggedIn
		).catch((error) => errorHandling(error, props.dispatch));
	};

	const getNotificationCard = () => {
		return props.notifications.map((notification, index) => {
			const type = notification.notification.notification.split(',')[0];
			const isRead = notification.notification.isRead;
			return (
				<MenuItem
					key={index}
					className={classes.item}
					onClick={() => {
						handleClickNotification(notification, index);
					}}
				>
					<Grid container alignItems="center" justify="center">
						<Grid item xs={3} md={2}>
							<CustomAvatar
								id={0}
								src={
									'http://localhost:3001/images/' +
									notification.notifierProfile.username +
									'img0'
								}
								modifiable={false}
							/>
						</Grid>
						<Grid item xs={isRead ? 8 : 7}>
							<Typography
								className={
									isRead ? classes.textGray : undefined
								}
							>
								{notification.notifierProfile.username}
								{getNotificationText(type)}
							</Typography>
							<Typography
								className={
									isRead ? classes.textGray : classes.textPop
								}
							>
								{' ' +
									getTimeElapsed(
										notification.notification.date
									)}
							</Typography>
						</Grid>
						{!isRead && (
							<Grid item xs={1}>
								<IconButton
									onClick={(
										event: React.MouseEvent<
											HTMLButtonElement,
											MouseEvent
										>
									) => {
										handleReadNotification(
											notification,
											index
										);
										event.stopPropagation();
									}}
									disabled={isReadLoading}
								>
									{isReadLoading ? (
										<CircularProgress />
									) : (
										<FiberManualRecordIcon />
									)}
								</IconButton>
							</Grid>
						)}
						<Grid item xs={1}>
							<IconButton
								onClick={(
									event: React.MouseEvent<
										HTMLButtonElement,
										MouseEvent
									>
								) => {
									handleDeleteNotification(notification);
									event.stopPropagation();
								}}
							>
								<CloseIcon />
							</IconButton>
						</Grid>
					</Grid>
				</MenuItem>
			);
		});
	};

	return (
		<div>
			<Badge
				badgeContent={
					props.notifications.filter(
						(notification) => !notification.notification.isRead
					).length
				}
				color="error"
				max={50}
				overlap="circle"
			>
				<IconButton
					classes={{
						root: classes.button,
					}}
					onClick={handleClick}
				>
					<NotificationsIcon
						aria-controls="simple-menu"
						aria-haspopup="true"
					/>
				</IconButton>
			</Badge>
			<Menu
				style={{ marginTop: 49 }}
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				className={classes.list}
			>
				<Typography
					style={{
						fontSize: 16,
						textAlign: 'center',
						minWidth: 200,
						margin: 5,
					}}
				>
					Notifications
				</Typography>

				{getNotificationCard()}
			</Menu>
		</div>
	);
};

export const NotificationsMenu = withReduxProps(NotificationsMenuComponent);
