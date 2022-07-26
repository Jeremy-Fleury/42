/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   types.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:24:37 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/28 19:27:11 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface Ilocation {
	geoLocation: Iaddress | null;
	usageLocation: Iaddress | null;
}

export interface Iaddress {
	city: string | null;
	postCode: string | null;
	countryCode: string | null;
	country: string | null;
	isFromGeolocation: boolean;
	lat: number | null;
	lng: number | null;
	userId?: number;
	distanceInKm?: number;
}

export interface Icoordinates {
	latitude: number;
	longitude: number;
}

export interface user {
	id: number;
	email: string;
	password: string;
	registrationDate: number;
	activated: boolean;
	activationKey: string;
}

export interface IlistProfiles {
	profile: Iprofile;
	tag: string[];
	location: Iaddress;
	imgs: string[];
}

export interface Iprofile {
	username: string;
	firstname: string;
	lastname: string;
	dob: number | null;
	geoLocationAuthorization: boolean;
	gender: string | null;
	sexualOrientation: string | null;
	bio: string | null;
	age?: number | null;
	tag?: string[];
	popularityScore?: number;
	userId?: number;
	online?: number;
	lastConnection?: string;
	imgs?: (null | string)[];
}

export interface Iimgs {
	img0: string | null;
	img1: string | null;
	img2: string | null;
	img3: string | null;
	img4: string | null;
}

export interface like {
	profileLikesId: number;
	profileHasBeenLikedId: number;
}

export interface Inotification {
	notifierProfile: Iprofile;
	notification: {
		id: number;
		notification: string;
		date: number;
		isRead: boolean;
	};
}

export interface tag {
	id: number;
	tag: string;
}

export interface tagProfile {
	idProfile: number;
	idTag: number;
}
