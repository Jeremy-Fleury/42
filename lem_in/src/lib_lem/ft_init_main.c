/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_init_main.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/30 16:22:53 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/16 19:10:42 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

void	ft_init_start_neigh(t_data *data)
{
	t_neighbor	*tmp_n;

	tmp_n = data->start_room->neighbor;
	while (tmp_n != NULL)
	{
		((t_room*)(tmp_n->room))->src_neigh = 1;
		tmp_n = tmp_n->next;
	}
}

int		ft_init_room(t_room ***room)
{
	int		i;

	i = 0;
	if (!(*room = (t_room**)malloc(sizeof(t_room*) * HASH_TAB)))
		return (ft_malloc_error(0));
	while (i < HASH_TAB)
	{
		room[0][i] = NULL;
		i++;
	}
	return (1);
}

int		ft_init_data(t_data *data, int argc, char **argv)
{
	if (argc > 2)
		return (0);
	if (argc == 2)
	{
		if (argv[1][0] == '-' && argv[1][1] == 'c' && argv[1][2] == '\0')
			data->flag_print = 1;
		else
		{
			ft_printf("Error\n");
			return (0);
		}
	}
	if (argc == 1)
		data->flag_print = 0;
	data->nb_room = 0;
	data->nb_ants = 0;
	data->start_room = NULL;
	data->end_room = NULL;
	if (!(data->instructions = (t_list**)malloc(sizeof(t_list*))))
		return (ft_malloc_error(0));
	*data->instructions = NULL;
	return (1);
}
