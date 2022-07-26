/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_mediane.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/27 14:19:05 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/04 21:51:32 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

int			ft_mediane(int *stack, int end)
{
	int		*tab;
	int		i;
	int		pivot;

	i = 0;
	if (stack[i] == end)
		return (end);
	while (stack[i] != end)
		i++;
	if (!(tab = (int*)malloc(sizeof(int) * (i + 1))))
		return (end);
	i = 0;
	while (stack[i] != end)
	{
		tab[i] = stack[i];
		i++;
	}
	tab[i] = stack[i];
	tab = ft_bubble_sort(tab, i + 1);
	pivot = tab[i / 2 + 1];
	free(tab);
	return (pivot);
}
