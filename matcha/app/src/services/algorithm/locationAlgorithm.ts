/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   locationAlgorithm.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:06:49 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/28 16:38:16 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { location } from "../../../types/types";

function radianConversion(degree: number) {
	const result = degree * (Math.PI / 180);
	return result;
}

function distanceConversion(a: number, b: number, c: number, d: number) {
	const result =
		6367445 *
		Math.acos(
			Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(c - d)
		);
	if (isNaN(result)) {
		return 0;
	}
	return result;
}

export function calculateDistance(a: number, b: number, c: number, d: number) {
	const radianA = radianConversion(a);
	const radianB = radianConversion(b);
	const radianC = radianConversion(c);
	const radianD = radianConversion(d);

	const result = distanceConversion(radianA, radianB, radianC, radianD);
	return result / 1000;
}

export async function locationAlgorithm(
	profileLocation: location,
	profileRecoList: any[],
	distanceInKm: number
) {
	if (profileLocation.lat && profileLocation.lng) {
		return await Promise.all(
			profileRecoList.filter((profileReco) => {
				if (profileReco.lat && profileReco.lng) {
					const result = calculateDistance(
						profileLocation.lat,
						profileReco.lat,
						profileLocation.lng,
						profileReco.lng
					);
					profileReco.distance = result;
					return result < distanceInKm;
				}
			})
		);
	} else {
		return [];
	}
}
