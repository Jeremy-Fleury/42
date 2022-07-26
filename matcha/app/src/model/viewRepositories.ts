/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:33 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/04 18:29:27 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from "mysql";
import { view } from "types/types";

import { dataBase } from "../app";

export async function getView(profileSeenId: number): Promise<view[] | null> {
	return new Promise((resolve) => {
		const sql = `
		SELECT
			*
		FROM
			viewProfile
		JOIN
			profile ON viewProfile.viewerProfileId = profile.userId
		WHERE
			profileSeenId = ${escape(profileSeenId)}`;

		dataBase.query(sql, (error: string, result: view[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export async function getViewByViewerProfileId(
	profileSeenId: number,
	viewerProfileId: number
): Promise<view | null> {
	return new Promise((resolve) => {
		const sql = `
		SELECT
			*
		FROM
			viewProfile
		WHERE
			profileSeenId = ${escape(profileSeenId)} 
		AND
			viewerProfileId = ${escape(viewerProfileId)}`;

		dataBase.query(sql, (error: string, result: view[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result && result.length ? result[0] : null);
		});
	});
}

export async function addView(
	profileSeenId: number,
	viewerProfileId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `
		INSERT INTO viewProfile (
			profileSeenId,
			viewDate,
			viewerProfileId
		) VALUES (
			${escape(profileSeenId)},
			${escape(Date.now().toString())},
			${escape(viewerProfileId)}
		)`;

		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export async function updateView(
	profileSeenId: number,
	viewerProfileId: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `
		UPDATE
			viewProfile
		SET
			viewDate = ${escape(Date.now().toString())} 
		WHERE
			profileSeenId = ${escape(profileSeenId)} 
		AND
			viewerProfileId = ${escape(viewerProfileId)}`;

		dataBase.query(sql, (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

export function deleteViewProfile(
	profileLikedId: number,
	profileHasBeenLikedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			viewProfile
		WHERE
			profileSeenId = ${escape(profileLikedId)} 
		AND
			viewerProfileId = ${escape(profileHasBeenLikedId)}`;

		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			if (result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}
