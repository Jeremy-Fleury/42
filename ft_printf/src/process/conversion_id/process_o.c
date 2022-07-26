/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_o.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/14 14:53:58 by jfleury           #+#    #+#             */
/*   Updated: 2019/01/15 17:41:57 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_process_o(t_conv_spec conv_spec, va_list *ap)
{
	if (conv_spec.modifier[0] == 1)
		return (ft_itoa_base((unsigned char)va_arg(*ap, unsigned int), 8));
	if (conv_spec.modifier[1] == 1)
		return (ft_itoa_base((unsigned short)va_arg(*ap, unsigned int), 8));
	if (conv_spec.modifier[2] == 1)
		return (ft_itoa_base(va_arg(*ap, unsigned long), 8));
	if (conv_spec.modifier[3] == 1)
		return (ft_itoa_base(va_arg(*ap, unsigned long long), 8));
	return (ft_itoa_base(va_arg(*ap, unsigned int), 8));
}
