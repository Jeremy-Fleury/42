/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reducer.ts                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/09 15:48:13 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/08 16:09:54 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AnyAction } from "redux";
import {
	actionProfilesList_getRecco,
	actionProfilesList_getSearch,
	actionProfilesList_getMatches,
} from "./action";
import { getType } from "typesafe-actions";
import { IlistProfiles } from "../../types/types";

interface state {
	recommendations: null | IlistProfiles[];
	search: null | IlistProfiles[];
	matches: null | IlistProfiles[];
}

const initialState: state = {
	recommendations: null,
	search: null,
	matches: null,
};

export function profilesListReducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case getType(actionProfilesList_getRecco):
			return {
				...state,
				recommendations: action.payload.profiles,
			};
		case getType(actionProfilesList_getSearch):
			return {
				...state,
				search: action.payload.profiles,
			};
		case getType(actionProfilesList_getMatches):
			return {
				...state,
				matches: action.payload.profiles,
			};
		default:
			return state;
	}
}
