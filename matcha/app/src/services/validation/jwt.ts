/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   jwt.ts                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:46 by jfleury           #+#    #+#             */
/*   Updated: 2020/12/05 17:49:47 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Response } from "express";
import jwt from "jsonwebtoken";

import { user } from "../../../types/types";

export const JWT_SIGN_SECRET = "p4msh40n39f7nf037rhg0sa24gt90374gohdgwh3i8";

export function generateTokenForUser(user: user) {
	return jwt.sign(
		{
			id: user.id,
			activated: user.activated,
		},
		JWT_SIGN_SECRET,
		{
			expiresIn: "1d",
		}
	);
}

export async function jwtVerify(
	token: string | string[],
	res: Response
): Promise<{
	isLogin: boolean;
	decoded: { id: number; activated: number };
} | null> {
	return new Promise((resolve, reject) => {
		let isLogin: boolean = false;

		jwt.verify(
			typeof token === "string" ? token : null,
			JWT_SIGN_SECRET,
			(error, decoded: { id: number; activated: number }) => {
				isLogin = error ? false : true;

				if (isLogin === false) {
					reject({ code: 401, message: "Error: unauthorized token invalid" });
				}
				resolve({
					isLogin: isLogin,
					decoded: { id: decoded.id, activated: decoded.activated },
				});
			}
		);
	});
}
