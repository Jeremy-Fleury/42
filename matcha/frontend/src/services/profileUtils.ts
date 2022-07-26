/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profileUtils.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/05 17:29:13 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/29 11:54:28 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
	actionProfilesList_getMatches,
	actionProfilesList_getRecco,
	actionProfilesList_getSearch,
} from "../store/profilesLists/action";
import { actionUi_showSnackbar } from "../store/ui/action";
import {
	actionUser_setImages,
	actionUser_setProfile,
	actionUser_setTagList,
	actionUser_usagelocation,
} from "../store/user/action";
import { Iaddress, Iprofile } from "../types/types";
import {
	createProfileAPI,
	getAllProfilesAPI,
	getMatchesAPI,
	getProfileAPI,
	getRecommendationAPI,
	handleUsageLocationAPI,
	postPicturesAPI,
	postTagsAPI,
	updateProfileAPI,
} from "./apiCalls";

export const getProfileLevel = (
	profile: Iprofile,
	location: Iaddress | null,
	tagList: string[],
	imgs?: string[]
) => {
	if (
		!profile ||
		!profile.username ||
		!profile.firstname ||
		!profile.lastname ||
		!profile.dob
	) {
		return 0;
	} else if (
		!profile.gender ||
		!profile.sexualOrientation ||
		!profile.bio ||
		!location ||
		!tagList ||
		tagList.length === 0 ||
		(imgs && !profileHasImages(imgs))
	) {
		return 1;
	} else {
		return 2;
	}
};

export const isProfileEmpty = (
	profile: Iprofile,
	location: Iaddress,
	tagList: string[]
) => {
	return getProfileLevel(profile, location, tagList) === 0;
};

export const isProfileBase = (
	profile: Iprofile,
	location: Iaddress,
	tagList: string[]
) => {
	return getProfileLevel(profile, location, tagList) === 1;
};

export const isProfileComplete = (
	profile: Iprofile,
	location: Iaddress,
	tagList: string[],
	imgs: string[]
) => {
	return getProfileLevel(profile, location, tagList, imgs) === 2;
};

export const getAge = (dob: number) => {
	const diff = Date.now() - new Date(dob).getTime();
	const age = new Date(diff);
	return Math.abs(age.getUTCFullYear() - 1970);
};

export const submitPictures = async (
	imgs: (string | null)[],
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	const data = new FormData();
	await Promise.all(
		imgs.map(async (img, index) => {
			if (img !== null && img.search("3001") === -1) {
				await fetch(img)
					.then((response) => response.blob())
					.then((blob) => {
						data.append(
							"img" + index,
							new File([blob], "img" + index, {
								type: "image/jpg",
							})
						);
					});
			}
		})
	);

	if (imgs.some((img) => img !== null)) {
		return postPicturesAPI(data, token)
			.then(() => {
				getProfileAPI(token)
					.then((profile) => {
						if (profile.imgs.length) {
							profile.imgs = profile.imgs.map((img) => {
								if (img !== null) {
									return img + "?d=" + Math.floor(Math.random() * 1000);
								}
								return img;
							});
						}
						dispatch(actionUser_setImages({ imgs: profile.imgs }));
					})
					.catch(() => {});
			})
			.catch(() => {});
	}
};

export const updateProfile = async (
	profile: Iprofile,
	token: string,
	dispatch: Dispatch<AnyAction>,
	isProfileComplete: boolean
) => {
	return updateProfileAPI(profile, token)
		.then((json: any) => {
			dispatch(actionUser_setProfile({ profile: json }));
			getSearchList(token, dispatch);
			isProfileComplete && getRecommendationList(token, dispatch);
			dispatch(
				actionUi_showSnackbar({
					message: "Your profile has been updated",
					type: "success",
				})
			);
		})
		.catch(() => {});
};

export const createProfile = async (
	profile: Iprofile,
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	const {
		geoLocationAuthorization,
		gender,
		sexualOrientation,
		bio,
		...rest
	} = profile;
	return createProfileAPI(rest, token)
		.then((json: any) => {
			dispatch(actionUser_setProfile({ profile: json }));
			dispatch(
				actionUi_showSnackbar({
					message: "Your profile has been created",
					type: "success",
				})
			);
		})
		.catch(() => {
			dispatch(
				actionUi_showSnackbar({
					message: "username already in use",
					type: "error",
				})
			);
		});
};

export const submitTags = async (
	tags: string[],
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	return postTagsAPI({ tagList: [...tags] }, token)
		.then((tagList) => {
			dispatch(actionUser_setTagList({ tagList: tagList }));
		})
		.catch(() => {});
};

export const submitUsageLocation = async (
	location: Iaddress,
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	return handleUsageLocationAPI(location, token)
		.then((response) => {
			dispatch(actionUser_usagelocation({ usagelocation: response }));
			getSearchList(token, dispatch);
			getRecommendationList(token, dispatch);
		})
		.catch(() => {});
};

export const profileHasImages = (imgs: (null | string)[]) => {
	return imgs.some((x) => x !== null);
};

export const getSearchList = (token: string, dispatch: Dispatch<AnyAction>) => {
	getAllProfilesAPI(token)
		.then((json) => {
			if (json && json.length) {
				const withAge = json.map((entry) => {
					entry.profile.age = entry.profile.dob
						? getAge(entry.profile.dob)
						: null;
					return entry;
				});
				dispatch(actionProfilesList_getSearch({ profiles: withAge }));
			}
		})
		.catch(() => {});
};

export const getRecommendationList = (
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	getRecommendationAPI(token)
		.then((json) => {
			if (json && json.length) {
				const withAge = json.map((entry) => {
					if (entry.profile.dob) {
						entry.profile.age = entry.profile.dob
							? getAge(entry.profile.dob)
							: null;
					}
					return entry;
				});
				dispatch(actionProfilesList_getRecco({ profiles: withAge }));
			}
		})
		.catch(() => {});
};

export const isProfileBlacklisted = (
	blacklistUsernames: string[],
	username: string
) => {
	return blacklistUsernames.some(
		(blacklistUsername) => blacklistUsername === username
	);
};

export const errorHandling = (error: Error, dispatch: Dispatch<AnyAction>) => {
	if (
		error.message !== "timeout" &&
		error.message !== "canceled" &&
		error.message !== "The user aborted a request."
	) {
		dispatch(
			actionUi_showSnackbar({
				message: error.message,
				type: "error",
			})
		);
		console.log(error.message);
	}
};

export const hydrateReduxWithMatches = (
	token: string,
	dispatch: Dispatch<AnyAction>
) => {
	getMatchesAPI(token)
		.then((json) => {
			if (json) {
				const withAge = json.length
					? json.map((entry) => {
							entry.profile.age = entry.profile.dob
								? getAge(entry.profile.dob)
								: null;
							return entry;
					  })
					: null;
				dispatch(
					actionProfilesList_getMatches({
						profiles: withAge,
					})
				);
			}
		})
		.catch(() => {});
};

export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
	obj: X,
	prop: Y
): obj is X & Record<Y, unknown> {
	return obj.hasOwnProperty(prop);
}
