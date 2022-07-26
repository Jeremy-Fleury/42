/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort_short.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/04 22:17:38 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/12 13:18:21 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

char	*ft_nb_pa(t_stack *stack, int nb)
{
	while (nb > 0)
	{
		stack->str = ft_strextend(stack->str, pa(stack));
		nb--;
	}
	return (stack->str);
}

char	*ft_short_tree(t_stack *stack)
{
	if (stack->a[0] > stack->a[1] && stack->a[0] > stack->a[2])
		stack->str = ft_strextend(stack->str, ra(stack));
	if (stack->a[0] < stack->a[1] && stack->a[1] > stack->a[2]
	&& stack->a[0] < stack->a[2])
	{
		stack->str = ft_strextend(stack->str, sa(stack));
		stack->str = ft_strextend(stack->str, ra(stack));
	}
	if (stack->a[0] > stack->a[1] && stack->a[0] < stack->a[2])
		stack->str = ft_strextend(stack->str, sa(stack));
	if (stack->a[0] < stack->a[1] && stack->a[1] > stack->a[2]
	&& stack->a[0] > stack->a[2])
		stack->str = ft_strextend(stack->str, rra(stack));
	if (stack->a[0] > stack->a[1] && stack->a[1] > stack->a[2]
	&& stack->a[0] > stack->a[2])
	{
		stack->str = ft_strextend(stack->str, ra(stack));
		stack->str = ft_strextend(stack->str, sa(stack));
	}
	return (stack->str);
}
