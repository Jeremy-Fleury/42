/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_s.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/09 12:04:24 by jfleury           #+#    #+#             */
/*   Updated: 2019/01/16 18:29:12 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_process_s(t_conv_spec conv_spec, va_list *ap)
{
	char	*str;

	(void)conv_spec;
	if ((str = ft_strdup(va_arg(*ap, char*))) == NULL)
		str = ft_strdup("(null)");
	str = ft_precision_s(conv_spec, str);
	return (str);
}
