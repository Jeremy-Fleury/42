/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_print.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/15 17:25:30 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/04 14:31:06 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

void		ft_print(t_stack *stack)
{
	int		i;

	i = 0;
	ft_putstr("A = ");
	while (stack->len_a > i)
	{
		ft_putnbr(stack->a[i]);
		ft_putchar(' ');
		i++;
	}
	ft_putstr("\n\nB = ");
	i = 0;
	while (stack->len_b > i)
	{
		ft_putnbr(stack->b[i]);
		ft_putchar(' ');
		i++;
	}
	ft_putstr("\n\n");
}
