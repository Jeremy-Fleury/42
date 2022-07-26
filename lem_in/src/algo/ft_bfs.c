/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_bfs.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/08 12:58:24 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/23 13:35:05 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static void	ft_upstream2(t_bfs *bfs, t_data data)
{
	t_room	*up_src;
	t_room	*up_r;
	t_room	*up_n;

	up_n = (t_room*)bfs->tmp_n->room;
	up_r = bfs->tmp_r;
	while (up_n != data.start_room && up_n->source != data.start_room
		&& !ft_check_circle(up_r, up_n) && ((up_r->weight <= up_n->weight
				&& up_n->flow == 1 && ft_check_same_path(up_r, up_n))
			|| (up_r->weight < up_n->weight && up_n->flow == 0)))
	{
		up_src = up_n->source;
		up_n->source = up_r;
		if (up_n->flow == 1)
		{
			up_n->weight = up_r->weight - 1;
			up_n->upstream = 1;
		}
		else
			up_n->weight = up_r->weight + 1;
		up_r = up_n;
		up_n = up_src;
	}
}

static void	ft_upstream(t_bfs *bfs, t_data data)
{
	while (bfs->tmp_n != NULL)
	{
		if (bfs->tmp_n->flow == -1)
		{
			if (((t_room*)(bfs->tmp_n->room))->visited == 0)
			{
				if (ft_quick_upstream(bfs, data))
					break ;
			}
			else if (bfs->tmp_r->weight <= ((t_room*)(bfs->tmp_n->room))->weight
				&& ((t_room*)(bfs->tmp_n->room))->source != bfs->tmp_r)
				ft_upstream2(bfs, data);
		}
		bfs->tmp_n = bfs->tmp_n->next;
	}
}

static void	ft_downstream2(t_bfs *bfs, t_data data)
{
	t_room	*up_n;
	t_room	*up_r;
	t_room	*up_src;

	up_n = (t_room*)bfs->tmp_n->room;
	up_r = bfs->tmp_r;
	while (up_n != data.start_room
		&& up_n->source != data.start_room && !ft_check_circle(up_r, up_n)
		&& up_r->weight < up_n->weight && ((up_n->flow == 0)
			|| (up_n->flow == 1 && up_n->upstream == 0)))
	{
		up_src = up_n->source;
		up_n->source = up_r;
		up_n->weight = up_r->weight + 1;
		if (up_n->flow == 1)
			break ;
		up_r = up_n;
		up_n = up_src;
	}
}

static void	ft_downstream(t_bfs *bfs, t_data data)
{
	while (bfs->tmp_n != NULL)
	{
		if (bfs->tmp_n->flow != 1)
		{
			if (((t_room*)(bfs->tmp_n->room))->visited == 0
				&& ((((t_room*)(bfs->tmp_n->room))->flow == 0)
					|| (((t_room*)(bfs->tmp_n->room))->flow == 1
						&& ((t_room*)(bfs->tmp_n->room))->src_neigh == 0)))
			{
				bfs->tmp_r2->next = (t_room*)bfs->tmp_n->room;
				bfs->tmp_r2 = bfs->tmp_r2->next;
				bfs->tmp_r2->visited = 1;
				bfs->tmp_r2->source = bfs->tmp_r;
				bfs->tmp_r2->weight = bfs->tmp_r2->source->weight + 1;
				bfs->tmp_r2->next = NULL;
				if (bfs->tmp_r2 == data.end_room)
					break ;
			}
			else if (bfs->tmp_r->weight <= ((t_room*)(bfs->tmp_n->room))->weight
				&& ((t_room*)(bfs->tmp_n->room))->source != bfs->tmp_r)
				ft_downstream2(bfs, data);
		}
		bfs->tmp_n = bfs->tmp_n->next;
	}
}

int			ft_bfs(t_room **room, t_data data, t_room ***shortest_path, int i)
{
	t_bfs		bfs;
	int			ret;

	ft_init_data_bfs(&bfs, data, room);
	while (bfs.tmp_r2 != data.end_room)
	{
		bfs.tmp_n = bfs.tmp_r->neighbor;
		if (bfs.tmp_r->flow == 1)
			ft_upstream(&bfs, data);
		bfs.tmp_n = bfs.tmp_r->neighbor;
		if (bfs.tmp_r->flow == 0 || bfs.tmp_r->upstream == 1)
			ft_downstream(&bfs, data);
		bfs.tmp_r = bfs.tmp_r->next;
		if (bfs.tmp_r == NULL && i == 0)
			return (ft_error(-1));
		if (bfs.tmp_r == NULL)
			return (0);
	}
	if (bfs.tmp_r2 == data.end_room
		&& !(ret = ft_create_shortest_path(&bfs, shortest_path)))
		return (-1);
	else
		return (1);
}
