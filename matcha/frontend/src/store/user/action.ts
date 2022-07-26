/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/21 12:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/28 18:35:16 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Iaddress, user } from "../../types/types";
import { createAction } from "typesafe-actions";

export const actionUser_signin = createAction("USER.USERSIGNIN")<{
	user: user | null;
	token: string | null;
}>();

export const actionUser_signup = createAction("USER.USERSIGNUP")<{
	user: user | null;
	token: string | null;
}>();

export const actionUser_activate = createAction("USER.USERACTIVATE")<{
	token: string | null;
}>();

export const actionUser_setProfile = createAction("USER.SETPROFILE")<{
	profile: any;
}>();

export const actionUser_logout = createAction("USER.USERLOGOUT")();

export const actionUser_geolocation = createAction("USER.USERGEOLOCATION")<{
	geolocation: Iaddress;
}>();

export const actionUser_usagelocation = createAction("USER.USERUSAGELOCATION")<{
	usagelocation: any;
}>();

export const actionUser_setTagList = createAction("USER.SETTAGLIST")<{
	tagList: string[];
}>();

export const actionUser_setBlackList = createAction("USER.SETBLACKLIST")<{
	blackList: string[];
}>();

export const actionUser_setImages = createAction("USER.SETIMAGES")<{
	imgs: (string | null)[];
}>();
