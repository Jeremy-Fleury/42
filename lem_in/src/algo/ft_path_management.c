/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_path_management.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/19 16:37:47 by allefebv          #+#    #+#             */
/*   Updated: 2019/05/14 17:16:16 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static int		ft_path_len(t_room *room, t_data data)
{
	t_room		*tmp_r;
	t_neighbor	*tmp_n;
	int			len;

	tmp_r = room;
	len = 1;
	while (tmp_r != data.end_room)
	{
		tmp_n = tmp_r->neighbor;
		while (tmp_n->flow != 1)
			tmp_n = tmp_n->next;
		len++;
		tmp_r = tmp_n->room;
	}
	len++;
	return (len);
}

static int		ft_init_fill(t_path **path, t_data data, int len)
{
	if (!(*path = (t_path*)malloc(sizeof(t_path))))
		return (0);
	if (!((*path)->path = (t_room**)malloc(sizeof(t_room*) * (len + 1))))
	{
		free(*path);
		return (0);
	}
	(*path)->path[len] = 0;
	(*path)->path[0] = data.start_room;
	return (1);
}

static t_path	*ft_fill_path(t_path *path, t_room *first, int len, t_data data)
{
	int			i;
	t_room		*tmp_r;
	t_neighbor	*tmp_n;

	if (!(ft_init_fill(&path, data, len)))
		return (NULL);
	tmp_r = first;
	i = 0;
	while (tmp_r != data.end_room)
	{
		path->path[++i] = tmp_r;
		tmp_n = tmp_r->neighbor;
		while (tmp_n->flow != 1)
			tmp_n = tmp_n->next;
		if (tmp_n->room == data.end_room)
			path->end = tmp_r;
		tmp_r = tmp_n->room;
	}
	path->path[++i] = tmp_r;
	path->length = i;
	path->ants = 0;
	return (path);
}

static void		ft_init_path(t_neighbor **tmp_n, int *nb_path, t_data data)
{
	*tmp_n = data.start_room->neighbor;
	*nb_path = 0;
	while (*tmp_n != NULL)
	{
		if ((*tmp_n)->flow == 1)
			*nb_path = *nb_path + 1;
		*tmp_n = (*tmp_n)->next;
	}
}

int				ft_store_path(t_path ***paths, t_data data)
{
	t_neighbor	*tmp_n;
	int			nb_path;
	int			len;
	int			i;
	int			j;

	ft_init_path(&tmp_n, &nb_path, data);
	j = 0;
	while (paths[j] != 0)
		j++;
	if (!(paths[j] = (t_path**)malloc(sizeof(t_path*) * (nb_path + 1))))
		return (0);
	paths[j][nb_path] = 0;
	tmp_n = data.start_room->neighbor;
	i = -1;
	while (++i < nb_path)
	{
		while (tmp_n->flow != 1)
			tmp_n = tmp_n->next;
		len = ft_path_len(tmp_n->room, data);
		if (!(paths[j][i] = ft_fill_path(paths[j][i], tmp_n->room, len, data)))
			return (0);
		tmp_n = tmp_n->next;
	}
	return (1);
}
