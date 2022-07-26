/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_command.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/02 12:48:45 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/15 17:51:19 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

int				ft_command(char *line, int *flag)
{
	int			i;
	static int	start;
	static int	end;

	i = ft_strlen(line);
	if (i < 2)
		return (0);
	if (ft_strequ(line, "##start") && *flag != 0 && start == 0)
	{
		start = 1;
		*flag = 3;
		return (1);
	}
	if (ft_strequ(line, "##end") && *flag != 0 && end == 0)
	{
		end = 1;
		*flag = 4;
		return (1);
	}
	if (line[0] == '#' && line[1] == '#'
		&& ft_strequ(line, "##start") != 1 && ft_strequ(line, "##end") != 1)
		return (1);
	return (0);
}
