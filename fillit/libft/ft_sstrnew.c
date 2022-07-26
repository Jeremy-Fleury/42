/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sstrnew.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/23 14:19:44 by jfleury           #+#    #+#             */
/*   Updated: 2018/11/27 14:45:53 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	**ft_sstrnew(size_t y, size_t x)
{
	char	**str;
	size_t	i;

	i = 0;
	if (!(str = (char**)ft_memalloc(y + 1)))
		return (NULL);
	while (i < y)
	{
		str[i] = ft_strnew(x);
		i++;
	}
	str[y] = 0;
	return (str);
}
