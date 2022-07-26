/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_check_coord.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/04 15:44:21 by allefebv          #+#    #+#             */
/*   Updated: 2019/05/03 11:45:34 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static int	ft_check_coord2(t_coord **coord_tab, t_coord *tmp, int x, int y)
{
	int		key;

	key = ft_hash(ft_itoa(x), HASH_TAB);
	if ((*(coord_tab + key))->x == x && (*(coord_tab + key))->y == y)
		return (0);
	while (tmp->next != NULL)
	{
		tmp = tmp->next;
		if ((*(coord_tab + key))->x == x && (*(coord_tab + key))->y == y)
			return (0);
	}
	if (!(tmp->next = (t_coord*)malloc(sizeof(t_coord))))
		return (0);
	tmp->next->x = x;
	tmp->next->y = y;
	tmp->next->next = NULL;
	return (1);
}

int			ft_check_coord(char *line, t_coord **coord_tab)
{
	int		key;
	t_coord	*tmp;
	int		x;
	int		y;
	char	**split;

	split = ft_strsplit(line, ' ');
	x = ft_atoi(split[1]);
	y = ft_atoi(split[2]);
	key = ft_hash(ft_itoa(x), HASH_TAB);
	tmp = coord_tab[key];
	if (coord_tab[key] == NULL)
	{
		if (!(coord_tab[key] = (t_coord*)malloc(sizeof(t_coord))))
			return (0);
		(*(coord_tab + key))->x = x;
		(*(coord_tab + key))->y = y;
		(coord_tab[key])->next = NULL;
	}
	else
		ft_check_coord2(coord_tab, tmp, x, y);
	return (1);
}
