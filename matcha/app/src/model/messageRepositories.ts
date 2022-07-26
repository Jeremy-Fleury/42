/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   messageRepositories.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/23 12:07:19 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/03 19:06:36 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from "mysql";

import { dataBase } from "../app";

export function addMessage(
	sender: string,
	receiver: string,
	timestamp: string,
	message: string
): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO message (
			sender,
			receiver,
			timestamp,
			message
		) VALUES (
			${escape(sender)},
			${escape(receiver)},
			${escape(timestamp)},
			${escape(message)}
		)`;

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

export function getMessage(
	username1: string,
	username2: string
): Promise<any[]> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			message
		WHERE
			sender = ${escape(username1)}
		AND
			receiver = ${escape(username2)}
		OR
			sender = ${escape(username2)}
		AND
			receiver = ${escape(username1)}`;

		dataBase.query(sql, (error, result) => {
			if (error) {
				reject({ code: 500, message: error });
			}
			resolve(result);
		});
	});
}
