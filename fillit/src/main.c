/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/22 13:54:03 by jfleury           #+#    #+#             */
/*   Updated: 2018/11/30 15:45:53 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

static void	ft_free_main(char **grid, int *size_grid, t_tetri **atetri)
{
	ft_sstrdel((void**)grid, *size_grid);
	free(size_grid);
	free(atetri);
}

int			main(int ac, char **av)
{
	t_tetri	**atetri;
	char	**grid;
	int		count_tetri;
	int		*size_grid;

	if (ac != 2)
	{
		ft_putstr("usage: ./fillit source_file\n");
		return (0);
	}
	size_grid = (int*)malloc(sizeof(int) * 1);
	*size_grid = 2;
	if (!((atetri = ft_store(av))))
	{
		ft_putstr("error\n");
		free(size_grid);
		free(atetri);
		return (0);
	}
	count_tetri = ft_tetricount(*atetri);
	grid = ft_algo(count_tetri, atetri, size_grid);
	ft_tetri_del(atetri, ft_sstrdel);
	ft_sstrprint(grid);
	ft_free_main(grid, size_grid, atetri);
	return (0);
}
