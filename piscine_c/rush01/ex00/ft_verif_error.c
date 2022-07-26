/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   verif_error.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ygeny <marvin@42.fr>                       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/11 18:08:21 by ygeny             #+#    #+#             */
/*   Updated: 2018/08/12 23:32:08 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>

void	ft_print_error(void)
{
	write(2, "Error\n", 6);
}

int		ft_check_char(char *str)
{
	int	e;

	e = 0;
	while (str[e])
	{
		if ((str[e] < '1' && str[e] > '9') && str[e] != '.')
			return (1);
		e++;
	}
	return (0);
}

int		ft_check_nb(char *str)
{
	int	e;
	int	verif;

	verif = ft_check_char(str);
	e = 0;
	while (str[e])
		e++;
	if (e == 9 && verif == 1)
		return (1);
	return (0);
}

int		ft_check(char **argv)
{
	int	i;
	int	verif;

	verif = 0;
	i = 1;
	while (argv[i])
	{
		verif = ft_check_nb(argv[i]);
		if (verif == 1)
		{
			ft_print_error();
			return (0);
		}
		i++;
	}
	if (i != 10)
	{
		ft_print_error();
		return (0);
	}
	return (1);
}

int		ft_check_match(int **grille, int **grille2)
{
	int		i;
	int		j;
	int		check;

	i = 0;
	check = 0;
	while (i < 9)
	{
		j = 0;
		while (j < 9)
		{
			if (grille[i][j] == grille2[i][j])
				check++;
			j++;
		}
		i++;
	}
	if (check == 80)
		return (1);
	else
		return (0);
}
