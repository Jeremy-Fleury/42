/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:04:51 by jfleury           #+#    #+#             */
/*   Updated: 2021/01/28 18:03:47 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from "express";
import { handleNotifications } from "../services/handleNotifications";

import {
	addLikedProfile,
	deleteLikedProfile,
	getProfileMatch,
	getStatueOfLike,
	getUserHasBeenLikedById,
} from "../model/likeRepositories";
import {
	getCompleteProfileByUserId,
	getProfileByUserId,
	getProfileByUsername,
	updatePopularityScore,
} from "../model/profileRepositories";
import { jwtVerify } from "../services/validation/jwt";
import { deleteLike, matchStatus } from "../services/likeStatus";
import { shapingProfile } from "../services/formatter/shapingProfile";
import { deleteMessageNotifications } from "../model/notificationRepositories";

export async function addlikedProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profileHasBeenLiked = await getProfileByUsername(req.body.username);
		const profileLikes = await getProfileByUserId(jwt.decoded.id);
		await addLikedProfile(jwt.decoded.id, profileHasBeenLiked.userId);
		await updatePopularityScore(
			profileHasBeenLiked.popularityScore + 5,
			profileHasBeenLiked.userId
		);
		const isMatch = await matchStatus(profileLikes, profileHasBeenLiked);
		await handleNotifications(
			isMatch ? "likeBack" : "like",
			profileLikes,
			profileHasBeenLiked
		);
		res.status(200).json("Liked successful");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function deletelikedProfileController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const notifierProfile = await getProfileByUserId(jwt.decoded.id);
		const profileHasBeenUnliked = await getProfileByUsername(req.body.username);
		await deleteLike(notifierProfile, profileHasBeenUnliked);
		res.status(200).json("Delete like successful");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getProfileLikeController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const listLike = await getUserHasBeenLikedById(jwt.decoded.id);
		const resultList =
			listLike &&
			listLike.length &&
			listLike.map((item) => {
				return {
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
				};
			});
		res.status(200).json(resultList || []);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getStatueOfLikeController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const profile = await getProfileByUsername(req.body.username);
		const result = await getStatueOfLike(jwt.decoded.id, profile.userId);
		if (result.length === 2) {
			res.status(200).json({ iLike: true, heLike: true });
			return;
		} else if (result.length === 1) {
			if (result[0].profileLikesId === jwt.decoded.id) {
				res.status(200).json({ iLike: true, heLike: false });
				return;
			} else {
				res.status(200).json({ iLike: false, heLike: true });
				return;
			}
		}
		res.status(200).json({ iLike: false, heLike: false });
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function getProfileMatchController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const listMatch = await getProfileMatch(jwt.decoded.id);
		const resultList = [];
		if (listMatch && listMatch.length) {
			await Promise.all(
				listMatch.map(async (item) => {
					const profile = await getCompleteProfileByUserId(item.userId);
					resultList.push(shapingProfile(profile));
				})
			);
		}
		res.status(200).json(resultList);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
