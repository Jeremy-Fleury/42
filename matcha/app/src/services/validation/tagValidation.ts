/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   tagValidation.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/10/15 15:18:18 by jfleury           #+#    #+#             */
/*   Updated: 2020/11/14 14:30:53 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export function getTagAutocompleteValidation(body: {
	partial: string;
	limit: string;
}) {
	return new Promise(async (resolve, reject) => {
		if (!body || !body.partial || !body.limit) {
			reject({ code: 400, message: 'Error: mandatory parameters are missing' });
		}
		if (
			!parseInt(body.limit) ||
			parseInt(body.limit) < 1 ||
			parseInt(body.limit) > 100
		) {
			reject({ code: 400, message: 'Error: limit invalid' });
		}
		resolve();
	});
}

export function addTagValidation(body: { tagList: string[] }) {
	return new Promise(async (resolve, reject) => {
		if (!body || !body.tagList) {
			reject({ code: 400, message: 'Error: mandatory parameters are missing' });
		}
		resolve();
	});
}
