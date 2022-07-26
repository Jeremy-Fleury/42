/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_clean.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/30 16:33:40 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/14 17:23:04 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

int			ft_free_paths(t_path ***paths)
{
	int	i;
	int	j;

	i = 0;
	while (paths[i] != 0)
	{
		j = 0;
		while (paths[i][j] != 0)
		{
			free(paths[i][j]->path);
			free(paths[i][j]);
			j++;
		}
		free(paths[i]);
		i++;
	}
	free(paths);
	return (0);
}

void		ft_clean_main2(t_room *tmp_r, t_room *tmp_r_nxt)
{
	t_neighbor	*tmp_n;
	t_neighbor	*tmp_n_nxt;

	while (tmp_r != NULL)
	{
		tmp_n = tmp_r->neighbor;
		while (tmp_n != NULL)
		{
			tmp_n_nxt = tmp_n->next;
			free(tmp_n);
			tmp_n = tmp_n_nxt;
		}
		tmp_r_nxt = tmp_r->next;
		free(tmp_r->name);
		free(tmp_r->x);
		free(tmp_r->y);
		free(tmp_r);
		tmp_r = tmp_r_nxt;
	}
}

int			ft_clean_main(t_room **room, t_data *data)
{
	int			i;
	t_room		*tmp_r;
	t_room		*tmp_r_nxt;

	i = 0;
	tmp_r_nxt = NULL;
	ft_lstdel(data->instructions, &ft_free_ptr);
	free(data->instructions);
	if (room)
	{
		while (i < HASH_TAB)
		{
			if (room[i] != NULL)
			{
				tmp_r = room[i];
				ft_clean_main2(tmp_r, tmp_r_nxt);
			}
			i++;
		}
		free(room);
	}
	return (0);
}

int			ft_clean_refacto(t_room **room, t_data data)
{
	int			i;
	t_neighbor	*tmp_n;
	t_neighbor	*tmp_n_nxt;

	i = 0;
	while (i < data.nb_room)
	{
		tmp_n = room[i]->neighbor;
		while (tmp_n != NULL)
		{
			tmp_n_nxt = tmp_n->next;
			free(tmp_n);
			tmp_n = tmp_n_nxt;
		}
		free(room[i]->name);
		free(room[i]->x);
		free(room[i]->y);
		free(room[i]);
		i++;
	}
	free(room);
	return (0);
}
