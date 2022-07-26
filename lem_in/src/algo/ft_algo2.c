/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_algo2.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/15 16:47:23 by allefebv          #+#    #+#             */
/*   Updated: 2019/05/15 17:11:22 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

int		ft_count_bottleneck(t_data data)
{
	t_neighbor	*tmp_n;
	int			b_neck_start;
	int			b_neck_end;

	if (data.start_room == NULL || data.end_room == NULL)
		return (0);
	b_neck_start = 0;
	tmp_n = ((data.start_room)->neighbor);
	while (tmp_n != NULL)
	{
		b_neck_start++;
		tmp_n = tmp_n->next;
	}
	b_neck_end = 0;
	tmp_n = ((data.end_room)->neighbor);
	while (tmp_n != NULL)
	{
		b_neck_end++;
		tmp_n = tmp_n->next;
	}
	return ((b_neck_end >= b_neck_start) ? b_neck_start : b_neck_end);
}

void	ft_init_storage_flow(t_room **room, t_data data)
{
	t_neighbor	*tmp_n;
	int			i;

	i = 0;
	while (i < data.nb_room)
	{
		tmp_n = room[i]->neighbor;
		while (tmp_n != NULL)
		{
			tmp_n->storage_flow = 0;
			tmp_n = tmp_n->next;
		}
		i++;
	}
}
