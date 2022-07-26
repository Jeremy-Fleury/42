/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   action.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/09 15:43:10 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/09 15:47:13 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { createAction } from "typesafe-actions";

export const actionUi_showSnackbar = createAction("UI.SHOWSNACKBAR")<{
	message: string;
	type: string;
}>();

export const actionUi_clearSnackbar = createAction("UI.CLEARSNACKBAR")();
