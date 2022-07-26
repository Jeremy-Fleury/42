/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional2.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 17:49:54 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/11 15:14:11 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { ProfilePictures } from "./ProfilePictures";
import { connect, ConnectedProps } from "react-redux";
import { TagSearch } from "../../component/TagSearch";
import { Iprofile } from "../../types/types";
import { profileHasImages } from "../../services/profileUtils";

const withReduxProps = connect((state: any) => ({
	isLoggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setDisabled?: (value: React.SetStateAction<boolean>) => void;
	imgs: (string | null)[];
	setImgs: React.Dispatch<React.SetStateAction<(string | null)[]>>;
	profile: Iprofile;
	tagList: string[];
	setTagList: React.Dispatch<React.SetStateAction<string[]>>;
} & ReduxProps;

function ProfileOptional2Component(props: Props) {
	function handleChangeTags(
		e: React.ChangeEvent<{}>,
		value: string | string[],
		reason: string
	) {
		let tags = typeof value === "string" ? [value] : value;
		props.setTagList(tags);
	}

	function profileHasTags() {
		return !(!props.tagList || props.tagList.length === 0);
	}

	useEffect(() => {
		let isMounted = true;
		if (isMounted && props.setDisabled) {
			if (
				profileHasTags() &&
				props.profile.bio &&
				props.imgs &&
				profileHasImages(props.imgs)
			) {
				props.setDisabled(false);
			} else {
				props.setDisabled(true);
			}
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.tagList, props.profile.bio, props.imgs]);

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<ProfilePictures
					imgs={props.imgs}
					setImgs={props.setImgs}
					modifiable
					username={props.profile.username}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography color="primary">About you</Typography>
			</Grid>
			<Grid item xs={12}>
				<TextField
					variant="filled"
					margin="dense"
					label="Bio"
					name="bio"
					value={props.profile.bio || ""}
					onChange={props.handleChange}
					fullWidth
					multiline
					inputProps={{ maxLength: 256 }}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography color="primary">List some of your interests</Typography>
			</Grid>
			<Grid item xs={12}>
				<TagSearch
					handleChangeTags={handleChangeTags}
					tagList={props.tagList}
				/>
			</Grid>
		</React.Fragment>
	);
}

export const ProfileOptional2 = withReduxProps(ProfileOptional2Component);
