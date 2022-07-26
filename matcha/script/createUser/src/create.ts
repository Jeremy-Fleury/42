/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:26 by jfleury           #+#    #+#             */
/*   Updated: 2020/12/11 14:27:30 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import fetch from 'node-fetch';

import { location, profile, tag, user } from '../../../app/types/types';
import { femaleSexualOrientation, maleSexualOrientation, tag1, tag2, tag3, tag4 } from './const';
import { getApiLocationUser } from './getApi';

export function createUser(email: string): Promise<{ user: user; token: string } | null> {
	return new Promise(async (resolve) => {
		const args = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: 'Matcha1234',
				redirectUrl: 'scriptOrigin'
			})
		};

		await fetch('http://localhost:3001/user/addUser', args)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response;
			})
			.then((response) => {
				resolve(response.json());
			})
			.catch((error) => {
				console.log('-> addUser error', error);
				resolve(null);
			});
	});
}

export function createProfile(infoApi: any, token: string): Promise<profile> {
	return new Promise(async (resolve) => {
		const args = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: token
			},
			body: JSON.stringify({
				dob: new Date(infoApi.dob.date).getTime(),
				firstname: infoApi.name.first,
				lastname: infoApi.name.last,
				gender: infoApi.gender,
				sexualOrientation:
					infoApi.gender === 'male'
						? maleSexualOrientation[Math.floor(Math.random() * maleSexualOrientation.length)]
						: femaleSexualOrientation[Math.floor(Math.random() * femaleSexualOrientation.length)],
				geoLocationAuthorization: 1,
				username: infoApi.login.username,
				bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas vulputate enim viverra vehicula.`,
				lastConnection: Date.now()
			})
		};

		await fetch('http://localhost:3001/profile/addProfile', args)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response;
			})
			.then((response) => {
				resolve(response.json());
			})
			.catch((error) => {
				console.log('-> addProfile error', error);
				resolve(null);
			});
	});
}

export function createTag(infoApi: any, token: string): Promise<tag> {
	return new Promise(async (resolve) => {
		const tagList = {
			tagList: [
				tag1[Math.floor(Math.random() * tag1.length)],
				tag2[Math.floor(Math.random() * tag2.length)],
				tag3[Math.floor(Math.random() * tag3.length)],
				tag4[Math.floor(Math.random() * tag4.length)]
			]
		};

		const args = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: token
			},
			body: JSON.stringify(tagList)
		};

		await fetch('http://localhost:3001/tag/addTagProfile', args)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response;
			})
			.then((response) => {
				resolve(response.json());
			})
			.catch((error) => {
				console.log('-> addTag error', error);
				resolve(null);
			});
	});
}

export function createLocation(infoApi: any, token: string): Promise<location> {
	return new Promise(async (resolve) => {
		const result: any = await getApiLocationUser('France,' + infoApi.location.city.toString());
		if (result) {
			const args = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: token
				},
				body: JSON.stringify({
					isFromGeolocation: false,
					city: infoApi.location.city as string,
					postCode: result.results[0].components.postcode
						? result.results[0].components.postcode.toString()
						: null,
					countryCode: result.results[0].components.country_code,
					country: result.results[0].components.country,
					lat: parseFloat(result.results[0].geometry.lat),
					lng: parseFloat(result.results[0].geometry.lng)
				})
			};

			await fetch('http://localhost:3001/location/handleUsageLocation', args)
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response;
				})
				.then((response) => {
					resolve(response.json());
				})
				.catch((error) => {
					console.log('-> addLocation error', error);
					resolve(null);
				});
		} else {
			console.log('getApiLocationUser null');
			resolve(null);
		}
	});
}
