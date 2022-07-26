/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_error.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/30 12:26:39 by jfleury           #+#    #+#             */
/*   Updated: 2018/12/03 12:41:07 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

int		ft_block_error(char *line)
{
	int			i;
	static int	j;
	static int	sharp;

	if (j % 5 == 4 && *line != '\0')
		return (0);
	if (j % 5 != 4 && *line == '\0')
		return (0);
	j++;
	i = 0;
	if (ft_strlen(line) != 4 && ft_strlen(line) != 0)
		return (0);
	while (line[i] != '\0')
	{
		if (line[i] == '#')
			sharp++;
		if (line[i] != '#' && line[i] != '.')
			return (0);
		i++;
	}
	if (sharp != 4 && j % 5 == 4)
		return (0);
	if (j % 5 == 4)
		sharp = 0;
	return (j);
}

int		ft_tetri_error(t_tetri *t)
{
	int	tb;
	int	tc;
	int	count;

	tb = 0;
	count = 0;
	while (tb <= 3)
	{
		tc = 0;
		while (tc <= 3)
		{
			if (tc == 3 && tb == 3)
				return (count);
			if (tc == tb)
				tc++;
			if (t->c[tb][0] == t->c[tc][0] || t->c[tb][1] == t->c[tc][1])
				if ((t->c[tb][0] == t->c[tc][0] + 1 ||
	t->c[tb][0] == t->c[tc][0] - 1) ||
	(t->c[tb][1] == t->c[tc][1] + 1 || t->c[tb][1] == t->c[tc][1] - 1))
					count++;
			tc++;
		}
		tb++;
	}
	return (count);
}
