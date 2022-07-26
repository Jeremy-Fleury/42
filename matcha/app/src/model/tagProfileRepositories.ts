/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tagProfileRepositories.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:23 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/30 10:34:09 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from 'mysql';

import { tag, tagProfile } from '../../types/types';
import { dataBase } from '../app';

export function getTagProfile(id: number): Promise<{ tag: string }[] | null> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM 
			tag
		INNER JOIN
			tagProfile
		WHERE
			tagProfile.profileId = ${escape(id)} 
		AND
			tag.id = tagProfile.tagId`;

		dataBase.query(sql, (error: string, result: { tag: string }[]) => {
			if (error) {
				reject(error);
			}
			resolve(result);
		});
	});
}

export function addTagProfile(
	profileId: number,
	tagId: number
): Promise<tagProfile | null> {
	return new Promise((resolve, reject) => {
		const sql = `
		INSERT INTO tagProfile (
			tagId,
			profileId
		) VALUES (
			${escape(tagId)},
			${escape(profileId)}
		)`;

		dataBase.query(sql, (error: string, result: tagProfile) => {
			if (error) {
				reject(error);
			}
			resolve(result);
		});
	});
}

export function deleteAllTagProfile(id: number) {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			tagProfile
		WHERE
			profileId = ${escape(id)}`;

		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(result);
		});
	});
}
