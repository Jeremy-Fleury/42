/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.tsx                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <allefebv@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/07 16:18:20 by allefebv          #+#    #+#             */
/*   Updated: 2020/11/12 12:57:18 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	CssBaseline,
	unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { App } from "./domain/root/App";
import * as serviceWorker from "./serviceWorker";
import { store, persistor } from "./store/store";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#9c27b0",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#ffc400",
			light: "#fff64f",
			contrastText: "#000000",
		},
	},
	overrides: {
		MuiCssBaseline: {
			"@global": {
				"*::-webkit-scrollbar": {
					width: "1em",
				},
				"*::-webkit-scrollbar-track": {
					"-webkit-box-shadow": "inset 0 0 5px rgb(10,10,0)",
				},
				"*::-webkit-scrollbar-thumb": {
					backgroundColor: "rgba(0,0,0,.2)",
				},
			},
		},
	},
	typography: {
		button: {
			fontStyle: "italic",
		},
		h6: {
			fontStyle: "italic",
			textTransform: "uppercase",
			color: "#9c27b0",
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<App />
					</PersistGate>
				</Provider>
			</MuiPickersUtilsProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
