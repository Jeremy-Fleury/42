/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:09 by jfleury           #+#    #+#             */
/*   Updated: 2021/01/28 17:52:03 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from "mysql";

import { like } from "../../types/types";
import { dataBase } from "../app";

export function addLikedProfile(
	profileLikedId: number,
	profileHasBeenLikedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		INSERT INTO likeProfile (
			profileLikesId,
			profileHasBeenLikedId
		) VALUES (
			${escape(profileLikedId)},
			${escape(profileHasBeenLikedId)}
		)`;

		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (result.affectedRows) {
				resolve(true);
				return;
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function deleteLikedProfile(
	profileLikedId: number,
	profileHasBeenLikedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			likeProfile
		WHERE
			profileLikesId = ${escape(profileLikedId)} 
		AND
			profileHasBeenLikedId = ${escape(profileHasBeenLikedId)}`;

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

export function getUserHasBeenLikedById(id: number): Promise<any[] | null> {
	return new Promise((resolve) => {
		const sql = `
		SELECT
			likeProfile.*,
			profile.*
		FROM 
			likeProfile
		JOIN 
			profile ON profile.userId = likeProfile.profileLikesId
		WHERE
			likeProfile.profileHasBeenLikedId = ${escape(id)}
		`;

		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function getUserLikes(id: number): Promise<any[] | null> {
	return new Promise((resolve) => {
		const sql = `
		SELECT
			likeProfile.*,
			profile.*
		FROM 
			likeProfile
		JOIN 
			profile ON profile.userId = likeProfile.profileHasBeenLikedId
		WHERE
			likeProfile.profileLikesId = ${escape(id)}
		`;

		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function getStatueOfLike(
	id1: number,
	id2: number
): Promise<any[] | null> {
	return new Promise((resolve) => {
		const sql = `
		SELECT
			*
		FROM
			likeProfile
		WHERE
			profileLikesId = ${escape(id1)} 
		AND
			profileHasBeenLikedId = ${escape(id2)}
		OR
			profileLikesId = ${escape(id2)}
		AND
			profileHasBeenLikedId = ${escape(id1)}`;

		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result);
		});
	});
}

export function getProfileMatch(id: number): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			A.profileLikesId A,
			B.profileLikesId B,
			profile.*
		FROM
			likeProfile as A
		INNER JOIN 
			likeProfile as B
		INNER JOIN
			profile 
		ON 
			profile.userId = B.profileLikesId
		ON 
			A.profileLikesId = B.profileHasBeenLikedId 
		WHERE 
			A.profileLikesId = B.profileHasBeenLikedId 
		AND 
			B.profileLikesId = A.profileHasBeenLikedId 
		AND 
			A.profileLikesId = ${escape(id)}
		`;

		dataBase.query(sql, (error: string, result: like[]) => {
			if (error) {
				reject(error);
			}
			resolve(result);
		});
	});
}
