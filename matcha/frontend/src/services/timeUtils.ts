/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   timeUtils.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/07 16:45:32 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/07 16:46:38 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const getTimeElapsed = (date: number) => {
	const diff = Date.now() - date;
	const ms_Min = 60 * 1000;
	const ms_Hour = ms_Min * 60;
	const ms_Day = ms_Hour * 24;
	const ms_Mon = ms_Day * 30;
	const ms_Yr = ms_Day * 365;
	if (diff < ms_Min) {
		return "less than a minute ago";
	} else if (diff < ms_Hour) {
		return Math.round(diff / ms_Min) + " minutes ago";
	} else if (diff < ms_Day) {
		return Math.round(diff / ms_Hour) + " hours ago";
	} else if (diff < ms_Mon) {
		return Math.round(diff / ms_Day) + " days ago";
	} else if (diff < ms_Yr) {
		return Math.round(diff / ms_Mon) + " months ago";
	} else {
		return Math.round(diff / ms_Yr) + " years ago";
	}
};
