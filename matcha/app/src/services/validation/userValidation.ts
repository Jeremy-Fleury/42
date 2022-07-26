/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userValidation.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 10:53:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/15 14:19:31 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { location, profile, user } from '../../../types/types';
import { hashPassword } from './password';

export function loginUserValidation(body: user) {
	return new Promise(async (resolve, reject) => {
		if (!body || !body.email || !body.password) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		resolve();
	});
}

export function activateUserValidation(body: {
	id: number;
	activationKey: string;
}) {
	return new Promise(async (resolve, reject) => {
		if (!body || !body.id || !body.activationKey) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}

		resolve();
	});
}

export function addUserValidation(body: {
	email: string;
	password: string;
	redirectUrl: string;
}) {
	return new Promise(async (resolve, reject) => {
		if (!body || !body.email || !body.password || !body.redirectUrl) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		const emailRegex = new RegExp(
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		);
		const passwordRegex = new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/);
		if (!emailRegex.test(body.email)) {
			reject({ code: 400, message: "Email invalid" });
		}
		if (!passwordRegex.test(body.password)) {
			reject({ code: 400, message: "Password invalid" });
		}
		resolve();
	});
}

export function changePasswordValidation(
	body: {
		newPassword: string;
		password: string;
	},
	user: user
) {
	return new Promise((resolve, reject) => {
		if (!body || !body.newPassword || !body.password) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		if (hashPassword(body.newPassword) === user.password) {
			reject({
				code: 400,
				message: "Error: newPassword is the same as current password",
			});
		}
		resolve();
	});
}

export function changeEmailValidation(
	body: {
		newEmail: string;
		password: string;
	},
	user: user
) {
	return new Promise((resolve, reject) => {
		if (!body || !body.newEmail || !body.password) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		if (body.newEmail === user.email) {
			reject({
				code: 400,
				message: "Error: newEmail is the same as current email",
			});
		}
		resolve();
	});
}

export function resetPasswordValidation(body: { email: string }) {
	return new Promise((resolve, reject) => {
		if (!body || !body.email) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		resolve();
	});
}

export function deleteUserValidation(body: { password: string }) {
	return new Promise((resolve, reject) => {
		if (!body || !body.password) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		resolve();
	});
}
