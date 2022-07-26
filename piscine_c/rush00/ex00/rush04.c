/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   rush04.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/03 22:59:45 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/18 12:18:44 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void	ft_putchar(char c);

void	ft_print_first_line(int x)
{
	if (x > 0)
	{
		ft_putchar('A');
		if (x == 1)
			ft_putchar('\n');
	}
	while (x > 2)
	{
		ft_putchar('B');
		x--;
	}
	if (x > 1)
	{
		ft_putchar('C');
		ft_putchar('\n');
	}
}

void	ft_print_middel_line(int x)
{
	if (x > 0)
	{
		ft_putchar('B');
		if (x == 1)
			ft_putchar('\n');
	}
	while (x > 2)
	{
		ft_putchar(' ');
		x--;
	}
	if (x > 1)
	{
		ft_putchar('B');
		ft_putchar('\n');
	}
}

void	ft_print_end_line(int x)
{
	if (x > 0)
	{
		ft_putchar('C');
		if (x == 1)
			ft_putchar('\n');
	}
	while (x > 2)
	{
		ft_putchar('B');
		x--;
	}
	if (x > 1)
	{
		ft_putchar('A');
		ft_putchar('\n');

	}
}

void	rush(int x, int y)
{
	if (x > 0 && y > 0)
	{
		if (x > 0)
			ft_print_first_line(x);
		while (y > 2)
		{
			ft_print_middel_line(x);
			y--;
		}
		if (y > 1)
		{
			ft_print_end_line(x);
		}	

	}
}
