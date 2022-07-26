/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   likeStatus.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/03 12:54:24 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/29 11:58:52 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { deleteMessageNotifications } from "../model/notificationRepositories";
import { updatePopularityScore } from "../model/profileRepositories";
import { profile } from "../../types/types";
import { deleteLikedProfile, getStatueOfLike } from "../model/likeRepositories";
import { handleNotifications } from "./handleNotifications";

export async function matchStatus(profileA: profile, profileB: profile) {
	const result = await getStatueOfLike(profileA.userId, profileB.userId);
	if (result.length === 2) {
		return true;
	}
	return false;
}

export async function likeStatus(profileA: profile, profileB: profile) {
	const result = await getStatueOfLike(profileA.userId, profileB.userId);
	if (result.length === 2) {
		return { iLike: true, heLike: true };
	} else if (result.length === 1) {
		if (result[0].profileLikesId === profileA.userId) {
			return { iLike: true, heLike: false };
		} else {
			return { iLike: false, heLike: true };
		}
	}
	return { iLike: false, heLike: false };
}

export async function deleteLike(hasLiked: profile, hasBeenLiked: profile) {
	const isMatch = await matchStatus(hasLiked, hasBeenLiked);
	if (isMatch) {
		await handleNotifications("unlike", hasLiked, hasBeenLiked);
	}
	await deleteLikedProfile(hasLiked.userId, hasBeenLiked.userId);
	await updatePopularityScore(
		hasBeenLiked.popularityScore - 5 < 0 ? 0 : hasBeenLiked.popularityScore - 5,
		hasBeenLiked.userId
	);
	await deleteMessageNotifications(hasLiked.userId, hasBeenLiked.userId);
}
