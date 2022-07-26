/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   notificationRepositories.ts                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:16 by jfleury           #+#    #+#             */
/*   Updated: 2021/01/13 17:07:42 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from "mysql";

import { notification } from "../../types/types";
import { dataBase } from "../app";

export function addNotification(
	profileNotifedId: number,
	notifierProfileId: number,
	notification: string
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		INSERT INTO notificationProfile (
			profileNotifedId,
			notifierProfileId,
			date,
			notification
		) VALUES (
			${escape(profileNotifedId)},
			${escape(notifierProfileId)},
			${escape(Date.now())},
			${escape(notification)}
		)`;

		dataBase.query(sql, (error, result) => {
			if (error) {
				console.log(error);
				reject({ code: 500, message: error });
			}
			if (result && result.affectedRows) {
				resolve(true);
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function deleteNotification(
	id: number,
	profileNotifedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			notificationProfile
		WHERE
			id = ${escape(id)} 
		AND
			profileNotifedId = ${escape(profileNotifedId)}`;

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

export function deleteMessageNotifications(
	notifierProfileId: number,
	profileNotifedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			notificationProfile
		WHERE
			((notifierProfileId = ${escape(
				notifierProfileId
			)} AND profileNotifedId = ${escape(profileNotifedId)})
		OR  (notifierProfileId = ${escape(
			profileNotifedId
		)} AND profileNotifedId = ${escape(notifierProfileId)}))
		AND
			notification LIKE 'message%'`;

		dataBase.query(sql, (error) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(true);
		});
	});
}

export function readNotification(id: number): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		UPDATE 
			notificationProfile
		SET
			isRead = 1
		WHERE
			id = ${escape(id)}`;

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

export function deleteAllNotification(
	notifierProfield: number,
	profileNotifiedId: number
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			notificationProfile
		WHERE
			notifierProfileId = ${escape(notifierProfield)}
		AND
			profileNotifedId = ${escape(profileNotifiedId)}`;

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

export function getNotification(id: number): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			notificationProfile.*,
			profile.*
		FROM 
			notificationProfile
		JOIN 
			profile ON profile.userId = notificationProfile.notifierProfileId
		WHERE
			notificationProfile.profileNotifedId = ${escape(id)}
		ORDER BY date DESC`;

		dataBase.query(sql, (error: string, result: notification[]) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(result);
		});
	});
}

export function getLastNotification(id: number): Promise<notification> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT id
		FROM  notificationProfile
		WHERE notificationProfile.profileNotifedId = ${escape(id)}
		ORDER BY date DESC
		LIMIT 1`;

		dataBase.query(sql, (error: string, result: notification) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(result[0].id);
		});
	});
}
