/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 18:41:14 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/26 16:11:39 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HOW_MANY_CREATE_USER } from './src/const';
import {
	createLocation, createProfile, createTag, createUser
} from './src/create';
import { getApiRandonUser } from './src/getApi';

const download = require("image-downloader");
const fs = require("fs");

async function main() {
	const userApiList: any = await getApiRandonUser();

	const list = [];
	let i = 0;
	while (i < userApiList.results.length) {
		const infoApi = userApiList.results[i];
		const user = await createUser(infoApi.email);
		if (user) {
			const profile = await createProfile(infoApi, user.token);
			if (profile) {
				const options = {
					url: infoApi.picture.large,
					dest:
						"../../app/public/images/" + infoApi.login.username + "img0.jpg",
				};
				download
					.image(options)
					.then(({ filename }) => {})
					.catch((err) => console.error(err));
				const tag = await createTag(infoApi, user.token);
				const location = await createLocation(infoApi, user.token);
				const userProfile = {
					user: user.user,
					profile: profile,
					location: location,
					tag: tag,
				};
				list.push(userProfile);
			}
		}
		i++;
		console.log("user ", i, " / ", HOW_MANY_CREATE_USER);
	}
	fs.writeFile("userList.json", JSON.stringify(list), () => {
		console.log(`Finish ${list.length} user create`);
	});
}

main();
