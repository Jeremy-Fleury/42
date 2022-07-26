/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_algo.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/08 14:34:16 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/16 19:09:50 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static void	ft_allocate_flows(t_room **shortest_path, int i,
	t_neighbor **n_forth, t_neighbor **n_back)
{
	if (shortest_path[i + 1] != 0)
	{
		*n_forth = shortest_path[i]->neighbor;
		while ((*n_forth)->room != shortest_path[i + 1])
			*n_forth = (*n_forth)->next;
		(*n_forth)->flow = (*n_forth)->flow + 1;
	}
	if (i != 0)
	{
		*n_back = shortest_path[i]->neighbor;
		while ((*n_back)->room != shortest_path[i - 1])
			*n_back = (*n_back)->next;
		(*n_back)->flow = (*n_back)->flow - 1;
		if (shortest_path[i + 1] != 0
			&& (*n_back)->flow == 0 && (*n_forth)->flow == 0)
			shortest_path[i]->flow = 0;
		else
			shortest_path[i]->flow = 1;
	}
}

static void	ft_edmond_karp(t_room **shortest_path)
{
	t_neighbor	*n_forth;
	t_neighbor	*n_back;
	int			i;

	i = 0;
	while (shortest_path && shortest_path[i] != 0)
	{
		ft_allocate_flows(shortest_path, i, &n_back, &n_forth);
		i++;
	}
}

static int	ft_bfs_loop(t_data data, t_room **room, t_path ****all_path)
{
	t_room	**shortest_path;
	int		i;
	int		ret;

	i = 0;
	while (i < data.nb_path)
	{
		if ((ret = ft_bfs(room, data, &shortest_path, i)) == 1)
		{
			ft_edmond_karp(shortest_path);
			ft_init_storage_flow(room, data);
			if (!(ft_store_path(*all_path, data)))
			{
				free(shortest_path);
				return (ft_malloc_error(0));
			}
			free(shortest_path);
			i++;
		}
		else if (ret == 0)
			break ;
		else
			return (0);
	}
	return (1);
}

int			ft_algo(t_room **room, t_data data)
{
	int		i;
	t_path	***all_path;
	t_path	**best_path;

	if (!(data.nb_path = ft_count_bottleneck(data)))
		return (ft_error(0));
	if (!(all_path = (t_path***)malloc(sizeof(t_path**) * (data.nb_path + 1))))
		return (ft_malloc_error(0));
	i = -1;
	while (++i <= data.nb_path)
		all_path[i] = 0;
	if (!ft_bfs_loop(data, room, &all_path))
		return (ft_free_paths(all_path));
	best_path = ft_chose_best_path(all_path, data);
	if (best_path != NULL)
	{
		ft_lstprint_str(*data.instructions);
		ft_printf("\n");
		ft_ants_manage(best_path, data);
		ft_free_paths(all_path);
		return (1);
	}
	ft_free_paths(all_path);
	return (ft_error(0));
}
