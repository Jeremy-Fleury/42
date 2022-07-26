/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blackListRepositories.ts                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/27 10:04:16 by jfleury           #+#    #+#             */
/*   Updated: 2021/01/15 16:18:18 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from "mysql";

import { dataBase } from "../app";

export function getOneProfileBlackList(
	profileId: number,
	profileBlockId: number
): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			blackList
		WHERE
			profileId = ${escape(profileId)} 
		AND
			profileBlockId = ${escape(profileBlockId)}`;

		dataBase.query(sql, (error: string, result: any[]) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result.length > 0) {
				reject({ code: 400, message: "Profile is already blocked" });
			}
			resolve(result);
		});
	});
}

export function getProfileBlackList(profileId: number): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT 
			GROUP_CONCAT(profile.username SEPARATOR ',') AS username
		FROM 
			blackList
		LEFT JOIN
			profile on profile.userId = blackList.profileBlockId
		WHERE
			profileId = ${escape(profileId)}`;

		dataBase.query(sql, (error: string, result: any[]) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(
				result && result.length && result[0].username
					? result[0].username.split(",")
					: []
			);
		});
	});
}

export function addProfileBlackList(
	profileId: number,
	profileBlockId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		INSERT INTO blackList (
			profileId,
			profileBlockId
		) VALUES (
			${escape(profileId)},
			${escape(profileBlockId)}
		)`;

		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result && result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export async function deleteProfileBlackList(
	profileId: number,
	profileBlockId: number
): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			blackList
		WHERE
			profileId = ${escape(profileId)}
		AND
			profileBlockId = ${escape(profileBlockId)}`;

		dataBase.query(sql, (error: string, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result && result.affectedRows) {
				resolve("User delete");
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}
