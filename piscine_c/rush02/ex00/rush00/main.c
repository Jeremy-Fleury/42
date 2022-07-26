/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cnoel <cnoel@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/04 08:44:41 by cgiron            #+#    #+#             */
/*   Updated: 2018/08/19 20:43:32 by mdaoud           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../ft_lib.h"

int		ft_atoi(char *str)
{
	int i;
	int nb;
	int neg;

	i = 0;
	nb = 0;
	neg = 1;
	while ((str[i] >= 8 && str[i] <= 13) || (str[i] == ' '))
		i++;
	if (str[i] == '-')
		neg *= -1;
	if (str[i] == '+' || str[i] == '-')
		i++;
	while (str[i] >= '0' && str[i] <= '9')
	{
		nb = nb * 10 + (str[i] - 48);
		i++;
	}
	return (nb * neg);
}

int		main(int argc, char **argv)
{
	int row;
	int col;

	if (argc != 3)
	{
		ft_putchar(INVALID_CHAR);
		return (0);
	}
	col = ft_atoi(argv[1]);
	row = ft_atoi(argv[2]);
	if (col <= 0 || row <= 0)
	{
		ft_putchar(INVALID_CHAR);
		return (0);
	}
	rush(ft_atoi(argv[1]), ft_atoi(argv[2]));
	return (0);
}
