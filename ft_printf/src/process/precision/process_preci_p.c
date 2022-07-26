/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_preci_p.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/18 19:22:36 by allefebv          #+#    #+#             */
/*   Updated: 2019/01/21 15:01:05 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_precision_p(t_conv_spec conv_spec, char *str)
{
	char	*tmp;

	if (conv_spec.precision == 0 && ft_strequ(str, "0x0"))
	{
		free(str);
		str = ft_strdup("0x");
	}
	else if (conv_spec.precision != -1 &&
		(((int)ft_strlen(str) - 2) <= conv_spec.precision))
	{
		tmp = ft_strnew(2 + conv_spec.precision);
		tmp[0] = '0';
		tmp[1] = 'x';
		ft_memset(tmp + 2, '0', (conv_spec.precision - (ft_strlen(str) - 2)));
		tmp = ft_strextend(tmp, (str + 2));
		free(str);
		str = tmp;
	}
	return (str);
}
