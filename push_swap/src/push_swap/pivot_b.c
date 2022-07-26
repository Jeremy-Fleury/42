/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pivot_b.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/26 18:03:29 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/07 11:39:29 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static int		ft_cal_pivot(t_stack *stack, t_pivot *pivot, int *end)
{
	if (stack->len_b > 1)
		pivot->pivot = ft_mediane(stack->b, *end);
	else
		pivot->pivot = *end;
	return (pivot->pivot);
}

static char		*ft_pa_rb(t_stack *stack, t_sort *sort, t_pivot *pivot)
{
	if (stack->b[0] >= pivot->pivot)
	{
		stack->str = ft_strextend(stack->str, pa(stack));
		if (pivot->flag == 0)
		{
			sort->end_a = stack->a[0];
			pivot->flag = 1;
		}
	}
	else
	{
		stack->str = ft_strextend(stack->str, rb(stack));
		pivot->reverse++;
	}
	return (stack->str);
}

static char		*ft_rrb(t_stack *stack, t_pivot *pivot)
{
	while (pivot->reverse > 0 && stack->len_b > 1)
	{
		stack->str = ft_strextend(stack->str, rrb(stack));
		pivot->reverse--;
	}
	return (stack->str);
}

char			*pivot_b(t_stack *stack, t_sort *sort, int end)
{
	t_pivot		pivot;

	pivot.flag_rrb = 0;
	if (end == stack->b[stack->len_b - 1])
		pivot.flag_rrb = 1;
	stack->flag_rra = 1;
	pivot.reverse = 0;
	pivot.flag = 0;
	pivot.pivot = ft_cal_pivot(stack, &pivot, &end);
	while (end != stack->b[0])
		stack->str = ft_pa_rb(stack, sort, &pivot);
	stack->str = ft_pa_rb(stack, sort, &pivot);
	if (stack->len_b > 0)
		sort->end_b = stack->b[stack->len_b - 1];
	if (pivot.flag_rrb == 0)
		stack->str = ft_rrb(stack, &pivot);
	return (stack->str);
}
