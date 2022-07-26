/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userController.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:05:11 by jfleury           #+#    #+#             */
/*   Updated: 2021/01/28 18:19:15 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from "express";
import fs from "fs";
import { getUserLikes } from "../model/likeRepositories";
import { deleteLike } from "../services/likeStatus";

import { getProfileByUserId } from "../model/profileRepositories";
import {
	activateUser,
	addUser,
	changeEmail,
	changePassword,
	deleteUser,
	getUserByEmail,
	getUserById,
} from "../model/userRepositories";
import { generatePassword } from "../services/generateString";
import {
	activatedUserMailer,
	newEmailMailer,
	newPasswordMailer,
} from "../services/mailer";
import { generateTokenForUser, jwtVerify } from "../services/validation/jwt";
import { checkPassword, hashPassword } from "../services/validation/password";
import {
	addUserValidation,
	changeEmailValidation,
	changePasswordValidation,
	deleteUserValidation,
	loginUserValidation,
	resetPasswordValidation,
} from "../services/validation/userValidation";

const glob = require("glob");

export async function loginUserController(req: Request, res: Response) {
	try {
		await loginUserValidation(req.body);
		const user = await getUserByEmail(req.body.email);
		await checkPassword(req.body.password, user.password);
		res.status(200).json({
			user: {
				id: user.id,
				email: user.email,
				registrationDate: user.registrationDate,
				activated: user.activated,
			},
			token: generateTokenForUser(user),
		});
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function activateUserController(req: Request, res: Response) {
	try {
		let user = await getUserById(req.body.id);
		if (user.activationKey === req.body.activationKey) {
			const result = await activateUser(req.body.id);
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function activateNewEmailController(req: Request, res: Response) {
	try {
		const userId = parseInt(req.query.id.toString());
		const user = await getUserById(userId);
		if (hashPassword(user.id + user.email) === req.query.hash) {
			const result = await changeEmail(userId, req.query.email as string);
			res.status(200).send(result);
		}
		res.status(200).send("hash invalid");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function addUserController(req: Request, res: Response) {
	try {
		await addUserValidation(req.body);
		const password = hashPassword(req.body.password);
		const newUser = await addUser(req.body.email, password);

		if (req.body.redirectUrl !== "scriptOrigin") {
			await activatedUserMailer(
				newUser,
				`${req.body.redirectUrl}?activationKey=${newUser.activationKey}&id=${newUser.id}`
			);
		}

		res.status(200).json({
			user: {
				email: newUser.email,
				registrationDate: newUser.registrationDate,
				activated: newUser.activated,
			},
			token: generateTokenForUser(newUser),
		});
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function changePasswordController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const user = await getUserById(jwt.decoded.id);
		await changePasswordValidation(req.body, user);
		await checkPassword(req.body.password, user.password);
		await changePassword(jwt.decoded.id, hashPassword(req.body.newPassword));
		res.status(200).send("Password change");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function changeEmailController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);
		const user = await getUserById(jwt.decoded.id);
		await changeEmailValidation(req.body, user);
		await checkPassword(req.body.password, user.password);
		newEmailMailer(
			req.body.newEmail,
			`http://localhost:3001/user/activateNewEmail?hash=${hashPassword(
				user.id + user.email
			)}&email=${req.body.newEmail}&id=${user.id}`
		);
		res.status(200).send("Email send to your new email");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function resetPasswordController(req: Request, res: Response) {
	try {
		await resetPasswordValidation(req.body);
		const user = await getUserByEmail(req.body.email);
		const newPassword = generatePassword();
		await changePassword(user.id, hashPassword(newPassword));
		newPasswordMailer(user, newPassword);
		res
			.status(200)
			.send("Check your emails to retrieve your temporary password");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}

export async function deleteUserController(req: Request, res: Response) {
	try {
		await deleteUserValidation(req.body);
		const jwt = await jwtVerify(req.headers.token, res);
		const user = await getUserById(jwt.decoded.id);
		const profile = await getProfileByUserId(jwt.decoded.id);
		try {
			glob("./public/images/" + profile.username + "*", (error, files) => {
				console.log(error, files);
				files.map((file) => {
					fs.unlinkSync(file);
				});
			});
		} catch (err) {
			console.error(err);
		}
		await checkPassword(req.body.password, user.password);
		let likedProfiles = await getUserLikes(jwt.decoded.id);
		likedProfiles.map((likedProfile) => {
			deleteLike(profile, likedProfile);
		});
		await deleteUser(parseInt(jwt.decoded.id.toString()));
		res.status(200).send("User as deleted");
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
