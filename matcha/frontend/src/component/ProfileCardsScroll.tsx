/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileCardsScroll.tsx                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:05 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/12 12:49:55 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { InListProfileCard } from "./InListProfileCard";
import { Iprofile } from "../types/types";

const styleList: React.CSSProperties = {
	width: "100%",
	overflow: "scroll",
	overflowX: "hidden",
	maxHeight: "98%",
};

type Props = {
	list: Iprofile[] | undefined;
};

export function ProfileCardsScroll(props: Props) {
	const cards = props.list
		? props.list.map((profile) => (
				<ListItem key={profile.username}>
					<InListProfileCard profile={profile}></InListProfileCard>
				</ListItem>
		  ))
		: null;
	return <List style={styleList}>{cards}</List>;
}
