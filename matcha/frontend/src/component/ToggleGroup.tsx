/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ToggleGroup.tsx                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/23 18:11:34 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/31 16:39:50 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { connect, ConnectedProps } from 'react-redux';
import { isProfileComplete } from '../services/profileUtils';
import { ExtendedProfileDialog } from '../domain/profile/ExtendedProfileDialog';
import { makeStyles } from '@material-ui/core';

const withReduxProps = connect((state: any) => ({
	isProfileComplete: isProfileComplete(
		state.user.profile,
		state.user.usagelocation,
		state.user.tagList,
		state.user.imgs
	),
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	value: string | null;
	setValue: React.Dispatch<React.SetStateAction<string | null>>;
} & ReduxProps;

const useStyles = makeStyles((theme) => ({
	button: (isProfileComplete) => {
		return {
			color: isProfileComplete ? 'default' : theme.palette.error.main,
		};
	},
	color: {
		color: theme.palette.secondary.contrastText,
		backgroundColor: theme.palette.secondary.main,
	},
	toggleGroup: {
		display: 'flex',
		justifySelf: 'center',
		backgroundColor: theme.palette.primary.main,
	},
}));

function ToggleGroupComponent(props: Props) {
	const classes = useStyles(props.isProfileComplete);
	const [open, setOpen] = useState(false);

	function handleChangeToggle(
		e: React.MouseEvent<HTMLElement>,
		nextView: string
	) {
		if (nextView !== null) {
			if (nextView === 'Preselection' && !props.isProfileComplete) {
				setOpen(true);
				return;
			}
			props.setValue(nextView);
		}
	}

	return (
		<React.Fragment>
			<ExtendedProfileDialog open={open} setOpen={setOpen} />
			<ToggleButtonGroup
				style={{ margin: 10 }}
				orientation="horizontal"
				value={props.value}
				onChange={handleChangeToggle}
				exclusive
				className={classes.toggleGroup}
			>
				<ToggleButton
					className={classes.color}
					color="secondary"
					value="Matches"
				>
					Matches
				</ToggleButton>
				<ToggleButton
					classes={{
						root: classes.color,
					}}
					value="Preselection"
					className={classes.button}
				>
					Preselection
				</ToggleButton>
				<ToggleButton
					classes={{
						root: classes.color,
					}}
					value="Search"
				>
					Search
				</ToggleButton>
			</ToggleButtonGroup>
		</React.Fragment>
	);
}

export const ToggleGroup = withReduxProps(ToggleGroupComponent);
