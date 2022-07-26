/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.ts                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/13 19:07:30 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/31 08:04:08 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import { createConnection } from 'mysql';
import nodemailer from 'nodemailer';
import socketIo from 'socket.io';

import { router } from './router';
import { socketRouter } from './services/socket';

export let dataBase = null;

export const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	pool: true,
	secure: true,
	auth: {
		user: "project.matcha.42@gmail.com",
		pass: "@Matacha1234",
	},
});

function initMiddelware() {
	app.use(
		fileUpload({
			createParentPath: true,
		})
	);
	var corsOptions = {
		origin: "http://localhost:3000",
		optionsSuccessStatus: 200,
		credentials: true,
	};
	app.use(express.static("public", { extensions: ["png", "jpg", "jpeg"] }));
	app.use(cors(corsOptions));
	app.use(bodyParser.json());
	app.use(function (error, req, res, next) {
		if (error instanceof SyntaxError) {
			res.status(400).send("Error: JSON syntax");
		} else {
			next();
		}
	});
}

function initDatabase() {
	dataBase = createConnection({
		host: "fj199397-001.dbaas.ovh.net",
		port: 35833,
		user: "jfleury",
		database: "matcha",
		password: "Matcha1234",
	});
	dataBase.connect((error) => {
		if (error) {
			throw error;
		}
		console.log("\x1b[33m" + "Database connected\n" + "\x1b[0m");
	});
}

const app = express();
const server = http.createServer(app);
export const io = socketIo(server);
initMiddelware();
initDatabase();
router(app);
socketRouter();

server.listen(3001, () => {
	console.log(`Server started on port 3001`);
});
