/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   BaseProfileFormContent.tsx                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/08 14:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2020/12/11 15:55:33 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { Iprofile } from "../../types/types";

type Props = {
	profile: Iprofile;
	setProfile:
		| React.Dispatch<React.SetStateAction<Iprofile>>
		| React.Dispatch<React.SetStateAction<Iprofile>>;
	setDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
	dynamicUsername: boolean;
};

export function BaseProfileFormContent(props: Props) {
	const [errorUsername, setErrorUsername] = useState(false);
	const [errorFirstname, setErrorFirstname] = useState(false);
	const [errorLastname, setErrorLastname] = useState(false);
	const [errorDob, setErrorDob] = useState(false);
	const date = new Date();

	const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setProfile({ ...props.profile, [e.target.name]: e.target.value });
		setErrorUsername(!e.target.value);
	};

	const handleChangeLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setProfile({ ...props.profile, [e.target.name]: e.target.value });
		setErrorLastname(!e.target.value);
	};

	const handleChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setProfile({ ...props.profile, [e.target.name]: e.target.value });
		setErrorFirstname(!e.target.value);
	};

	function handleChangeDob(date: Date | null) {
		props.setProfile({ ...props.profile, dob: date ? date.valueOf() : null });
		setErrorDob(!date);
	}

	function shouldBeDisabled() {
		return !(
			props.profile.username &&
			props.profile.firstname &&
			props.profile.lastname &&
			props.profile.dob
		);
	}

	useEffect(() => {
		props.setDisabled && props.setDisabled(shouldBeDisabled());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.profile]);

	return (
		<React.Fragment>
			{props.dynamicUsername ? (
				<TextField
					label="Username"
					variant="filled"
					margin="dense"
					fullWidth
					name="username"
					value={props.profile && props.profile.username}
					onChange={handleChangeUsername}
					required
					error={errorUsername}
					inputProps={{ maxLength: 16 }}
				/>
			) : (
				<Typography>{"Username: " + props.profile.username}</Typography>
			)}

			<TextField
				label="First Name"
				variant="filled"
				margin="dense"
				fullWidth
				name="firstname"
				value={props.profile && props.profile.firstname}
				onChange={handleChangeFirstname}
				required
				error={errorFirstname}
				inputProps={{ maxLength: 26 }}
			/>
			<TextField
				label="Last Name"
				variant="filled"
				margin="dense"
				fullWidth
				name="lastname"
				value={props.profile && props.profile.lastname}
				onChange={handleChangeLastname}
				required
				error={errorLastname}
				inputProps={{ maxLength: 26 }}
			/>
			<DatePicker
				views={["year", "month", "date"]}
				margin="normal"
				label="Date of birth"
				value={props.profile.dob ? new Date(props.profile.dob) : null}
				onChange={handleChangeDob}
				fullWidth
				disableFuture
				minDate={new Date("1950-01-01")}
				maxDate={date.setFullYear(date.getFullYear() - 17)}
				openTo="year"
				required
				error={errorDob}
				clearable
			/>
		</React.Fragment>
	);
}
