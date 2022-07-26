/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_refactoring_room.c                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/09 16:01:49 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/16 19:11:18 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static int		ft_init_final_room(t_room ***room, int size)
{
	int		i;

	i = 0;
	if (!(*room = (t_room**)malloc(sizeof(t_room*) * size)))
		return (ft_malloc_error(0));
	while (i < size)
	{
		room[0][i] = NULL;
		i++;
	}
	return (1);
}

int				ft_refactoring_room(t_room **room, t_data data,
									t_room ***final_room)
{
	int		i;
	int		j;
	t_room	*tmp;

	i = 0;
	j = 0;
	if (!(ft_init_final_room(final_room, data.nb_room)))
		return (0);
	while (i < HASH_TAB)
	{
		while (i < HASH_TAB && room[i] == NULL)
			i++;
		if (i != HASH_TAB)
		{
			tmp = room[i];
			while (i < HASH_TAB && tmp != NULL)
			{
				final_room[0][j] = tmp;
				tmp = tmp->next;
				j++;
			}
			i++;
		}
	}
	return (1);
}
