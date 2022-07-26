/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_change_char_int.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/12 21:59:37 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/12 23:15:43 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int		ft_atoi(char *str);

int		**ft_char_to_int(char **argv, int **grille)
{
	int		i;
	int		j;

	i = 0;
	j = 0;
	while (argv[i + 1])
	{
		while (argv[i + 1][j])
		{
			if (argv[i + 1][j] == '.')
				grille[i][j] = 0;
			else
				grille[i][j] = ft_atoi(&argv[i + 1][j]);
			j++;
		}
		i++;
		j = 0;
	}
	return (grille);
}
