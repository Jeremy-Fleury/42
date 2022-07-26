/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_min_width.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/11 13:42:02 by allefebv          #+#    #+#             */
/*   Updated: 2019/01/15 11:13:56 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_process_min_width(t_conv_spec conv_spec, char *str)
{
	char	*tmp;
	int		i;

	i = ft_strlen(str);
	if (i < conv_spec.field_width)
	{
		tmp = ft_strnew(conv_spec.field_width - i);
		ft_memset(tmp, ' ', conv_spec.field_width - i);
		tmp = ft_strextend(tmp, str);
		free(str);
		str = tmp;
	}
	return (str);
}
