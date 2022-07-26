/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pivot_a.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/26 17:16:23 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/12 12:32:20 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static int		ft_cal_end(t_stack *stack, int end)
{
	int		i;

	i = 0;
	if (stack->len_a == 1)
		return (end);
	while (stack->a[i] < end)
		i++;
	if (stack->a[i] == end)
	{
		end = stack->a[i - 1];
		ft_cal_end(stack, end);
	}
	return (end);
}

static int		ft_cal_pivot(t_stack *stack, t_pivot *pivot, int *end)
{
	*end = ft_cal_end(stack, *end);
	if (stack->len_a > 1)
		pivot->pivot = ft_mediane(stack->a, *end);
	else
		pivot->pivot = *end;
	return (pivot->pivot);
}

static char		*ft_pb_ra(t_stack *stack, t_sort *sort, t_pivot *pivot)
{
	if (stack->a[0] < pivot->pivot)
	{
		stack->str = ft_strextend(stack->str, pb(stack));
		if (pivot->flag == 0)
		{
			sort->end_b = stack->b[0];
			pivot->flag = 1;
		}
	}
	else
	{
		stack->str = ft_strextend(stack->str, ra(stack));
		pivot->reverse++;
	}
	return (stack->str);
}

static char		*ft_rra(t_stack *stack, t_pivot *pivot)
{
	while (pivot->reverse > 0)
	{
		stack->str = ft_strextend(stack->str, rra(stack));
		pivot->reverse--;
	}
	return (stack->str);
}

char			*pivot_a(t_stack *stack, t_sort *sort, int end)
{
	t_pivot		pivot;
	int			i;

	i = 0;
	if (stack->a[0] != end)
		end = ft_cal_enda(stack, end);
	while (stack->a[i] != end)
		i++;
	if ((i == 1 && stack->a[0] > stack->a[1]) || i == 2)
		return (ft_short_pivot(stack, sort, i));
	pivot.reverse = 0;
	pivot.flag = 0;
	pivot.pivot = ft_cal_pivot(stack, &pivot, &end);
	while (end != stack->a[0])
		stack->str = ft_pb_ra(stack, sort, &pivot);
	stack->str = ft_pb_ra(stack, sort, &pivot);
	sort->end_a = stack->a[stack->len_a - 1];
	if (stack->flag_rra == 1)
		stack->str = ft_rra(stack, &pivot);
	return (stack->str);
}
