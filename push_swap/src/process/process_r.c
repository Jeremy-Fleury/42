/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_r.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:14:04 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/02 12:14:05 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

char	*ra(t_stack *stack)
{
	int		*tab_a;
	int		i;

	if (stack->len_a < 2)
		return ("");
	if (!(tab_a = (int*)ft_memalloc(sizeof(int) * stack->len_a)))
		return (NULL);
	tab_a[stack->len_a - 1] = stack->a[0];
	i = 0;
	while (i < stack->len_a - 1)
	{
		tab_a[i] = stack->a[i + 1];
		i++;
	}
	free(stack->a);
	stack->a = tab_a;
	return ("ra\n");
}

char	*rb(t_stack *stack)
{
	int		*tab_b;
	int		i;

	if (stack->len_b < 2)
		return ("");
	if (!(tab_b = (int*)ft_memalloc(sizeof(int) * stack->len_b)))
		return (NULL);
	tab_b[stack->len_b - 1] = stack->b[0];
	i = 0;
	while (i < stack->len_b - 1)
	{
		tab_b[i] = stack->b[i + 1];
		i++;
	}
	free(stack->b);
	stack->b = tab_b;
	return ("rb\n");
}

char	*rr(t_stack *stack)
{
	if (stack->len_a < 2 || stack->len_b < 2)
		return ("");
	ra(stack);
	rb(stack);
	return ("rr\n");
}
