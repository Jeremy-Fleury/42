/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_tretrinew.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/23 14:36:07 by allefebv          #+#    #+#             */
/*   Updated: 2018/12/03 12:41:38 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

static void		ft_tetrinew_cut(t_tetri *newtetri, int **tab_s, int i)
{
	if ((newtetri->c[i][0] = tab_s[i][0] - tab_s[0][0]) > newtetri->h_b)
		newtetri->h_b = newtetri->c[i][0];
	newtetri->c[i][1] = tab_s[i][1] - tab_s[0][1];
	if (newtetri->c[i][1] > newtetri->w_r)
		newtetri->w_r = newtetri->c[i][1];
	else if (newtetri->c[i][1] < newtetri->w_l)
		newtetri->w_l = newtetri->c[i][1];
}

static int		**ft_tab_s(char **shape)
{
	int		**tab_s;
	int		x;
	int		y;
	int		i;

	tab_s = ft_memint_tab(4, 2);
	y = 0;
	i = 0;
	while (y < 4)
	{
		x = 0;
		while (x < 4)
		{
			if (shape[y][x] == '#')
			{
				tab_s[i][0] = y;
				tab_s[i][1] = x;
				i++;
			}
			x++;
		}
		y++;
	}
	return (tab_s);
}

t_tetri			*ft_tetrinew(char **shape)
{
	t_tetri	*newtetri;
	int		**tab_s;
	int		i;

	if (!(newtetri = (t_tetri*)malloc(sizeof(t_tetri))))
		return (NULL);
	if (!(newtetri->c = ft_memint_tab(4, 2)))
		return (NULL);
	if (!(tab_s = ft_tab_s(shape)))
		return (NULL);
	i = 3;
	newtetri->w_l = 0;
	newtetri->w_r = 0;
	newtetri->h_b = 0;
	while (i >= 0)
	{
		ft_tetrinew_cut(newtetri, tab_s, i);
		i--;
	}
	ft_sstrdel((void**)tab_s, 4);
	newtetri->next = NULL;
	return (newtetri);
}
