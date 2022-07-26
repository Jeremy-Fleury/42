/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   rush00.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mdaoud <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/05 14:42:23 by cgiron            #+#    #+#             */
/*   Updated: 2018/08/19 12:35:38 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../ft_lib.h"

void	init_arrays(char corners[], char spacers[])
{
	corners[0] = 'o';
	corners[1] = 'o';
	corners[2] = 'o';
	corners[3] = 'o';
	spacers[0] = '-';
	spacers[1] = '|';
	spacers[2] = ' ';
}

void	ft_line(char lst, char lnc, char le, int x)
{
	int col;

	col = 1;
	ft_putchar(lst);
	while (col < x - 1)
	{
		ft_putchar(lnc);
		col++;
	}
	if (x > 1)
		ft_putchar(le);
	ft_putchar('\n');
}

void	rush(int x, int y)
{
	int		line;
	char	corners[4];
	char	spacers[3];

	if (x <= 0 || y <= 0)
		return ;
	init_arrays(corners, spacers);
	ft_line(corners[0], spacers[0], corners[1], x);
	line = 1;
	while (line < y - 1)
	{
		ft_line(spacers[1], spacers[2], spacers[1], x);
		line++;
	}
	if (y > 1)
		ft_line(corners[2], spacers[0], corners[3], x);
}
