/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   shapingProfile.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:07:01 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/28 16:15:07 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fs from "fs";

function getProfileImagesPath(username: string) {
	let array = [];
	for (let i = 0; i < 5; i++) {
		try {
			fs.accessSync(
				"./public/images/" + username + "img" + i + ".jpg",
				fs.constants.R_OK | fs.constants.W_OK
			);
			array.push("http://localhost:3001/images/" + username + "img" + i);
		} catch (e) {
			array.push(null);
		}
	}
	return array;
}

export function shapingProfile(profile) {
	if (profile) {
		return {
			profile: {
				userId: profile.userId,
				dob: profile.dob,
				popularityScore: profile.popularityScore,
				username: profile.username,
				firstname: profile.firstname,
				lastname: profile.lastname,
				gender: profile.gender,
				sexualOrientation: profile.sexualOrientation,
				geoLocationAuthorization: profile.geoLocationAuthorization
					? true
					: false,
				bio: profile.bio,
				online: profile.online,
				lastConnection: profile.lastConnection,
			},
			location: {
				isFromGeolocation: profile.isFromGeolocation ? true : false,
				city: profile.city,
				postCode: profile.postCode,
				countryCode: profile.countryCode,
				country: profile.country,
				lat: profile.lat,
				lng: profile.lng,
				distanceInKm: profile.distance ?? null,
			},
			tag: profile.tag ? profile.tag.split(",") : null,
			imgs: getProfileImagesPath(profile.username),
		};
	}
}

export function shapingProfileReco(profile, score?) {
	if (profile) {
		return {
			profile: {
				userId: profile.userId,
				username: profile.username,
				firstname: profile.firstname,
				lastname: profile.lastname,
				dob: profile.dob,
				gender: profile.gender,
				sexualOrientation: profile.sexualOrientation,
				popularityScore: profile.popularityScore,
				bio: profile.bio,
				online: profile.online,
				lastConnection: profile.lastConnection,
			},
			location: {
				country: profile.country,
				countryCode: profile.countryCode,
				city: profile.city,
				postCode: profile.postCode,
				distanceInKm: profile.distance,
			},
			tag: profile.tag ? profile.tag.split(",") : null,
			score: score ? score : null,
		};
	}
}
