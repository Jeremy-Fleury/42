/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   messageController.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/23 12:29:58 by jfleury           #+#    #+#             */
/*   Updated: 2020/10/23 13:50:02 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Request, Response } from 'express';

import { getMessage } from '../model/messageRepositories';
import { jwtVerify } from '../services/validation/jwt';

export async function getMessageController(req: Request, res: Response) {
	try {
		const jwt = await jwtVerify(req.headers.token, res);

		const list = await getMessage(req.body.username1, req.body.username2);
		res.status(200).json(list);
	} catch (error) {
		res.status(error.code).send(error.message);
	}
}
