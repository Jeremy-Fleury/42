/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatLine.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/22 11:02:15 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/06 12:44:38 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";

import { Iprofile } from "../../types/types";

interface Props {
	lineItem: {
		username: string;
		message: string;
		timestamp: number;
	};
	userProfile: Iprofile;
}

const ChatLineComponent = (props: Props) => {
	if (props.lineItem.username === props.userProfile.username) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					marginRight: 5,
					margin: 5,
					fontFamily: "Roboto",
					color: "white",
					flexDirection: "column",
					overflowAnchor: "auto",
				}}
			>
				<div
					style={{
						display: "flex",
						backgroundColor: "#3e50b5",
						borderRadius: 16,
						paddingTop: 5,
						paddingBottom: 5,
						paddingLeft: 10,
						paddingRight: 10,
						fontSize: 15,
					}}
				>
					{props.lineItem.message}
				</div>
				<div
					style={{
						marginRight: 10,
						marginTop: 2,
						color: "black",
						fontSize: 8,
						textAlign: "end",
					}}
				>
					{new Date(props.lineItem.timestamp).getHours() +
						":" +
						new Date(props.lineItem.timestamp).getMinutes()}
				</div>
			</div>
		);
	} else {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					marginRight: 5,
					margin: 5,
					fontFamily: "Roboto",
					color: "black",
					flexDirection: "column",
					overflowAnchor: "auto",
				}}
			>
				<div
					style={{
						display: "flex",
						backgroundColor: "lightGrey",
						borderRadius: 16,
						paddingTop: 5,
						paddingBottom: 5,
						paddingLeft: 10,
						paddingRight: 10,
						fontSize: 15,
					}}
				>
					{props.lineItem.message}
				</div>
				<div
					style={{
						marginLeft: 10,
						marginTop: 2,
						color: "black",
						fontSize: 8,
						textAlign: "start",
					}}
				>
					{new Date(props.lineItem.timestamp).getHours() +
						":" +
						new Date(props.lineItem.timestamp).getMinutes()}
				</div>
			</div>
		);
	}
};

export const ChatLine = ChatLineComponent;
