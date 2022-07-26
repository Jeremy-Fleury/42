/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_room.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/01 17:10:16 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/05 11:29:22 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

static int		ft_clean(char **str, int flag)
{
	int	i;

	i = 0;
	if (flag == 1)
	{
		while (str[i] != 0)
		{
			free(str[i]);
			i++;
		}
	}
	free(str);
	return (0);
}

static int		ft_check_room2(char **str, int i)
{
	int		j;

	while (i != 0)
	{
		j = 0;
		while (str[i][j] != 0)
		{
			if (j == 0 && (str[i][j] == '+' || str[i][j] == '-'))
				j++;
			if (!(ft_isdigit(str[i][j])))
				return (0);
			j++;
		}
		i--;
	}
	return (1);
}

static int		ft_check_room(char **str)
{
	int		i;

	i = 0;
	if (str[0][0] == 'L')
		return (0);
	while (str[i] != 0)
		i++;
	if (i != 3)
		return (0);
	i = 0;
	while (str[0][i])
	{
		if (str[0][i] == '-')
			return (0);
		i++;
	}
	i = 2;
	return (ft_check_room2(str, i));
}

int				ft_room(char *line, t_room **room, t_data *data, int flag)
{
	char		**str;

	str = ft_strsplit(line, ' ');
	if (!(ft_check_room(str)))
	{
		return (ft_clean(str, 1));
	}
	if (!(ft_store_room(str, room)))
	{
		return (ft_clean(str, 1));
	}
	ft_store_type(str, room, data, flag);
	ft_clean(str, 0);
	return (1);
}
