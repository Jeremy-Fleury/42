/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   locationRepositories.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:13 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/05 09:45:46 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { escape } from "mysql";

import { location } from "../../types/types";
import { dataBase } from "../app";

function getLocation(id: number, table: string): Promise<location> {
	return new Promise((resolve) => {
		const sql = `
		SELECT
			*
		FROM
			${table} 
		WHERE
			userId = ${id}`;

		dataBase.query(sql, (error: string, result: location[]) => {
			if (error) {
				console.log(error);
				resolve(null);
			}
			resolve(result.length ? result[0] : null);
		});
	});
}

function addLocation(
	userId: number,
	location: location,
	table: string
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `
		INSERT INTO ${table} (
			userId,
			city,
			postCode,
			countryCode,
			country,
			lat,
			lng
		) VALUES (
			${escape(userId)},
			${escape(location.city)},
			${escape(location.postCode)},
			${escape(location.countryCode)},
			${escape(location.country)},
			${escape(location.lat)},
			${escape(location.lng)}
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
export function updateLocation(
	userId: number,
	location: location,
	table: string
): Promise<boolean> {
	return new Promise((resolve) => {
		const sql = `
		UPDATE
			${table}
		SET
			city = ${escape(location.city)},
			postCode = ${escape(location.postCode)},
			countryCode = ${escape(location.countryCode)},
			country = ${escape(location.country)},
			lat = ${escape(location.lat)},
			lng = ${escape(location.lng)}
		WHERE
			userId = ${escape(userId)}`;

		dataBase.query(sql, async (error: string) => {
			if (error) {
				console.log(error);
				resolve(false);
			}
			resolve(true);
		});
	});
}

// geoLocation table

export async function getGeoLocation(id: number) {
	return await getLocation(id, "geoLocation");
}

export async function addGeoLocation(userId: number, location: location) {
	return await addLocation(userId, location, "geoLocation");
}

export async function updateGeoLocation(userId: number, location: location) {
	return await updateLocation(userId, location, "geoLocation");
}

// usageLocation table

export async function getUsageLocation(id: number) {
	return await getLocation(id, "usageLocation");
}

export async function addUsageLocation(userId: number, location: location) {
	return await addLocation(userId, location, "usageLocation");
}

export async function updateUsageLocation(userId: number, location: location) {
	return await updateLocation(userId, location, "usageLocation");
}
