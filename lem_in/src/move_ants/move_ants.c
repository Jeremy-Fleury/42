/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   move_ants.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/22 15:21:07 by allefebv          #+#    #+#             */
/*   Updated: 2019/05/14 16:56:49 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static void	ft_init(t_path **path)
{
	int	i;
	int	j;

	i = 0;
	while (path[i] != 0)
	{
		j = 0;
		while (path[i]->path[j] != 0)
		{
			path[i]->path[j]->next = path[i]->path[j + 1];
			if (j != 0)
				path[i]->path[j]->source = path[i]->path[j - 1];
			j++;
		}
		i++;
	}
}

static void	ft_start_end(t_data data)
{
	int	i;

	i = 1;
	while (data.nb_ants)
	{
		ft_printf("L%d-%s", i, data.end_room->name);
		data.nb_ants--;
		i++;
		if (data.nb_ants)
			write(1, " ", 1);
	}
	ft_printf("\n");
	if (data.flag_print == 1)
		ft_printf("\nMap solved in 1 step\n");
}

static void	ft_print_move(int *flag, int ant_name, char *room_name)
{
	if (*flag == 1)
		ft_printf(" L%d-%s", ant_name, room_name);
	else
		ft_printf("L%d-%s", ant_name, room_name);
	*flag = 1;
}

static void	ft_ants_move(t_path *path, int *flag, int *ants, t_data *data)
{
	t_room *tmp;

	tmp = path->end;
	while (tmp != path->path[0])
	{
		if (tmp->ant != 0)
		{
			if (tmp == path->end)
			{
				data->nb_ants--;
			}
			ft_print_move(flag, tmp->ant, tmp->next->name);
			tmp->next->ant = tmp->ant;
			tmp->ant = tmp->source->ant;
		}
		tmp = tmp->source;
	}
	if (path->ants != 0)
	{
		tmp = path->path[1];
		tmp->ant = *ants;
		ft_print_move(flag, tmp->ant, tmp->name);
		path->ants--;
		(*ants)++;
	}
}

void		ft_ants_manage(t_path **path, t_data data)
{
	int		i;
	int		steps;
	int		flag;
	int		ants;

	ft_init(path);
	if (!path[1] && path[0]->path[2] == 0)
		ft_start_end(data);
	else
	{
		ants = 1;
		steps = 0;
		while (data.nb_ants)
		{
			i = -1;
			flag = 0;
			while (path[++i] != 0)
				ft_ants_move(path[i], &flag, &ants, &data);
			ft_printf("\n");
			steps++;
		}
		if (data.flag_print == 1)
			ft_printf("\nMap solved in %d steps\n", steps);
	}
}
