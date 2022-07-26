/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mailer.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:53 by jfleury           #+#    #+#             */
/*   Updated: 2020/12/11 17:40:38 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile, user } from "../../types/types";
import { transporter } from "../app";

export async function activatedUserMailer(user: user, link: string) {
	try {
		await transporter.sendMail({
			to: user.email,
			subject: "Matcha: Activate your account",
			text: `Hello,\nIn order to activate your account, please click on this link: ${link}\n`,
		});
	} catch (error) {
		console.log("Mailer = ", error);
	}
}

export async function newPasswordMailer(user: user, password: string) {
	try {
		await transporter.sendMail({
			to: user.email,
			subject: "Matcha: Reset password",
			text: `Hello,\nYour new password is: ${password}\n`,
		});
	} catch (error) {
		console.log("Mailer = ", error);
	}
}

export async function newEmailMailer(email: string, link: string) {
	try {
		await transporter.sendMail({
			to: email,
			subject: "Matcha: Activate your new email",
			text: `Hello,\nTo activate your new email click here ${link}\n`,
		});
	} catch (error) {
		console.log("Mailer = ", error);
	}
}

export async function reportMail(profile: profile, message: string) {
	try {
		await transporter.sendMail({
			to: "project.matcha.42@gmail.com",
			subject: `Report: ${profile.username}`,
			text: `user message: ${message}\n
			Profile: ${JSON.stringify(profile, null, "\t")}`,
		});
	} catch (error) {
		console.log("Mailer = ", error);
	}
}
