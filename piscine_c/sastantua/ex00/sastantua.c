/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sastantua.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/04 01:46:35 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/06 12:04:30 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>

void	ft_putchar(char c)
{
	write(1, &c, 1);
}

int		ft_delete_space(int i, int size)
{
	if (size > 5 && size != 6)
		i = i - size + 6;
	if (size == 6)
		i--;
	while (size > 11)
	{
		i--;
		if (size == 13)
			i++;
		if (size == 18 || size == 20)
			i--;
		size--;
	}
	return (i);
}

int		ft_compute_size_line(int size)
{
	int		sizeline;
	int		i;
	int		j;
	int		c;

	i = 2;
	j = 6;
	c = 0;
	while (c < size - 1)
	{
		i = i + j;
		if (i % 2 == 0)
			j++;
		c++;
	}
	i = ft_delete_space(i, size);
	sizeline = ((size * size) + (9 * size) + 5);
	sizeline = (sizeline - i - 10);
	return (sizeline);
}

void	ft_compute_space(int space)
{
	int		i;

	i = 0;
	while (i < space)
	{
		ft_putchar(' ');
		i++;
	}
}

void	ft_print_floor(int size, int floor, int x, int line)
{
	int		door;
	int		i;

	door = 1 + 2 * ((floor - 1) / 2);
	i = 0;
	while (i < x)
	{
		if (i == 0)
			ft_putchar('/');
		else if ((floor == size) && i >= ((x - door) / 2) && i < (x + door) / 2
		&& (2 + floor - line) <= door)
		{
			if ((door >= 5) && line == ((2 + floor) - (door / 2) - 1) &&
			(i == ((x + door) / 2) - 2))
				ft_putchar('$');
			else
				ft_putchar('|');
		}
		else if (i == x - 1)
			ft_putchar('\\');
		else
			ft_putchar('*');
		i++;
	}
}

void	sastantua(int size)
{
	int		x;
	int		y;
	int		line;
	int		floor;

	floor = 1;
	x = 1;
	if (size > 0)
	{
		while (size >= floor)
		{
			y = 2 + floor;
			line = 0;
			while (line < y)
			{
				x = x + 2;
				ft_compute_space(ft_compute_size_line(size) - (x / 2));
				ft_print_floor(size, floor, x, line);
				ft_putchar('\n');
				line++;
			}
			floor++;
			x = x + 4 + 2 * ((floor - 2) / 2);
		}
	}
}

int		main(void)
{
	sastantua(9);
	return (0);
}
