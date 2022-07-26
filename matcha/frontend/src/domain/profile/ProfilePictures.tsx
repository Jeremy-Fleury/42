/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfilePictures.tsx                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/14 13:31:30 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/28 14:33:35 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from "react";
import { CustomAvatar } from "../../component/CustomAvatar";
import { AvatarGroup } from "@material-ui/lab";

type Props = {
	imgs: (string | null)[];
	setImgs?: React.Dispatch<React.SetStateAction<(string | null)[]>>;
	modifiable: boolean;
	username: string;
};

export const ProfilePictures = (props: Props) => {
	function handleChangeImg(e: React.ChangeEvent<HTMLInputElement>) {
		if (props.modifiable) {
			const { name, files } = e.currentTarget;
			const img = files && files[0] && URL.createObjectURL(files[0]);
			const tmpImgs = [...props.imgs];
			tmpImgs[parseInt(name)] = img;
			props.setImgs && props.setImgs(tmpImgs);
		}
		return;
	}

	const images = props.imgs.map((img, index) => {
		const path =
			"http://localhost:3001/images/" +
			props.username +
			"img" +
			index +
			"?q=" +
			Math.floor(Math.random() * 1000);
		return (
			<CustomAvatar
				key={"img" + index}
				id={index}
				src={img || path}
				handleChange={props.modifiable ? handleChangeImg : undefined}
				modifiable={props.modifiable}
			/>
		);
	});

	return <AvatarGroup>{images}</AvatarGroup>;
};
