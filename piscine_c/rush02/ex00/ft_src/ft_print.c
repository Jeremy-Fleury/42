/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_print.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/18 17:33:01 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/19 14:22:33 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../ft_lib.h"

void	ft_print_line(int col, int row, int colle)
{
	ft_putstr("[colle-0");
	ft_putnbr(colle - 1);
	ft_putstr("] [");
	ft_putnbr(col);
	ft_putstr("] [");
	ft_putnbr(row);
	ft_putchar(']');
}

void	ft_print_one_colle(int col, int row, int colle)
{
	ft_print_line(col, row, colle);
	ft_putchar('\n');
}

void	ft_print_two_colle(int col, int row, int colle)
{
	if (colle == 7)
	{
		ft_print_line(col, row, 3);
		ft_putstr(" || ");
		ft_print_line(col, row, 4);
		ft_putchar('\n');
	}
	if (colle == 8)
	{
		ft_print_line(col, row, 3);
		ft_putstr(" || ");
		ft_print_line(col, row, 5);
		ft_putchar('\n');
	}
	if (colle == 9)
	{
		ft_print_line(col, row, 4);
		ft_putstr(" || ");
		ft_print_line(col, row, 5);
		ft_putchar('\n');
	}
}

void	ft_print_three_colle(int col, int row)
{
	ft_print_line(col, row, 3);
	ft_putstr(" || ");
	ft_print_line(col, row, 4);
	ft_putstr(" || ");
	ft_print_line(col, row, 5);
	ft_putchar('\n');
}

void	ft_print(int col, int row, int colle)
{
	if (colle == 0)
	{
		ft_putstr("aucune");
		ft_putchar('\n');
	}
	if (colle > 0 && colle < 6)
		ft_print_one_colle(col, row, colle);
	if (colle > 5 && colle < 10)
		ft_print_two_colle(col, row, colle);
	if (colle == 12)
		ft_print_three_colle(col, row);
}
