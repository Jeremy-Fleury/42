/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   recommendationController.ts                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:05:04 by jfleury           #+#    #+#             */
/*   Updated: 2021/01/15 16:18:10 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from "express";
import { userProfile } from "types/types";

import { getProfileBlackList } from "../model/blackListRepositories";
import {
	getCompleteProfileByUserId,
	getProfileBySexualOriantation,
} from "../model/profileRepositories";
import { recommendationAlgorithm } from "../services/algorithm/ recommendationAlgorithm";
import { locationAlgorithm } from "../services/algorithm/locationAlgorithm";
import {
	shapingProfile,
	shapingProfileReco,
} from "../services/formatter/shapingProfile";
import { jwtVerify } from "../services/validation/jwt";

export async function recommendationController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const userProfile: userProfile = shapingProfile(
			await getCompleteProfileByUserId(jwt.decoded.id)
		);
		const profileRecoList = await getProfileBySexualOriantation(
			userProfile.profile.userId,
			userProfile.profile.sexualOrientation,
			userProfile.profile.gender
		);
		const blackList = await getProfileBlackList(jwt.decoded.id);
		const listRecoBlacklist = profileRecoList.filter((profile) => {
			return !blackList.includes(profile.username);
		});
		const profileListLocation = await locationAlgorithm(
			userProfile.location,
			listRecoBlacklist,
			100
		);
		const algoList = await recommendationAlgorithm(
			profileListLocation,
			userProfile
		);
		res.status(200).json(algoList);
	} catch (error) {
		res.status(400).json(error);
	}
}

export async function allProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const userProfile: userProfile = shapingProfile(
			await getCompleteProfileByUserId(jwt.decoded.id)
		);
		const profileRecoList = await getProfileBySexualOriantation(
			userProfile.profile.userId,
			userProfile.profile.sexualOrientation,
			userProfile.profile.gender
		);
		const blackList = await getProfileBlackList(jwt.decoded.id);
		const listRecoBlacklist = profileRecoList.filter((profile) => {
			return !blackList.includes(profile.username);
		});
		if (
			userProfile.location &&
			userProfile.location.lat &&
			userProfile.location.lng
		) {
			const profileListLocation = await locationAlgorithm(
				userProfile.location,
				listRecoBlacklist,
				200
			);
			const allProfile = profileListLocation.map((profileLocation) =>
				shapingProfileReco(profileLocation)
			);
			res.status(200).json(allProfile);
		} else {
			const allProfile = listRecoBlacklist.map((profileLocation) =>
				shapingProfileReco(profileLocation)
			);
			res.status(200).json(allProfile);
		}
	} catch (error) {
		res.status(400).json(error);
	}
}
