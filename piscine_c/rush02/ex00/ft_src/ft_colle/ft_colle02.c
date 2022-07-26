/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_colle02.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: justasze <justasze@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/18 12:59:29 by mdaoud            #+#    #+#             */
/*   Updated: 2018/08/19 22:56:53 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../ft_lib.h"

void	init_arrays02(char corners[], char spacers[])
{
	corners[0] = 'A';
	corners[1] = 'A';
	corners[2] = 'C';
	corners[3] = 'C';
	spacers[0] = 'B';
	spacers[1] = 'B';
	spacers[2] = ' ';
}

char	*colle02(int col, int row)
{
	int		line;
	char	corners[4];
	char	spacers[3];
	char	*colle;

	if (col <= 0 || row <= 0)
		return (NULL);
	if (!(colle = malloc(sizeof(char) * ((col + 1) * row + 1))))
		return (0);
	init_arrays02(corners, spacers);
	ft_bzero(colle, ((col + 1) * row + 1));
	colle = ft_strjoin(colle, ft_gen_line(corners[0],
			spacers[0], corners[1], col));
	line = 1;
	while (line < row - 1)
	{
		colle = ft_strjoin(colle, ft_gen_line(spacers[1],
				spacers[2], spacers[1], col));
		line++;
	}
	if (row > 1)
		colle = ft_strjoin(colle, ft_gen_line(corners[2],
				spacers[0], corners[3], col));
	return (colle);
}
