/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_s.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:13:36 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/02 12:13:41 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

char	*sa(t_stack *stack)
{
	int		tmp;

	if (stack->len_a < 2)
		return ("");
	tmp = stack->a[0];
	stack->a[0] = stack->a[1];
	stack->a[1] = tmp;
	return ("sa\n");
}

char	*sb(t_stack *stack)
{
	int		tmp;

	if (stack->len_b < 2)
		return ("");
	tmp = stack->b[0];
	stack->b[0] = stack->b[1];
	stack->b[1] = tmp;
	return ("sb\n");
}

char	*ss(t_stack *stack)
{
	if (stack->len_a < 2 || stack->len_b < 2)
		return ("");
	sa(stack);
	sb(stack);
	return ("ss\n");
}
