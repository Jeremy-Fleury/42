/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process_p.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:13:55 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/02 12:25:27 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static void		pa2(t_stack *stack, int *tab_a, int *tab_b)
{
	free(stack->a);
	free(stack->b);
	stack->a = tab_a;
	stack->b = tab_b;
	stack->len_a++;
	stack->len_b--;
}

char			*pa(t_stack *stack)
{
	int		*tab_a;
	int		*tab_b;
	int		i;

	if (stack->len_b < 1)
		return ("");
	if (!(tab_a = (int*)ft_memalloc(sizeof(int) * (stack->len_a + 1))))
		return (NULL);
	if (!(tab_b = (int*)ft_memalloc(sizeof(int) * (stack->len_b))))
		return (NULL);
	i = 0;
	tab_a[0] = stack->b[0];
	while (i < stack->len_a)
	{
		tab_a[i + 1] = stack->a[i];
		i++;
	}
	i = 1;
	while (i < stack->len_b)
	{
		tab_b[i - 1] = stack->b[i];
		i++;
	}
	pa2(stack, tab_a, tab_b);
	return ("pa\n");
}

static void		pb2(t_stack *stack, int *tab_a, int *tab_b)
{
	free(stack->a);
	free(stack->b);
	stack->a = tab_a;
	stack->b = tab_b;
	stack->len_a--;
	stack->len_b++;
}

char			*pb(t_stack *stack)
{
	int		*tab_a;
	int		*tab_b;
	int		i;

	if (stack->len_a < 1)
		return ("");
	if (!(tab_b = (int*)ft_memalloc(sizeof(int) * (stack->len_b + 1))))
		return (NULL);
	if (!(tab_a = (int*)ft_memalloc(sizeof(int) * (stack->len_a))))
		return (NULL);
	i = 0;
	tab_b[0] = stack->a[0];
	while (i < stack->len_b)
	{
		tab_b[i + 1] = stack->b[i];
		i++;
	}
	i = 1;
	while (i < stack->len_a)
	{
		tab_a[i - 1] = stack->a[i];
		i++;
	}
	pb2(stack, tab_a, tab_b);
	return ("pb\n");
}
