/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   password.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:55 by jfleury           #+#    #+#             */
/*   Updated: 2020/12/03 11:58:45 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import crypto from "crypto";

export const hashPassword = (password: string): string =>
	crypto.createHash("sha512").update(password).digest("hex");

export function checkPassword(password: string, hash: string) {
	return new Promise((resolve, reject) => {
		if (hashPassword(password) === hash) {
			resolve();
		} else {
			reject({ code: 401, message: "Invalid password" });
		}
	});
}
