/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fillit.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/22 14:26:04 by jfleury           #+#    #+#             */
/*   Updated: 2018/11/30 15:08:41 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

static void	ft_place_p(char **g, t_tetri **a, int yx[2])
{
	g[yx[0] + (*a)->c[0][0]][yx[1] + (*a)->c[0][1]] = '.';
	g[yx[0] + (*a)->c[1][0]][yx[1] + (*a)->c[1][1]] = '.';
	g[yx[0] + (*a)->c[2][0]][yx[1] + (*a)->c[2][1]] = '.';
	g[yx[0] + (*a)->c[3][0]][yx[1] + (*a)->c[3][1]] = '.';
}

static void	ft_place_l(char **g, t_tetri **a, int yx[2], char l)
{
	g[yx[0] + (*a)->c[0][0]][yx[1] + (*a)->c[0][1]] = l;
	g[yx[0] + (*a)->c[1][0]][yx[1] + (*a)->c[1][1]] = l;
	g[yx[0] + (*a)->c[2][0]][yx[1] + (*a)->c[2][1]] = l;
	g[yx[0] + (*a)->c[3][0]][yx[1] + (*a)->c[3][1]] = l;
}

static int	ft_place(t_tetri **a, char **g, int size, char l)
{
	int		yx[2];
	int		ret;

	yx[0] = 0;
	yx[1] = 0;
	while ((*a)->h_b < size - yx[0])
	{
		if ((*a)->w_r < size - yx[1] && (*a)->w_l >= -yx[1])
			if (g[yx[0] + (*a)->c[0][0]][yx[1] + (*a)->c[0][1]] == '.' &&
				g[yx[0] + (*a)->c[1][0]][yx[1] + (*a)->c[1][1]] == '.' &&
				g[yx[0] + (*a)->c[2][0]][yx[1] + (*a)->c[2][1]] == '.' &&
				g[yx[0] + (*a)->c[3][0]][yx[1] + (*a)->c[3][1]] == '.')
			{
				ft_place_l(g, a, yx, l);
				if ((*a)->next == NULL)
					return (1);
				if ((ret = ft_place(&(*a)->next, g, size, l + 1)))
					return (ret + 1);
				ft_place_p(g, a, yx);
			}
		yx[1]++;
		if (yx[1] >= size)
			yx[1] = 0 & yx[0]++;
	}
	return (0);
}

static char	**ft_init_g(int size)
{
	char	**g;
	int		i;

	i = 0;
	if (!(g = ft_memtab(size, size)))
		return (NULL);
	while (i < size)
	{
		ft_memset(g[i], '.', size);
		i++;
	}
	return (g);
}

char		**ft_algo(int count_tetri, t_tetri **a, int *size)
{
	int		ret;
	char	**g;

	ret = 0;
	while (ret != count_tetri)
	{
		if (!(g = ft_init_g(*size)))
			return (NULL);
		if ((ret = ft_place(a, g, *size, 'A')) == count_tetri)
			return (g);
		ft_sstrdel((void**)g, *size);
		*size = *size + 1;
	}
	return (NULL);
}
