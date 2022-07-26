/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memint_tab.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/27 16:39:27 by allefebv          #+#    #+#             */
/*   Updated: 2018/11/30 13:45:50 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"
#include <stdlib.h>

int		**ft_memint_tab(size_t y, size_t x)
{
	int				**tab;
	size_t			i;

	i = 0;
	if (!(tab = (int**)ft_memalloc(sizeof(int*) * (y))))
		return (NULL);
	while (i < y)
	{
		if (!(tab[i] = (int*)ft_memalloc(sizeof(int) * x)))
		{
			i++;
			while (i > 0)
			{
				free(tab[i - 2]);
				i--;
			}
			free(tab);
			return (NULL);
		}
		i++;
	}
	return (tab);
}
