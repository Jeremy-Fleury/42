/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memtab.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/27 14:14:55 by allefebv          #+#    #+#             */
/*   Updated: 2018/11/30 13:46:08 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"
#include <stdlib.h>

char	**ft_memtab(size_t y, size_t x)
{
	char			**tab;
	size_t			i;

	i = 0;
	if (!(tab = (char**)ft_memalloc(sizeof(char*) * (y + 1))))
		return (NULL);
	while (i < y)
	{
		if (!(tab[i] = ft_strnew(x)))
		{
			i++;
			while (i > 0)
			{
				free(tab[i - 1]);
				i--;
			}
			free(tab);
			return (NULL);
		}
		i++;
	}
	tab[y] = 0;
	return (tab);
}
