/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileController.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:04:59 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/28 17:05:30 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from "express";
import { calculateDistance } from "../services/algorithm/locationAlgorithm";

import {
	addProfile,
	getCompleteProfileByUserId,
	getCompleteProfileByUsername,
	updateProfile,
} from "../model/profileRepositories";
import { shapingProfile } from "../services/formatter/shapingProfile";
import { jwtVerify } from "../services/validation/jwt";
import {
	addProfileValidation,
	getProfileByUsernameValidation,
} from "../services/validation/profileValidation";
import { disconnect } from "process";

export async function getProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		let profile = await getCompleteProfileByUserId(jwt.decoded.id);
		profile = shapingProfile(profile);
		res.status(200).json(profile);
	} catch (error) {
		console.log(error);
		res.status(error.code).send(error.message);
	}
}

export async function getProfileByUsernameController(
	req: Request,
	res: Response
) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const loggedInProfile = await getCompleteProfileByUserId(jwt.decoded.id);
		await getProfileByUsernameValidation(req.query);
		const profile = await getCompleteProfileByUsername(
			req.query.username.toString()
		);
		profile.distance = calculateDistance(
			loggedInProfile.lat,
			profile.lat,
			loggedInProfile.lng,
			profile.lng
		);
		res.status(200).json(shapingProfile(profile));
	} catch (error) {
		console.log(error.code, error.message);
		res.status(error.code).send(error.message);
	}
}

export async function addProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		await addProfileValidation(req.body);
		const profile = await addProfile(req.body, jwt.decoded.id);
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function updateProfileController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		await addProfileValidation(req.body);
		const profile = await updateProfile(req.body, jwt.decoded.id);
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
