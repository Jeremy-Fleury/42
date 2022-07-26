/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRepositories.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:30 by jfleury           #+#    #+#             */
/*   Updated: 2021/01/12 17:05:03 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from "mysql";

import { user } from "../../types/types";
import { dataBase } from "../app";
import { generateActivationKey } from "../services/generateString";

export function getUserById(id: number): Promise<user> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			user
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (!result || result.length !== 1) {
				reject({ code: 200, message: "Error: user does not exist" });
				return;
			}
			resolve(result[0]);
		});
	});
}

export function getUserByEmail(email: string): Promise<user> {
	return new Promise((resolve, reject) => {
		const sql = `
		SELECT
			*
		FROM
			user
		WHERE
			email = ${escape(email)}`;

		dataBase.query(sql, (error: string, result: user[]) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (!result || result.length !== 1) {
				reject({ code: 401, message: "Error: user does not exist" });
				return;
			}
			resolve(result[0]);
		});
	});
}

export function changePassword(id: number, password: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		UPDATE
			user
		SET
			password = ${escape(password)} 
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, async (error: string, result) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (result.affectedRows) {
				resolve("Password has beeen change");
				return;
			}
			reject({ code: 400, message: "Error: password not change" });
		});
	});
}

export function changeEmail(id: number, email: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		UPDATE
			user
		SET
			email = ${escape(email)}
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, async (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					reject({ code: 200, message: "Email already exsist" });
					return;
				}
				reject({ code: 500, message: error });
				return;
			}
			if (result && result.affectedRows) {
				resolve(
					"Email modification has been performed, please login with your new email"
				);
				return;
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export function addUser(email: string, password: string): Promise<user> {
	return new Promise((resolve, reject) => {
		const date = Date.now();
		const activationKey = generateActivationKey();
		const sql = `
		INSERT INTO user (
			email,
			password,
			registrationDate,
			activationKey
		) SELECT 
			${escape(email)},
			${escape(password)},
			${escape(date)},
			${escape(activationKey)}
		WHERE NOT EXISTS (
			SELECT
				*
			FROM
				user
			WHERE
				email = ${escape(email)}
		)`;

		dataBase.query(sql, async (error, result) => {
			if (error) {
				if (error.errno === 1062) {
					reject({ code: 200, message: "Email already exsist" });
					return;
				}
				reject({ code: 500, message: error });
				return;
			}
			if (result.affectedRows) {
				const user = await getUserByEmail(email);
				resolve(user);
				return;
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export async function activateUser(id: number): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		UPDATE
			user
		SET
			activated = TRUE
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, async (error: string, result) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (result.affectedRows) {
				resolve("User activated");
				return;
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}

export async function deleteUser(id: number): Promise<string> {
	return new Promise((resolve, reject) => {
		const sql = `
		DELETE FROM
			user
		WHERE
			id = ${escape(id)}`;

		dataBase.query(sql, (error: string, result) => {
			if (error) {
				reject({ code: 500, message: error });
				return;
			}
			if (result.affectedRows) {
				resolve("User delete");
				return;
			}
			reject({ code: 400, message: "Error: an error occured" });
		});
	});
}
