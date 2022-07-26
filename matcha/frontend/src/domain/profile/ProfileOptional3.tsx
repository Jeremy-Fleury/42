/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ProfileOptional3.tsx                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/04 15:21:51 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/25 15:48:38 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { connect, ConnectedProps } from "react-redux";
import { autocompleteLocationAPI } from "../../services/apiCalls";
import { Iaddress, Iprofile } from "../../types/types";
import { throttle } from "lodash";
import { errorHandling, hasOwnProperty } from "../../services/profileUtils";

const withReduxProps = connect((state: any) => ({
	currentGeolocation: state.user.currentGeolocation,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setDisabled?: (value: React.SetStateAction<boolean>) => void;
	usageLocation: Iaddress;
	setUsageLocation: React.Dispatch<React.SetStateAction<Iaddress>>;
	profile: Iprofile;
	setProfile: React.Dispatch<React.SetStateAction<Iprofile>>;
} & ReduxProps;

function ProfileOptional3Component(props: Props) {
	const [options, setOptions] = useState<(Iaddress | Object | null)[] | null>([
		{},
	]);
	const [input, setInput] = useState("");
	const controller = new AbortController();
	const ref = useRef(options);
	const [wait, setWait] = useState(true);

	const updateOptions = (newOptions: (Iaddress | {} | null)[]) => {
		if (typeof newOptions === "object" && newOptions !== null) {
			ref.current = newOptions;
			setOptions(newOptions);
		}
	};

	useEffect(() => {
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let isMounted = true;

		if (
			isMounted &&
			Object.keys(props.usageLocation).length !== 0 &&
			props.usageLocation.city !== null
		) {
			props.setDisabled && props.setDisabled(false);
			let tmp = ref && ref.current && [...ref.current];
			if (tmp !== null) {
				tmp = tmp.filter((address) => {
					if (address && hasOwnProperty(address, "postCode")) {
						return address.postCode !== props.usageLocation?.postCode;
					}
					return true;
				});
				tmp.push(props.usageLocation);
				if (isMounted) {
					updateOptions(tmp);
				}
			}
		}
		let timeout = setTimeout(() => {
			if (isMounted) {
				setWait(false);
			}
		}, 1000);
		return () => {
			isMounted = false;
			clearTimeout(timeout);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.usageLocation]);

	useEffect(() => {
		let isMounted = true;

		if (
			props.currentGeolocation &&
			isMounted &&
			props.currentGeolocation.postCode !== props.usageLocation?.postCode
		) {
			let tmp = ref && ref.current && [...ref.current];
			if (tmp === null) {
				return () => {
					isMounted = false;
				};
			}
			tmp = tmp.filter((address) => {
				if (address && hasOwnProperty(address, "postCode")) {
					return address.isFromGeolocation === false;
				}
				return true;
			});
			tmp.unshift(props.currentGeolocation);
			if (isMounted) {
				updateOptions(tmp);
			}
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.currentGeolocation]);

	const autocomplete = async (input: string, obj: { isMounted: boolean }) => {
		autocompleteLocationAPI(input, controller.signal)
			.then((address) => {
				if (address) {
					address = address.filter(
						(memberAddress) => memberAddress.isFromGeolocation === false
					);
					address.unshift(props.currentGeolocation);
					address.unshift({});
					if (obj.isMounted) {
						updateOptions(address);
					}
				}
			})
			.catch((error) => errorHandling(error, props.dispatch));
	};

	const throttledAutocomplete = throttle(autocomplete, 1100);
	const MemoizedThrottledAutocomplete = useCallback(throttledAutocomplete, []);

	useEffect(() => {
		let obj = { isMounted: true };
		if (input !== "" && !wait && obj.isMounted) {
			MemoizedThrottledAutocomplete(input, obj);
		}
		return () => {
			obj.isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input]);

	const handleInputChange = (
		event: React.ChangeEvent<{}>,
		newInputValue: string
	) => {
		setInput(newInputValue);
	};

	function handleValueChange(e: React.ChangeEvent<{}>, newValue: Iaddress) {
		Object.keys(newValue).length !== 0 && props.setUsageLocation(newValue);
	}

	function getOptionLabel(option: Iaddress | {}) {
		if (
			option !== {} &&
			hasOwnProperty(option, "city") &&
			option.city !== null &&
			hasOwnProperty(option, "postCode") &&
			option.postCode !== null &&
			hasOwnProperty(option, "country") &&
			option.country !== null
		) {
			return option.city + ", " + option.postCode + ", " + option.country;
		} else if (
			option !== {} &&
			hasOwnProperty(option, "city") &&
			option.city !== null &&
			hasOwnProperty(option, "country") &&
			option.country !== null
		) {
			return option.city + ", " + option.country;
		}
		return "";
	}

	function getOptionIcon(option: Iaddress) {
		if (option) {
			return option.isFromGeolocation ? (
				<MyLocationIcon style={{ color: "#16F02D" }} />
			) : (
				<LocationOnIcon />
			);
		}
		return null;
	}

	function renderOption(option: Iaddress | {}) {
		if (
			option === null ||
			option === undefined ||
			Object.keys(option).length === 0
		) {
			return <div style={{ display: "none" }}></div>;
		}
		return (
			<Grid container justify="center" alignItems="center" wrap="nowrap">
				<Grid item container xs={2}>
					{getOptionIcon(option as Iaddress)}
				</Grid>
				<Grid item xs={10}>
					<Typography noWrap>
						{option !== {}
							? hasOwnProperty(option, "isFromGeolocation") &&
							  option.isFromGeolocation
								? "Use my location"
								: hasOwnProperty(option, "postCode") && option.postCode !== null
								? option.city + ", " + option.postCode + ", " + option.country
								: hasOwnProperty(option, "city") &&
								  option.city + ", " + option.country
							: null}
					</Typography>
				</Grid>
			</Grid>
		);
	}

	const renderInput = (params: AutocompleteRenderInputParams) => (
		<TextField {...params} label="Location" variant="filled" margin="dense" />
	);

	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography color="primary">City and PostCode</Typography>
			</Grid>
			<Grid item xs={12} container direction="row" alignItems="center">
				<Grid item xs={12}>
					{options && (
						<Autocomplete
							filterOptions={(x) => x}
							blurOnSelect
							autoComplete
							autoHighlight
							fullWidth
							options={options.filter((item: any) => item != null) as any}
							value={props.usageLocation}
							onChange={handleValueChange as any}
							onInputChange={handleInputChange}
							getOptionSelected={(option, value) => true}
							getOptionLabel={getOptionLabel}
							renderOption={renderOption}
							renderInput={renderInput}
							disableClearable
						></Autocomplete>
					)}
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export const ProfileOptional3 = withReduxProps(ProfileOptional3Component);
