/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_row_col.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/18 16:48:35 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/19 19:05:52 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../ft_lib.h"

int		ft_str_check(char *str)
{
	int		i;

	i = 0;
	while (str[i] != '\n')
	{
		if (str[i] == '\0')
			return (-1);
		i++;
	}
	return (0);
}

int		ft_col(char *str)
{
	int		col;
	int		i;
	int		check;

	col = 0;
	i = 0;
	check = ft_str_check(str);
	if (check == -1)
		return (-1);
	while (str[i] && str[i] != '\n')
	{
		col++;
		i++;
	}
	return (col);
}

int		ft_row(char *str)
{
	int		row;
	int		i;
	int		check;

	row = 0;
	i = 0;
	check = ft_str_check(str);
	if (check == -1)
		return (-1);
	while (str[i] != '\0')
	{
		if (str[i] == '\n')
			row++;
		i++;
	}
	return (row);
}
