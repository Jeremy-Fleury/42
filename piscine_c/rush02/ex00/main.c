/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/18 10:20:29 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/19 21:03:56 by mdaoud           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_lib.h"

int		main(void)
{
	char	*str;
	int		row;
	int		col;

	str = ft_read_to_tab();
	if (str == NULL || str[0] == INVALID_CHAR)
	{
		ft_putstr("aucune\n");
		return (0);
	}
	row = ft_row(str);
	col = ft_col(str);
	ft_check_param(str, col, row);
	return (0);
}
