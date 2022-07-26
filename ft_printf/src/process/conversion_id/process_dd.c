/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_dd.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/23 16:57:48 by allefebv          #+#    #+#             */
/*   Updated: 2019/01/23 17:19:16 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_process_dd(t_conv_spec conv_spec, va_list *ap)
{
	char	*str;

	(void)conv_spec;
	str = ft_itoa(va_arg(*ap, long));
	return (str);
}
