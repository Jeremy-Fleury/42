/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   chatListProfile.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:18:25 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/25 18:08:15 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	SwipeableDrawer,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import React, { useState } from "react";

import { IlistProfiles } from "../../types/types";
import { CustomAvatar } from "../CustomAvatar";

interface Props {
	profiles: IlistProfiles[];
	userSelect: IlistProfiles | null;
	setUserSelect: React.Dispatch<React.SetStateAction<IlistProfiles | null>>;
}

const drawerWidthMobile = "100%";
const drawerWidthDesktop = 200;

const useStyles = makeStyles((theme) => ({
	drawer: {
		zIndex: 0,
		width: drawerWidthDesktop,
		[theme.breakpoints.down("xs")]: {
			width: drawerWidthMobile,
		},
	},
	drawerPaper: {
		width: drawerWidthDesktop,
		[theme.breakpoints.down("xs")]: {
			width: drawerWidthMobile,
		},
	},
}));

const ChatListProfileComponent = (props: Props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<SwipeableDrawer
				open={open}
				onOpen={handleOpen}
				onClose={handleClose}
				variant={isMobile ? "temporary" : "permanent"}
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				{!isMobile ? (
					<Toolbar />
				) : (
					<Typography variant="button" color="primary" align="center">
						MATCHES
					</Typography>
				)}
				<List>
					{props.profiles.map((profile) => {
						return (
							<ListItem
								key={profile.profile.userId}
								onClick={() => {
									props.setUserSelect(profile);
									setOpen(false);
								}}
								style={{
									backgroundColor:
										profile.profile.username ===
										props.userSelect?.profile.username
											? "lightGrey"
											: "white",
								}}
							>
								<ListItemIcon>
									<CustomAvatar
										modifiable={false}
										src={
											"http://localhost:3001/images/" +
											profile.profile.username +
											"img0"
										}
										id={0}
									/>
								</ListItemIcon>
								<ListItemText primary={profile.profile.firstname} />
							</ListItem>
						);
					})}
				</List>
			</SwipeableDrawer>
		</React.Fragment>
	);
};

export const ChatListProfile = ChatListProfileComponent;
