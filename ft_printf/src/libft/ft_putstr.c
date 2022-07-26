/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putstr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/05 14:47:33 by jfleury           #+#    #+#             */
/*   Updated: 2019/01/16 13:34:12 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_putstr(char const *s)
{
	int		i;

	i = 0;
	if (s != NULL)
	{
		while (s[i] != 0)
		{
			ft_putchar(s[i]);
			i++;
		}
	}
}
