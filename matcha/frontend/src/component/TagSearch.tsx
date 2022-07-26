/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   TagSearch.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/06 17:49:54 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/15 15:18:24 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { connect, ConnectedProps } from "react-redux";
import { getTagAutocompleteAPI } from "../services/apiCalls";
import { errorHandling } from "../services/profileUtils";

const withReduxProps = connect((state: any) => ({
	isLoggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	tagList: string[];
	handleChangeTags: (
		e: React.ChangeEvent<{}>,
		value: string | string[],
		reason: string
	) => void;
} & ReduxProps;

const TagSearchComponent = (props: Props) => {
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState<string[]>();
	const controller = new AbortController();

	useEffect(() => {
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		TagAutocomplete();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputValue]);

	function TagAutocomplete() {
		const details = {
			partial: inputValue,
			limit: 5,
		};
		if (!(inputValue === "")) {
			getTagAutocompleteAPI(details, props.isLoggedIn, controller.signal)
				.then((tagList) => {
					if (tagList.length) {
						setOptions(tagList);
					}
				})
				.catch((error) => errorHandling(error, props.dispatch));
		}
	}

	const handleInputChange = (
		event: React.ChangeEvent<{}>,
		newInputValue: string
	) => {
		setInputValue(newInputValue);
	};

	return (
		<Autocomplete
			multiple
			options={options || []}
			value={props.tagList}
			getOptionLabel={(option) => "#" + option}
			filterSelectedOptions
			onChange={props.handleChangeTags}
			onInputChange={handleInputChange}
			renderInput={(params) => <TextField {...params} fullWidth />}
			freeSolo
		/>
	);
};

export const TagSearch = withReduxProps(TagSearchComponent);
