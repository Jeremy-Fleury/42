/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort_short2.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/12 13:19:57 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/12 13:23:32 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static char		*ft_short2(t_stack *stack)
{
	if (stack->a[0] > stack->a[1] && stack->a[1] > stack->a[2]
	&& stack->a[0] > stack->a[2])
	{
		stack->str = ft_strextend(stack->str, ra(stack));
		stack->str = ft_strextend(stack->str, sa(stack));
		stack->str = ft_strextend(stack->str, pb(stack));
		stack->str = ft_strextend(stack->str, rra(stack));
		stack->str = ft_strextend(stack->str, sa(stack));
		stack->str = ft_strextend(stack->str, pa(stack));
	}
	if (stack->a[0] > stack->a[1] && stack->a[0] > stack->a[2])
	{
		stack->str = ft_strextend(stack->str, sa(stack));
		stack->str = ft_strextend(stack->str, pb(stack));
		stack->str = ft_strextend(stack->str, sa(stack));
		stack->str = ft_strextend(stack->str, pa(stack));
	}
	return (stack->str);
}

char			*ft_short(t_stack *stack)
{
	stack->str = ft_short2(stack);
	if (stack->a[0] < stack->a[1] && stack->a[1] > stack->a[2]
	&& stack->a[0] < stack->a[2])
	{
		stack->str = ft_strextend(stack->str, pb(stack));
		stack->str = ft_strextend(stack->str, sa(stack));
		stack->str = ft_strextend(stack->str, pa(stack));
	}
	if (stack->a[0] > stack->a[1] && stack->a[0] < stack->a[2])
		stack->str = ft_strextend(stack->str, sa(stack));
	if (stack->a[0] < stack->a[1] && stack->a[1] > stack->a[2]
	&& stack->a[0] > stack->a[2])
	{
		stack->str = ft_strextend(stack->str, pb(stack));
		stack->str = ft_strextend(stack->str, sa(stack));
		stack->str = ft_strextend(stack->str, pa(stack));
		stack->str = ft_strextend(stack->str, sa(stack));
	}
	return (stack->str);
}

static char		*ft_shortb2(t_stack *stack)
{
	if (stack->b[0] > stack->b[1] && stack->b[1] > stack->b[2]
	&& stack->b[0] > stack->b[2])
		stack->str = ft_nb_pa(stack, 3);
	if (stack->b[0] > stack->b[1] && stack->b[1] < stack->b[2]
	&& stack->b[0] > stack->b[2])
	{
		stack->str = ft_strextend(stack->str, pa(stack));
		stack->str = ft_strextend(stack->str, sb(stack));
		stack->str = ft_nb_pa(stack, 2);
	}
	if (stack->b[0] < stack->b[1] && stack->b[0] < stack->b[2]
	&& stack->b[1] < stack->b[2])
	{
		stack->str = ft_strextend(stack->str, rrb(stack));
		stack->str = ft_strextend(stack->str, rrb(stack));
		stack->str = ft_strextend(stack->str, sb(stack));
		stack->str = ft_nb_pa(stack, 3);
	}
	return (stack->str);
}

char			*ft_shortb(t_stack *stack)
{
	stack->str = ft_shortb2(stack);
	if (stack->b[0] < stack->b[1] && stack->b[1] > stack->b[2]
	&& stack->b[0] < stack->b[2])
	{
		stack->str = ft_strextend(stack->str, rb(stack));
		stack->str = ft_nb_pa(stack, 3);
	}
	if (stack->b[0] > stack->b[1] && stack->b[0] < stack->b[2])
	{
		stack->str = ft_strextend(stack->str, rrb(stack));
		stack->str = ft_nb_pa(stack, 3);
	}
	if (stack->b[0] < stack->b[1] && stack->b[1] > stack->b[2]
	&& stack->b[0] > stack->b[2])
	{
		stack->str = ft_strextend(stack->str, sb(stack));
		stack->str = ft_nb_pa(stack, 3);
	}
	return (stack->str);
}
