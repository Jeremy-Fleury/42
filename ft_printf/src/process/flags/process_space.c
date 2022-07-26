/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_space.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/15 13:23:07 by allefebv          #+#    #+#             */
/*   Updated: 2019/01/17 13:53:19 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_process_space(t_conv_spec cs, char *str)
{
	int		i;
	char	*start;
	char	*end;

	i = 0;
	if ((cs.conv_id == 'd' || cs.conv_id == 'i') && cs.flags[0] == -1)
	{
		while (!(ft_isdigit(str[i])) && str[i] != '\0')
			i++;
		if (str[i] == 0 || str[i - 1] == '-' || (i != 0 && str[i - 1] == ' '))
			return (str);
		else
		{
			start = ft_strsub(str, 0, i);
			end = ft_strsub(str, i, ft_strlen((str + i)));
			free(str);
			str = ft_strnew(ft_strlen(start) + ft_strlen(end) + 1);
			ft_strcpy(str, start);
			ft_strcat(str, " ");
			ft_strcat(str, end);
			free(end);
			free(start);
		}
	}
	return (str);
}
