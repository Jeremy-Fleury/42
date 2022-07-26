/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   apiCalls.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/27 14:19:04 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/14 19:06:24 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import * as constants from "../services/constants";
import { Iprofile, IlistProfiles, user } from "../types/types";
import { fetchApi } from "./fetchApi";

export const signupAPI = (details: Object) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");

	return fetchApi<{ user: user; token: string }>(
		constants.URL + constants.URI_SIGNUP,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
		}
	);
};

export const signinAPI = (details: Object) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");

	return fetchApi<{ user: user; token: string }>(
		constants.URL + constants.URI_SIGNIN,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
		}
	);
};

export const deleteAPI = (details: Object, token: string) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_DELETE_ACCOUNT,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
			credentials: "include",
		}
	);
};

export const getProfileAPI = (token: string, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<IlistProfiles>(constants.URL + constants.URI_GET_PROFILE, {
		method: constants.GET_METHOD,
		headers: headers,
		credentials: "include",
		signal: signal,
	});
};

export const getProfileByUsernameAPI = (
	token: string,
	username: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<IlistProfiles>(
		constants.URL + constants.URI_GET_PROFILE_BY_USERNAME + username,
		{
			method: constants.GET_METHOD,
			headers: headers,
			credentials: "include",
			signal: signal,
		}
	);
};

export const getRecommendationAPI = (token: string, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<IlistProfiles[]>(
		constants.URL + constants.URI_GET_RECOMMENDATIONS,
		{
			method: constants.GET_METHOD,
			headers: headers,
			credentials: "include",
			signal: signal,
		}
	);
};

export const getMatchesAPI = (token: string, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<IlistProfiles[]>(constants.URL + constants.URI_GET_MATCHES, {
		method: constants.GET_METHOD,
		headers: headers,
		credentials: "include",
		signal: signal,
	});
};

export const getAllProfilesAPI = (token: string, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<IlistProfiles[]>(
		constants.URL + constants.URI_GET_ALL_PROFILES,
		{
			method: constants.GET_METHOD,
			headers: headers,
			credentials: "include",
			signal: signal,
		}
	);
};

export const getNotificationsAPI = (token: string, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<any[]>(constants.URL + constants.URI_GET_NOTIFICATIONS, {
		method: constants.GET_METHOD,
		headers: headers,
		credentials: "include",
		signal: signal,
	});
};

export const readNotificationAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<IlistProfiles[]>(
		constants.URL + constants.URI_READ_NOTIFICATION,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
			credentials: "include",
			signal: signal,
		}
	);
};

export const deleteNotificationAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<IlistProfiles[]>(
		constants.URL + constants.URI_DELETE_NOTIFICATION,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
			credentials: "include",
			signal: signal,
		}
	);
};

export const modifyEmailAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_UPDATE_EMAIL, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const modifyPasswordAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_MODIFY_PASSWORD,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
			credentials: "include",
			signal: signal,
		}
	);
};

export const resetPasswordAPI = (details: Object, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");

	return fetchApi<string>(constants.URL + constants.URI_RESET_PASSWORD, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		signal: signal,
	});
};

export const postPicturesAPI = (
	details: FormData,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_POST_PICTURES, {
		method: constants.POST_METHOD,
		headers: headers,
		body: details,
		credentials: "include",
		signal: signal,
	});
};

export const createProfileAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_CREATE_PROFILE, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const updateProfileAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_UPDATE_PROFILE, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const postTagsAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<string[]>(constants.URL + constants.URI_POST_TAGS, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const activateAccountAPI = (details: Object, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");

	return fetchApi<{ user: Object; token: string }>(
		constants.URL + constants.URI_ACTIVATE_ACCOUNT,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
			signal: signal,
		}
	);
};

export const handleGeoLocationAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_HANDLE_GEOLOCATION, {
		method: constants.POST_METHOD,
		headers: headers,
		credentials: "include",
		body: JSON.stringify(details),
		signal: signal,
	});
};

