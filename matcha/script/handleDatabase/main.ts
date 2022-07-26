/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/14 11:11:35 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/08 19:32:55 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createConnection } from "mysql";

let dataBase = null;

function initMysql() {
	dataBase = createConnection({
		host: "fj199397-001.dbaas.ovh.net",
		port: 35833,
		user: "jfleury",
		database: "matcha",
		password: "Matcha1234",
	});
	dataBase.connect((error) => {
		if (error) {
			throw error;
		}
		console.log("\x1b[33m" + "mysql connected" + "\x1b[0m");
	});
}

export async function addTableUser() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE user (
			id						INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			email					char(255) NOT NULL UNIQUE,
			password				TEXT NOT NULL,
			registrationDate		TEXT NOT NULL,
			activated				BOOLEAN DEFAULT 0 NOT NULL,
			activationKey			CHAR(32) NOT NULL
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table user created");
			resolve();
		});
	});
}

export async function addTableProfile() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE profile (
			userId							INTEGER NOT NULL UNIQUE,
			dob								BIGINT NOT NULL,
			popularityScore					INTEGER DEFAULT 50 NOT NULL,
			username	 					char(255) NOT NULL UNIQUE,
			firstname						TEXT NOT NULL,
			lastname						TEXT NOT NULL,
			gender							TEXT,
			geoLocationAuthorization		BOOLEAN DEFAULT 0 NOT NULL,
			sexualOrientation				TEXT NOT NULL,
			bio								TEXT,
			online							BOOLEAN DEFAULT 0 NOT NULL,
			lastConnection					BIGINT NOT NULL,
			FOREIGN KEY (userId) 			REFERENCES user(id) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table profile created");
			resolve();
		});
	});
}

export async function addTableGeoLocation() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE geoLocation (
			userId							INTEGER NOT NULL,
			isFromGeolocation				BOOLEAN DEFAULT 0 NOT NULL,
		    city							TEXT NOT NULL,
    		postCode						TEXT,
    		countryCode						TEXT,
    		country							TEXT,
    		lat								FLOAT,
    		lng								FLOAT,
			FOREIGN KEY (userId) 			REFERENCES user(id) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table geoLocation created");
			resolve();
		});
	});
}

export async function addTableUsageLocation() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE usageLocation (
			userId							INTEGER NOT NULL,
			isFromGeolocation				BOOLEAN DEFAULT 0 NOT NULL,
		    city							TEXT NOT NULL,
    		postCode						TEXT,
    		countryCode						TEXT,
    		country							TEXT,
    		lat								FLOAT,
    		lng								FLOAT,
			FOREIGN KEY (userId) 			REFERENCES user(id) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table usageLocation created");
			resolve();
		});
	});
}

export function addTableLike() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE likeProfile (
			profileLikesId							INTEGER NOT NULL,
			profileHasBeenLikedId					INTEGER NOT NULL,
			CONSTRAINT likes_hasBeenLiked			UNIQUE(profileLikesId, profileHasBeenLikedId),
			FOREIGN KEY (profileLikesId) 			REFERENCES profile(userId) ON DELETE CASCADE,
			FOREIGN KEY (profileHasBeenLikedId) 	REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table likeProfile created");
			resolve();
		});
	});
}

export async function addTableNotification() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE notificationProfile (
			id										INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			profileNotifedId						INTEGER NOT NULL,
			notifierProfileId						INTEGER NOT NULL,
			date									TEXT NOT NULL,
			notification							TEXT NOT NULL,
			isRead									INTEGER DEFAULT 0 NOT NULL,
			FOREIGN KEY (profileNotifedId) 			REFERENCES profile(userId) ON DELETE CASCADE,
			FOREIGN KEY (notifierProfileId) 		REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table notificationProfile created");
			resolve();
		});
	});
}

export async function addTableTag() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE tag (
			id					INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
			tag					char(255) NOT NULL UNIQUE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table tag created");
			resolve();
		});
	});
}

export async function addTableTagProfile() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE tagProfile (
			tagId							INTEGER NOT NULL,
			profileId						INTEGER NOT NULL,
			FOREIGN KEY (tagId) 			REFERENCES tag(id) ON DELETE CASCADE,
			FOREIGN KEY (profileId) 		REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table tagProfile created");
			resolve();
		});
	});
}

export async function addTableViewProfile() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE viewProfile (
			profileSeenId						INTEGER NOT NULL,
			viewerProfileId						INTEGER NOT NULL,
			viewDate							TEXT NOT NULL,
			FOREIGN KEY (profileSeenId) 		REFERENCES profile(userId) ON DELETE CASCADE,
			FOREIGN KEY (viewerProfileId) 		REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table viewProfile created");
			resolve();
		});
	});
}

export async function addTableMessage() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE message (
			sender					char(255) NOT NULL,
			receiver				char(255) NOT NULL,
			timestamp				TEXT NOT NULL,
			message					TEXT NOT NULL
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table message created");
			resolve();
		});
	});
}

export async function addTableBlackList() {
	return new Promise((resolve) => {
		const sql = `CREATE TABLE blackList (
			profileId							INTEGER NOT NULL,
			profileBlockId						INTEGER NOT NULL,
			FOREIGN KEY (profileId) 			REFERENCES profile(userId) ON DELETE CASCADE,
			FOREIGN KEY (profileBlockId) 		REFERENCES profile(userId) ON DELETE CASCADE
		)`;
		dataBase.query(sql, (error: string) => {
			if (error) throw error;
			console.log("Table message created");
			resolve();
		});
	});
}

export async function dropTable(nameTable: string) {
	return new Promise((resolve) => {
		const sql = `DROP TABLE ${nameTable}`;
		dataBase.query(sql, (error: string, result) => {
			if (error) throw error;
			console.log(`Table ${nameTable} deleted`);
			resolve();
		});
	});
}

async function main() {
	initMysql();
	//await dropTable("user");

	await addTableUser();
	await addTableProfile();
	await addTableUsageLocation();
	await addTableGeoLocation();
	await addTableLike();
	await addTableNotification();
	await addTableTag();
	await addTableTagProfile();
	await addTableViewProfile();
	await addTableMessage();
	await addTableBlackList();
}
main();
