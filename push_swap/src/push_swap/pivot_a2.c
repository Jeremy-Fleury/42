/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pivot_a2.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/05 13:36:14 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/12 12:33:40 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

int		ft_cal_enda(t_stack *stack, int end)
{
	int		i;
	int		check;

	check = 1;
	while (check == 1)
	{
		check = 0;
		i = 0;
		while (stack->a[i] < end)
			i++;
		if (stack->a[i] == end && end != stack->a[0])
		{
			end = stack->a[i - 1];
			check = 1;
		}
	}
	return (end);
}

char	*ft_short_pivot(t_stack *stack, t_sort *sort, int i)
{
	if (i == 1 && stack->a[0] > stack->a[1])
	{
		sort->end_b = -1;
		return (stack->str = ft_strextend(stack->str, sa(stack)));
	}
	else
	{
		sort->end_b = -1;
		if (stack->len_a == 3)
			return (stack->str = ft_short_tree(stack));
		return (stack->str = ft_short(stack));
	}
}
