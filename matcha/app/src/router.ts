/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   router.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:07:33 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/25 14:05:46 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Application, Request, Response } from 'express';

import {
	addProfileInBlackListController,
	deleteProfileInBlackListController,
	getProfileBlackListController,
	reportController,
} from './controller/blackListController';
import { handleImageController } from './controller/imageController';
import {
	addlikedProfileController,
	deletelikedProfileController,
	getProfileLikeController,
	getProfileMatchController,
	getStatueOfLikeController,
} from './controller/likeController';
import {
	getGeoLocationController,
	getUsageLocationController,
	handleGeoLocationController,
	handleUsageLocationController,
} from './controller/locationController';
import { getMessageController } from './controller/messageController';
import {
	addNotificationController,
	deleteNotificationController,
	getNotificationController,
	readNotificationController,
} from './controller/notificationController';
import {
	addProfileController,
	getProfileByUsernameController,
	getProfileController,
	updateProfileController,
} from './controller/profileController';
import {
	allProfileController,
	recommendationController,
} from './controller/recommendationController';
import {
	addTagProfileController,
	deleteTagProfileController,
	getTagAutocompleteController,
} from './controller/tagController';
import {
	activateNewEmailController,
	activateUserController,
	addUserController,
	changeEmailController,
	changePasswordController,
	deleteUserController,
	loginUserController,
	resetPasswordController,
} from './controller/userController';
import {
	addViewController,
	getViewController,
} from './controller/viewController';

function userRouter(app: Application) {
	app.post('/user/activateUser', (req: Request, res: Response) =>
		activateUserController(req, res)
	);
	app.get('/user/activateNewEmail', (req: Request, res: Response) =>
		activateNewEmailController(req, res)
	);
	app.post('/user/addUser', (req: Request, res: Response) =>
		addUserController(req, res)
	);
	app.post('/user/changePassword', (req: Request, res: Response) =>
		changePasswordController(req, res)
	);
	app.post('/user/resetPassword', (req: Request, res: Response) =>
		resetPasswordController(req, res)
	);
	app.post('/user/loginUser', (req: Request, res: Response) =>
		loginUserController(req, res)
	);
	app.post('/user/deleteUser', (req: Request, res: Response) =>
		deleteUserController(req, res)
	);
	app.post('/user/changeEmail', (req: Request, res: Response) =>
		changeEmailController(req, res)
	);
}

function profileRouter(app: Application) {
	app.get('/profile/getProfile', (req: Request, res: Response) =>
		getProfileController(req, res)
	);
	app.get('/profile/getProfileByUsername', (req: Request, res: Response) =>
		getProfileByUsernameController(req, res)
	);
	app.post('/profile/addProfile', (req: Request, res: Response) =>
		addProfileController(req, res)
	);
	app.post('/profile/updateProfile', (req: Request, res: Response) =>
		updateProfileController(req, res)
	);
}

function likeRouter(app: Application) {
	app.get('/like/getProfileLike', (req: Request, res: Response) =>
		getProfileLikeController(req, res)
	);
	app.get('/like/getProfileMatch', (req: Request, res: Response) =>
		getProfileMatchController(req, res)
	);
	app.post('/like/addLikedProfile', (req: Request, res: Response) =>
		addlikedProfileController(req, res)
	);
	app.post('/like/deleteLikedProfile', (req: Request, res: Response) =>
		deletelikedProfileController(req, res)
	);
	app.post('/like/getStatueOfLike', (req: Request, res: Response) =>
		getStatueOfLikeController(req, res)
	);
}

function notificationRouter(app: Application) {
	app.get('/notification/getNotification', (req: Request, res: Response) =>
		getNotificationController(req, res)
	);
	app.post('/notification/addNotification', (req: Request, res: Response) =>
		addNotificationController(req, res)
	);
	app.post('/notification/deleteNotification', (req: Request, res: Response) =>
		deleteNotificationController(req, res)
	);
	app.post('/notification/readNotification', (req: Request, res: Response) =>
		readNotificationController(req, res)
	);
}

function tagRouter(app: Application) {
	app.post('/tag/getTagAutocomplete', (req: Request, res: Response) =>
		getTagAutocompleteController(req, res)
	);
	app.post('/tag/addTagProfile', (req: Request, res: Response) =>
		addTagProfileController(req, res)
	);
	app.post('/tag/deleteTagProfile', (req: Request, res: Response) =>
		deleteTagProfileController(req, res)
	);
}

function viewRouter(app: Application) {
	app.get('/view/getView', (req: Request, res: Response) =>
		getViewController(req, res)
	);
	app.post('/view/addView', (req: Request, res: Response) =>
		addViewController(req, res)
	);
}

function imagesController(app: Application) {
	app.post('/images/handleImages', (req: Request, res: Response) =>
		handleImageController(req, res)
	);
	app.get('/images/*', (req: Request, res: Response) =>
		res.status(200).send(null)
	);
}

function recommendationRouter(app: Application) {
	app.get('/recommendation/getRecommendation', (req: Request, res: Response) =>
		recommendationController(req, res)
	);
	app.get('/recommendation/getAllProfile', (req: Request, res: Response) =>
		allProfileController(req, res)
	);
}

function loactionRouter(app: Application) {
	app.get('/location/getGeoLocation', (req: Request, res: Response) =>
		getGeoLocationController(req, res)
	);
	app.post('/location/handleGeoLocation', (req: Request, res: Response) =>
		handleGeoLocationController(req, res)
	);
	app.get('/location/getUsageLocation', (req: Request, res: Response) =>
		getUsageLocationController(req, res)
	);
	app.post('/location/handleUsageLocation', (req: Request, res: Response) =>
		handleUsageLocationController(req, res)
	);
}

function messageRouter(app: Application) {
	app.post('/message/getMessage', (req: Request, res: Response) =>
		getMessageController(req, res)
	);
}

function blackListRouter(app: Application) {
	app.get('/blacklist/getProfileBlacklist', (req: Request, res: Response) =>
		getProfileBlackListController(req, res)
	);
	app.post('/blacklist/addProfileBlacklist', (req: Request, res: Response) =>
		addProfileInBlackListController(req, res)
	);
	app.post('/blacklist/deleteProfileBlacklist', (req: Request, res: Response) =>
		deleteProfileInBlackListController(req, res)
	);
	app.post('/blacklist/profileReport', (req: Request, res: Response) =>
		reportController(req, res)
	);
}

export function router(app: Application) {
	userRouter(app);
	profileRouter(app);
	likeRouter(app);
	notificationRouter(app);
	tagRouter(app);
	viewRouter(app);
	imagesController(app);
	recommendationRouter(app);
	loactionRouter(app);
	messageRouter(app);
	blackListRouter(app);

	app.use((req: Request, res: Response) => {
		res.setHeader('Content-Type', 'text/plain');
		res.status(404).send('Page not found');
	});
}
