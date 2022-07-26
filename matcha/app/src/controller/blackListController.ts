/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blackListController.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/27 09:58:32 by jfleury           #+#    #+#             */
/*   Updated: 2021/01/28 18:05:29 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from "express";
import { reportMail } from "../services/mailer";

import {
	addProfileBlackList,
	deleteProfileBlackList,
	getOneProfileBlackList,
	getProfileBlackList,
} from "../model/blackListRepositories";
import { deleteLikedProfile } from "../model/likeRepositories";
import { deleteAllNotification } from "../model/notificationRepositories";
import {
	getProfileByUserId,
	getProfileByUsername,
	updatePopularityScore,
} from "../model/profileRepositories";
import { deleteViewProfile } from "../model/viewRepositories";
import { jwtVerify } from "../services/validation/jwt";
import { deleteLike, likeStatus } from "../services/likeStatus";

export async function getProfileBlackListController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const list = await getProfileBlackList(jwt.decoded.id);
		res.status(200).json(list);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function addProfileInBlackListController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profileBlocked = await getProfileByUsername(req.body.username);
		const profileBlocker = await getProfileByUserId(jwt.decoded.id);
		const status = await likeStatus(profileBlocker, profileBlocked);
		await getOneProfileBlackList(jwt.decoded.id, profileBlocked.userId);
		await addProfileBlackList(jwt.decoded.id, profileBlocked.userId);
		res.status(200).json("Profile add to blacklist");
		if (status.iLike === true) {
			try {
				await deleteLike(profileBlocker, profileBlocked);
			} catch (error) {}
		}
		if (status.heLike) {
			try {
				await deleteLike(profileBlocked, profileBlocker);
			} catch (error) {}
		}
		try {
			await deleteViewProfile(profileBlocked.userId, jwt.decoded.id);
		} catch (error) {}
		try {
			await deleteViewProfile(jwt.decoded.id, profileBlocked.userId);
		} catch (error) {}
		try {
			await deleteAllNotification(profileBlocked.userId, jwt.decoded.id);
		} catch (error) {}
		try {
			await deleteAllNotification(jwt.decoded.id, profileBlocked.userId);
		} catch (error) {}
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function deleteProfileInBlackListController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profileBlocked = await getProfileByUsername(req.body.username);
		await deleteProfileBlackList(jwt.decoded.id, profileBlocked.userId);
		res.status(200).json("Profile delete to blacklist");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function reportController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profile = await getProfileByUsername(req.body.username);
		reportMail(profile, req.body.message);
		res.status(200).json("Profile reported");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
