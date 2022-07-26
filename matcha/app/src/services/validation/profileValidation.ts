/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileValidation.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 13:56:59 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/28 17:05:49 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { profile } from "../../../types/types";

export function addProfileValidation(body: profile) {
	return new Promise((resolve, reject) => {
		if (!body.dob || !body.username || !body.firstname || !body.lastname) {
			reject({ code: 400, message: "Error: mandatory parameters are missing" });
		}
		if (Date.now() - body.dob < 567648000000) {
			reject({ code: 400, message: "Error: dob invalid" });
		}
		if (body.gender && body.gender !== "male" && body.gender !== "female") {
			reject({ code: 400, message: "Error: gender invalid" });
		}
		if (
			body.sexualOrientation &&
			body.sexualOrientation !== "gay" &&
			body.sexualOrientation !== "lesbian" &&
			body.sexualOrientation !== "bisexual" &&
			body.sexualOrientation !== "heterosexual"
		) {
			reject({ code: 400, message: "Error: sexualOriantation invalid" });
		}
		resolve();
	});
}

export function getProfileByUsernameValidation(query: any) {
	return new Promise((resolve, reject) => {
		if (query && query.username) {
			resolve();
		}
		reject({ code: 400, message: "Error: mandatory parameters are missing" });
	});
}
