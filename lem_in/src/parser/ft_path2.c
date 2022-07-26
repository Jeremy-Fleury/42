/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_path2.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/25 17:05:48 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/16 19:11:08 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

int	ft_neigh_1(t_room *tmp_r1, t_room *tmp_r2, t_neighbor *tmp_n1)
{
	if (tmp_r1->neighbor == NULL)
	{
		if (!(tmp_r1->neighbor = (t_neighbor*)malloc(sizeof(t_neighbor))))
			return (ft_malloc_error(0));
		tmp_r1->neighbor->room = tmp_r2;
		tmp_r1->neighbor->flow = 0;
		tmp_r1->neighbor->next = NULL;
	}
	else
	{
		while (tmp_n1->next != NULL)
		{
			if (tmp_n1->room == tmp_r2)
				return (0);
			tmp_n1 = tmp_n1->next;
		}
		if (tmp_n1->room == tmp_r2)
			return (0);
		else if (!(tmp_n1->next = (t_neighbor*)malloc(sizeof(t_neighbor))))
			return (ft_malloc_error(0));
		tmp_n1->next->room = tmp_r2;
		tmp_n1->next->flow = 0;
		tmp_n1->next->next = NULL;
	}
	return (1);
}

int	ft_neigh_2(t_room *tmp_r1, t_room *tmp_r2, t_neighbor *tmp_n2)
{
	if (tmp_r2->neighbor == NULL)
	{
		if (!(tmp_r2->neighbor = (t_neighbor*)malloc(sizeof(t_neighbor))))
			return (ft_malloc_error(0));
		tmp_r2->neighbor->room = tmp_r1;
		tmp_r2->neighbor->flow = 0;
		tmp_r2->neighbor->next = NULL;
	}
	else
	{
		while (tmp_n2->next != NULL)
		{
			if (tmp_n2->room == tmp_r1)
				return (0);
			tmp_n2 = tmp_n2->next;
		}
		if (tmp_n2->room == tmp_r2)
			return (0);
		else if (!(tmp_n2->next = (t_neighbor*)malloc(sizeof(t_neighbor))))
			return (ft_malloc_error(0));
		tmp_n2->next->room = tmp_r1;
		tmp_n2->next->flow = 0;
		tmp_n2->next->next = NULL;
	}
	return (1);
}
