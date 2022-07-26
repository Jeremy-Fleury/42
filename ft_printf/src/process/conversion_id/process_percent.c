/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_percent.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/16 14:54:51 by allefebv          #+#    #+#             */
/*   Updated: 2019/01/17 13:34:16 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_process_percent(t_conv_spec conv_spec, va_list *ap)
{
	char	*str;

	(void)conv_spec;
	(void)ap;
	str = ft_strdup("%");
	return (str);
}
