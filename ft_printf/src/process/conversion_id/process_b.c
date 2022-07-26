/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_b.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/23 16:50:29 by allefebv          #+#    #+#             */
/*   Updated: 2019/01/23 16:50:31 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char		*ft_process_b(t_conv_spec conv_spec, va_list *ap)
{
	if (conv_spec.modifier[0] == 1)
		return (ft_itoa_base((unsigned char)va_arg(*ap, unsigned int), 2));
	if (conv_spec.modifier[1] == 1)
		return (ft_itoa_base((unsigned short)va_arg(*ap, unsigned int), 2));
	if (conv_spec.modifier[2] == 1)
		return (ft_itoa_base(va_arg(*ap, unsigned long), 2));
	if (conv_spec.modifier[3] == 1)
		return (ft_itoa_base(va_arg(*ap, unsigned long long), 2));
	return (ft_itoa_base(va_arg(*ap, unsigned int), 2));
}
