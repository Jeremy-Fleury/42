/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_chose_option2.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/14 17:12:38 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/15 18:04:36 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

void	ft_place_remaining_ants(int unplaced_ants, t_path **path)
{
	int	i;
	int	smaller_steps;
	int	pos_min;

	while (unplaced_ants)
	{
		i = 0;
		smaller_steps = path[i]->steps;
		pos_min = i;
		while (path[i] != 0)
		{
			if (smaller_steps > path[i]->steps)
			{
				smaller_steps = path[i]->steps;
				pos_min = i;
			}
			i++;
		}
		path[pos_min]->steps++;
		path[pos_min]->ants++;
		unplaced_ants--;
	}
}

void	ft_neg_ants(t_path **path, t_dispatch *dis)
{
	int	i;

	i = 0;
	dis->sum_len = dis->sum_len - path[i]->length;
	free(path[i]->path);
	free(path[i]);
	path[i] = path[i + 1];
	while (path[i] != 0)
	{
		path[i] = path[i + 1];
		i++;
	}
	dis->flag = 0;
	dis->nb_path = dis->nb_path - 1;
}

void	ft_compute_nb_ants2(t_dispatch *dis, t_path **path, t_data data)
{
	int	i;

	i = 0;
	dis->flag = 1;
	dis->unplaced_ants = data.nb_ants;
	while (i < dis->nb_path && dis->flag == 1)
	{
		path[i]->ants = (data.nb_ants + dis->sum_len
				- (dis->nb_path * path[i]->length)) / dis->nb_path;
		if (path[i]->ants <= 0)
			ft_neg_ants(path + i, dis);
		else
		{
			dis->unplaced_ants = dis->unplaced_ants - path[i]->ants;
			path[i]->steps = path[i]->ants + path[i]->length - 1;
			i++;
		}
	}
}

void	ft_compute_nb_ants(t_path **path, t_data data)
{
	t_dispatch	dis;

	dis.nb_path = 0;
	dis.sum_len = 0;
	while (path[dis.nb_path] != 0)
	{
		dis.sum_len = dis.sum_len + path[dis.nb_path]->length;
		dis.nb_path++;
	}
	dis.flag = 0;
	while (dis.flag == 0)
		ft_compute_nb_ants2(&dis, path, data);
	ft_place_remaining_ants(dis.unplaced_ants, path);
}
