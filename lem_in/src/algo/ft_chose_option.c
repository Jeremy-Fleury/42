/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_chose_option.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/19 16:41:09 by allefebv          #+#    #+#             */
/*   Updated: 2019/05/15 19:21:22 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static void	ft_choose_best_path2(int i, int *max_global,
	int max_block, int *pos_less)
{
	if (max_block < *max_global)
	{
		*max_global = max_block;
		*pos_less = i;
	}
}

t_path		**ft_chose_best_path(t_path ***all_path, t_data data)
{
	int	i;
	int	j;
	int	max_global;
	int max_block;
	int	pos_less;

	i = -1;
	pos_less = 0;
	if (all_path[0][0]->path[1] == data.end_room)
		return (all_path[0]);
	while (all_path[++i] != 0)
		ft_compute_nb_ants(all_path[i], data);
	max_global = all_path[0][0]->steps;
	i = -1;
	while (all_path[++i] != 0)
	{
		j = -1;
		max_block = all_path[i][0]->steps;
		while (all_path[i][++j] != 0)
			if (max_block > all_path[i][j]->steps)
				max_block = all_path[i][j]->steps;
		ft_choose_best_path2(i, &max_global, max_block, &pos_less);
	}
	return (all_path[pos_less]);
}
