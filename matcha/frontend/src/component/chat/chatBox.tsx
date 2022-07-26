/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatBox.tsx                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/15 15:16:24 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	Avatar,
	makeStyles,
	Paper,
	Typography,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import { socket } from "../../domain/root/App";
import { getMessageAPI } from "../../services/apiCalls";
import { errorHandling } from "../../services/profileUtils";
import { IlistProfiles, Iprofile } from "../../types/types";
import { ChatLine } from "./chatLine";

const withReduxProps = connect((state: any) => ({
	profile: state.user.profile,
	token: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	userProfile: Iprofile;
	userSelect: IlistProfiles | null;
	message: {
		sender: string;
		message: string;
		timestamp: number;
	} | null;
} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-end",
		backgroundColor: "white",
		marginTop: 64,
	},
	paper: {
		marginBottom: "auto",
		backgroundColor: theme.palette.secondary.main,
	},
}));

const ChatBoxComponent = (props: Props) => {
	const [input, setInput] = useState("");
	const [listMessage, setListMessage] = useState<
		{
			username: string;
			message: string;
			timestamp: number;
		}[]
	>([]);
	const controller = new AbortController();
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

	useEffect(() => {
		const chatScroll = document.getElementById("chatScroll");
		chatScroll && chatScroll.scrollIntoView(false);
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let isMounted = true;
		if (
			isMounted &&
			props.userSelect &&
			props.message &&
			props.userSelect.profile.username === props.message.sender
		) {
			const tmpList = [...listMessage];
			tmpList.push({
				username: props.userSelect.profile.username,
				message: props.message.message,
				timestamp: props.message.timestamp,
			});
			setListMessage(tmpList);
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.message]);

	useEffect(() => {
		let isMounted = true;
		isMounted && setListMessage([]);
		const details = {
			username1: props.profile.username,
			username2: props.userSelect?.profile.username,
		};
		getMessageAPI(details, props.token, controller.signal)
			.then((result) => {
				const listResult = result.map((item) => {
					return {
						username: item.sender,
						timestamp: parseInt(item.timestamp),
						message: item.message,
					};
				});
				isMounted && setListMessage(listResult);
			})
			.catch((error) => errorHandling(error, props.dispatch));
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.userSelect]);

	function handleInput(event: React.FormEvent<HTMLInputElement>) {
		setInput(event.currentTarget.value);
	}

	function handleSendButton() {
		if (input && input.length) {
			listMessage.push({
				username: props.userProfile.username,
				message: input,
				timestamp: Date.now(),
			});
			setInput("");
			socket.emit("chatMessage", {
				receiver: props.userSelect?.profile.username,
				sender: props.userProfile.username,
				timestamp: Date.now(),
				message: input,
			});
		}
	}

	return (
		<div className={classes.main} style={{}}>
			{isMobile && props.userSelect && (
				<Paper className={classes.paper}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexGrow: 1,
						}}
					>
						<Avatar
							src={
								"http://localhost:3001/images/" +
								props.userSelect.profile.username +
								"img0"
							}
						></Avatar>
						<Typography variant="body1">
							{props.userSelect.profile.firstname}
						</Typography>
					</div>
				</Paper>
			)}
			<div
				style={{
					overflowY: "scroll",
				}}
			>
				<div id={"chatScroll"}>
					{listMessage.map((item) => {
						return (
							<ChatLine
								key={item.timestamp + item.username}
								lineItem={item}
								userProfile={props.userProfile}
							/>
						);
					})}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					width: "100%",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<input
					type="text"
					style={{
						width: "100%",
						height: 50,
						borderRadius: 16,
						borderColor: "lightGrey",
						borderWidth: "1px",
						margin: 10,
						outline: "none",
						paddingLeft: 10,
					}}
					onChange={handleInput}
					placeholder={"Your message"}
					value={input}
					onKeyPress={(event) => {
						if (event.key === "Enter") handleSendButton();
					}}
				></input>
				<button
					style={{
						width: 100,
						height: 50,
						color: "black",
						marginTop: 10,
						marginBottom: 10,
						marginRight: 10,
						borderRadius: 16,
						outline: "none",
					}}
					onClick={handleSendButton}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export const ChatBox = withReduxProps(ChatBoxComponent);
