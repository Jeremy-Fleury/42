/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_rr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:13:47 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/02 12:13:48 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

char	*rra(t_stack *stack)
{
	int		*tab_a;
	int		i;

	if (stack->len_a < 2)
		return ("");
	if (!(tab_a = (int*)ft_memalloc(sizeof(int) * stack->len_a)))
		return (NULL);
	i = 0;
	tab_a[i] = stack->a[stack->len_a - 1];
	while (i < stack->len_a - 1)
	{
		tab_a[i + 1] = stack->a[i];
		i++;
	}
	free(stack->a);
	stack->a = tab_a;
	return ("rra\n");
}

char	*rrb(t_stack *stack)
{
	int		*tab_b;
	int		i;

	if (stack->len_b < 2)
		return ("");
	if (!(tab_b = (int*)ft_memalloc(sizeof(int) * stack->len_b)))
		return (NULL);
	i = 0;
	tab_b[i] = stack->b[stack->len_b - 1];
	while (i < stack->len_b - 1)
	{
		tab_b[i + 1] = stack->b[i];
		i++;
	}
	free(stack->b);
	stack->b = tab_b;
	return ("rrb\n");
}

char	*rrr(t_stack *stack)
{
	if (stack->len_a < 2 || stack->len_b < 2)
		return ("");
	rra(stack);
	rrb(stack);
	return ("rrr\n");
}
