/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   notificationController.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/18 11:36:03 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/06 12:14:56 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import { io } from '../app';
import {
	addNotification,
	deleteNotification,
	getNotification,
	readNotification,
} from '../model/notificationRepositories';
import {
	getCompleteProfileByUsername,
	getProfileByUserId,
} from '../model/profileRepositories';
import { jwtVerify } from '../services/validation/jwt';

export async function addNotificationController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profileNotified = await getCompleteProfileByUsername(
			req.body.usernameNotified
		);
		const notifierProfile = await getProfileByUserId(jwt.decoded.id);
		await addNotification(
			profileNotified.userId,
			jwt.decoded.id,
			req.body.notification
		);
		io.emit('notification' + req.body.usernameNotified, {
			notification: req.body.notification,
			notifierProfile: notifierProfile.username,
			date: Date.now(),
		});
		res.status(200).send('Notification add');
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function deleteNotificationController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		await deleteNotification(req.body.id, jwt.decoded.id);
		res.status(200).send('Notification delete');
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function readNotificationController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		await readNotification(req.body.id);
		res.status(200).send('Notification read');
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getNotificationController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const notificationListId = await getNotification(jwt.decoded.id);
		let resultList = [];
		if (notificationListId && notificationListId.length) {
			resultList = notificationListId.map((item) => {
				return {
					notifierProfile: {
						dob: item.dob,
						popularityScore: item.popularityScore,
						username: item.username,
						firstname: item.firstname,
						lastname: item.lastname,
						gender: item.gender,
						sexualOrientation: item.sexualOrientation,
						geoLocationAuthorization: item.geoLocationAuthorization
							? true
							: false,
						bio: item.bio,
					},
					notification: {
						date: item.date,
						notification: item.notification,
						isRead: item.isRead ? true : false,
						id: item.id,
					},
				};
			});
		}
		res.status(200).send(resultList);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
