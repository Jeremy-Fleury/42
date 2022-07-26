/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   handleNotifications.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/03 12:54:24 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/15 16:18:37 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { getProfileBlackList } from "../model/blackListRepositories";
import { profile } from "../../types/types";
import { io } from "../app";
import {
	addNotification,
	getLastNotification,
} from "../model/notificationRepositories";

export async function handleNotifications(
	type: string,
	notifierProfile: profile,
	notifiedProfile: profile
) {
	try {
		let blackList = await getProfileBlackList(notifiedProfile.userId);
		var isBlacklisted =
			blackList.length &&
			blackList.filter((username) => username === notifierProfile.username)
				.length !== 0;
	} catch (e) {
		console.log(e);
	}
	if (!isBlacklisted) {
		try {
			const notification = type + "," + notifierProfile.username;
			await addNotification(
				notifiedProfile.userId,
				notifierProfile.userId,
				notification
			);
			const notificationId = await getLastNotification(notifiedProfile.userId);
			io.emit("notification" + notifiedProfile.username, {
				notifierProfile: notifierProfile,
				notification: {
					id: notificationId,
					notification: notification,
					isRead: 0,
					date: Date.now(),
				},
			});
		} catch (e) {
			console.log(e);
		}
	}
}
