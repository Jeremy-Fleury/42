/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ygeny <marvin@42.fr>                       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/11 16:55:59 by ygeny             #+#    #+#             */
/*   Updated: 2018/08/12 23:30:21 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>
#include <stdlib.h>

int		ft_check(char **argv);
int		ft_char_to_int(char **argv, int **grille);
int		ft_check_place_min(int **sudoku, int position);
int		ft_check_place_max(int **sudoku, int position);
int		ft_check_match(int **grille, int **grille2);
void	ft_print(int **grille);
void	ft_print_error(void);

int		main(int argc, char **argv)
{
	int	verif[2];
	int **grille;
	int	**grille_min;
	int	i;

	argc = 10;
	grille = (int**)malloc(sizeof(int*) * 9 + 1);
	grille_min = (int**)malloc(sizeof(int*) * 9 + 1);
	i = 0;
	while (i < 10)
	{
		*(grille + i) = (int*)malloc(sizeof(int) * 9 + 1);
		*(grille_min + i) = (int*)malloc(sizeof(int) * 9 + 1);
		i++;
	}
	verif[0] = ft_check(argv);
	if (verif[0] == 0)
	{
		ft_print_error();
		return (0);
	}
	ft_char_to_int(argv, grille);
	ft_check_place_min(grille_min, 0);
	ft_print(grille_min);
	return (0);
}
