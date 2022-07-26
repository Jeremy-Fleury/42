/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ReportProfileDialog.tsx                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/09/24 14:19:10 by allefebv          #+#    #+#             */
/*   Updated: 2021/01/15 15:20:10 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import * as constants from "../../services/constants";
import { reportProfileAPI } from "../../services/apiCalls";
import { actionUi_showSnackbar } from "../../store/ui/action";
import { CircularProgress } from "@material-ui/core";
import { errorHandling } from "../../services/profileUtils";

const withReduxProps = connect((state: any) => ({
	loggedIn: state.user.isLoggedIn,
}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
	username: string;
} & ReduxProps;

function ReportProfileDialogComponent(props: Props) {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [messageError, setMessageError] = useState(false);
	const [isReportLoading, setIsReportLoading] = useState(false);
	const controller = new AbortController();

	useEffect(() => {
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setMessageError(false);
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	async function handleReport() {
		const body = {
			username: props.username,
			message: message,
		};
		setIsReportLoading(true);
		reportProfileAPI(body, props.loggedIn, controller.signal)
			.then(() => {
				props.dispatch(
					actionUi_showSnackbar({
						message: "Your report has been sent successfully",
						type: "success",
					})
				);
				setIsReportLoading(false);
				setMessage("");
				handleClose();
			})
			.catch((error) => {
				errorHandling(error, props.dispatch);
				if (error.message !== "canceled") {
					setIsReportLoading(false);
				}
			});
	}

	function handleMessage(e: React.ChangeEvent<HTMLInputElement>) {
		setMessage(e.currentTarget.value);
		setMessageError(e.currentTarget.value === "");
	}

	return (
		<div>
			<Button fullWidth variant="outlined" onClick={handleClickOpen}>
				REPORT
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Report user</DialogTitle>
					<DialogContent>
						<TextField
							margin="dense"
							label="Report Reason"
							variant="filled"
							fullWidth
							multiline
							value={message}
							onChange={handleMessage}
							error={messageError}
							helperText={messageError && constants.EMPTY_ERROR}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={handleReport}
							type="submit"
							color="primary"
							disabled={message === "" || isReportLoading}
							startIcon={isReportLoading ? <CircularProgress /> : null}
						>
							Report
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export const ReportProfileDialog = withReduxProps(ReportProfileDialogComponent);
