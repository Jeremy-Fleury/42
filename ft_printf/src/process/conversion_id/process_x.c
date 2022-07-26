/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_x.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/14 17:19:56 by jfleury           #+#    #+#             */
/*   Updated: 2019/01/16 13:54:57 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_process_x(t_conv_spec conv_spec, va_list *ap)
{
	if (conv_spec.modifier[0] == 1)
		return (ft_itoa_base((unsigned char)va_arg(*ap, unsigned int), 16));
	if (conv_spec.modifier[1] == 1)
		return (ft_itoa_base((unsigned short)va_arg(*ap, unsigned int), 16));
	if (conv_spec.modifier[2] == 1)
		return (ft_itoa_base(va_arg(*ap, unsigned long), 16));
	if (conv_spec.modifier[3] == 1)
		return (ft_itoa_base(va_arg(*ap, unsigned long long), 16));
	return (ft_itoa_base(va_arg(*ap, unsigned int), 16));
}
