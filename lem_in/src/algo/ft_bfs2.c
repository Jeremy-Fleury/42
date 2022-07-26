/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_bfs2.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/14 17:53:14 by allefebv          #+#    #+#             */
/*   Updated: 2019/05/16 19:10:07 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

int		ft_check_circle(t_room *tmp_r, t_room *tmp_n)
{
	while (tmp_r->source != NULL)
	{
		if (tmp_r == tmp_n)
			return (1);
		tmp_r = tmp_r->source;
	}
	return (0);
}

int		ft_check_same_path(t_room *tmp_r, t_room *tmp_n_r)
{
	t_neighbor	*tmp_n;

	tmp_n = tmp_r->neighbor;
	while (tmp_n->room != tmp_n_r)
		tmp_n = tmp_n->next;
	if (tmp_n->flow == -1)
		return (1);
	return (0);
}

void	ft_init_data_bfs(t_bfs *bfs, t_data data, t_room **room)
{
	int	i;

	i = 0;
	while (i < data.nb_room)
	{
		room[i]->visited = 0;
		room[i]->upstream = 0;
		i++;
	}
	bfs->tmp_r = data.start_room;
	bfs->tmp_r->source = NULL;
	bfs->tmp_r2 = bfs->tmp_r;
	bfs->tmp_r2->visited = 1;
}

int		ft_create_shortest_path(t_bfs *bfs, t_room ***shortest_path)
{
	int			i;

	bfs->tmp_r = bfs->tmp_r2;
	i = 1;
	while (bfs->tmp_r2->source != NULL)
	{
		bfs->tmp_r2 = bfs->tmp_r2->source;
		i++;
	}
	if (!(*shortest_path = (t_room**)malloc(sizeof(t_room*) * (i + 1))))
		return (ft_malloc_error(0));
	shortest_path[0][i] = 0;
	i--;
	bfs->tmp_r2 = bfs->tmp_r;
	while (i >= 0)
	{
		shortest_path[0][i] = bfs->tmp_r2;
		bfs->tmp_r2 = bfs->tmp_r2->source;
		i--;
	}
	return (1);
}

int		ft_quick_upstream(t_bfs *bfs, t_data data)
{
	t_room		*quick_r;
	t_neighbor	*quick_n;

	quick_r = bfs->tmp_r;
	quick_n = bfs->tmp_n;
	while (((t_room*)(quick_n->room))->visited == 0)
	{
		bfs->tmp_r2->next = (t_room*)quick_n->room;
		bfs->tmp_r2 = (t_room*)quick_n->room;
		bfs->tmp_r2->weight = quick_r->weight - 1;
		bfs->tmp_r2->visited = 1;
		bfs->tmp_r2->upstream = 1;
		bfs->tmp_r2->source = quick_r;
		bfs->tmp_r2->next = NULL;
		if (bfs->tmp_r2 == data.end_room)
			return (1);
		quick_r = bfs->tmp_r2;
		quick_n = bfs->tmp_r2->neighbor;
		while ((t_room*)quick_n->room != data.start_room && quick_n->flow != -1)
			quick_n = quick_n->next;
	}
	return (0);
}
