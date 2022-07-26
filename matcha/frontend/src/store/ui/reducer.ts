/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/09 15:48:13 by allefebv          #+#    #+#             */
/*   Updated: 2020/10/09 18:24:45 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AnyAction } from "redux";
import { actionUi_clearSnackbar, actionUi_showSnackbar } from "./action";
import { getType } from "typesafe-actions";

const initialState = {
	snackbarOpen: false,
	snackbarMessage: null,
	snackbarType: "success",
};

export function uiReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case getType(actionUi_showSnackbar):
			return {
				...state,
				snackbarOpen: true,
				snackbarMessage: action.payload.message,
				snackbarType: action.payload.type,
			};
		case getType(actionUi_clearSnackbar):
			return {
				...state,
				snackbarOpen: false,
				snackbarMessage: null,
				snackbarType: "success",
			};
		default:
			return state;
	}
}
