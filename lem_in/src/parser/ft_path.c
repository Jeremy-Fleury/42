/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_path.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/02 18:36:04 by allefebv          #+#    #+#             */
/*   Updated: 2019/04/25 17:06:11 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static int	ft_clean(char **couple)
{
	int	i;

	i = 0;
	while (couple[i] != 0)
	{
		free(couple[i]);
		i++;
	}
	free(couple);
	return (0);
}

static int	ft_path_error(char **couple)
{
	int	j;
	int	i;

	j = 0;
	i = 0;
	while (couple[i] != 0)
		i++;
	if (i != 2)
		return (0);
	while (couple[i] != 0)
	{
		j = 0;
		while (couple[i][j] != '\0' && couple[i][j] != ' ')
			j++;
		if (couple[i][j] != '\0')
			return (0);
		i++;
	}
	return (1);
}

static int	ft_find_room(char **couple, t_room **room, int key_r1, int key_r2)
{
	t_room		*tmp_r1;
	t_room		*tmp_r2;
	t_neighbor	*tmp_n1;
	t_neighbor	*tmp_n2;

	tmp_r1 = room[key_r1];
	tmp_r2 = room[key_r2];
	while (tmp_r1 != NULL && !ft_strequ(tmp_r1->name, couple[0]))
		tmp_r1 = tmp_r1->next;
	while (tmp_r2 != NULL && !ft_strequ(tmp_r2->name, couple[1]))
		tmp_r2 = tmp_r2->next;
	if (tmp_r1 == NULL || tmp_r2 == NULL)
		return (0);
	else
	{
		tmp_n1 = tmp_r1->neighbor;
		tmp_n2 = tmp_r2->neighbor;
		if (!(ft_neigh_1(tmp_r1, tmp_r2, tmp_n1)))
			return (0);
		if (!(ft_neigh_2(tmp_r1, tmp_r2, tmp_n2)))
			return (0);
	}
	return (1);
}

int			ft_path(char *line, t_room **room)
{
	char		**couple;
	int			key_r1;
	int			key_r2;

	couple = ft_strsplit(line, '-');
	if (!(ft_path_error(couple)))
		return (ft_clean(couple));
	key_r1 = ft_hash(couple[0], HASH_TAB);
	key_r2 = ft_hash(couple[1], HASH_TAB);
	if (!(ft_find_room(couple, room, key_r1, key_r2)))
		return (ft_clean(couple));
	ft_clean(couple);
	return (1);
}