export const handleUsageLocationAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_HANDLE_USAGELOCATION, {
		method: constants.POST_METHOD,
		headers: headers,
		credentials: "include",
		body: JSON.stringify(details),
		signal: signal,
	});
};

export const visitProfileAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_VISIT_PROFILE, {
		method: constants.POST_METHOD,
		headers: headers,
		credentials: "include",
		body: JSON.stringify(details),
		signal: signal,
	});
};

export const getProfileVisitsAPI = (token: string, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<Iprofile[]>(
		constants.URL + constants.URI_GET_PROFILE_VISITS,
		{
			method: constants.GET_METHOD,
			headers: headers,
			credentials: "include",
			signal: signal,
		}
	);
};

export const getProfileLikesAPI = (token: string, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<Iprofile[]>(constants.URL + constants.URI_GET_PROFILE_LIKES, {
		method: constants.GET_METHOD,
		headers: headers,
		credentials: "include",
		signal: signal,
	});
};

export const getLikeStatusAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<{ iLike: boolean; heLike: boolean }>(
		constants.URL + constants.URI_GET_LIKE_STATUS,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
			credentials: "include",
			signal: signal,
		}
	);
};

export const likeProfileAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_LIKE_PROFILE, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const unlikeProfileAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_UNLIKE_PROFILE, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const blacklistProfileAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_BLACKLIST_PROFILE, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const reportProfileAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_REPORT_PROFILE, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const deleteBlacklistProfileAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi(constants.URL + constants.URI_DELETE_BLACKLIST_PROFILE, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};

export const getBlackListAPI = (token: string, signal?: AbortSignal) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<string[]>(constants.URL + constants.URI_GET_BLACKLIST, {
		method: constants.GET_METHOD,
		headers: headers,
		credentials: "include",
		signal: signal,
	});
};

export const getTagAutocompleteAPI = (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<string[]>(
		constants.URL + constants.URI_GET_TAG_AUTOCOMPLETE,
		{
			method: constants.POST_METHOD,
			headers: headers,
			body: JSON.stringify(details),
			credentials: "include",
			signal: signal,
		}
	);
};

const createAddressFromBody = (body: any): any[] | null => {
	if (body && body.results.length) {
		let filtered: any[] = body.results.filter(
			(entry: any) => entry && entry.address
		);
		filtered = filtered
			.filter(
				(entry) =>
					entry.entityType === "PostalCodeArea" ||
					entry.entityType === "Municipality"
			)
			.map((entry: any) => {
				const { address, position } = entry;
				return {
					city: address.municipality.split(",")[0] || null,
					countryCode: address.countryCode || null,
					postCode: address.postalCode || null,
					country: address.country || null,
					isFromGeolocation: false,
					lat: (position && position.lat) || null,
					lng: (position && position.lon) || null,
				};
			});
		return filtered;
	}
	return null;
};

export const autocompleteLocationAPI = async (
	input: string,
	signal?: AbortSignal
) => {
	return fetchApi<any[]>(
		constants.URI_AUTOCOMPLETE_API +
			encodeURIComponent(input) +
			".json?key=" +
			constants.TOMTOM_API_KEY +
			"&language=fr-FR&typeahead=true&countrySet=FR&idxSet=Geo%2CAddr%2CPAD&limit=3&extendedPostalCodesFor=Geo%2CAddr%2CPAD",
		{
			method: constants.GET_METHOD,
			signal: signal,
		}
	)
		.then((json: any[]) => {
			return createAddressFromBody(json);
		})
		.catch((error) => console.log(error));
};

export const getMessageAPI = async (
	details: Object,
	token: string,
	signal?: AbortSignal
) => {
	let headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("token", token);

	return fetchApi<any[]>(constants.URL + constants.URI_GET_CHAT_MESSAGE, {
		method: constants.POST_METHOD,
		headers: headers,
		body: JSON.stringify(details),
		credentials: "include",
		signal: signal,
	});
};
