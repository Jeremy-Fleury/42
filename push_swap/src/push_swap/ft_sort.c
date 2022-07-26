/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/26 16:58:25 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/05 20:03:32 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

char	*ft_sort(t_stack *stack, int end, char letter)
{
	t_sort	sort;
	int		start;

	if (letter == 'A')
		start = stack->a[0];
	if (letter == 'B')
		start = stack->b[0];
	if (start != end)
	{
		if (letter == 'A' && ft_check_stack(stack) != 1)
			stack->str = pivot_a(stack, &sort, end);
		else if (letter == 'B' && stack->len_b > 0)
			stack->str = pivot_b(stack, &sort, end);
		if (ft_check_stack(stack) != 1)
			ft_sort(stack, sort.end_a, 'A');
		if (stack->len_b > 0 && sort.end_b != -1)
			ft_sort(stack, sort.end_b, 'B');
	}
	if (ft_check_stack(stack) == 1 && stack->len_b == 1)
		stack->str = ft_strextend(stack->str, pa(stack));
	return (stack->str);
}
