/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sudoku.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/11 16:08:24 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/12 22:03:42 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_line_min(int number, int **sudoku, int i)
{
	int		j;

	j = 0;
	while (j < 9)
	{
		if (sudoku[i][j] == number)
			return (0);
		j++;
	}
	return (1);
}

int		ft_column_min(int number, int **sudoku, int j)
{
	int		i;

	i = 0;
	while (i < 9)
	{
		if (sudoku[i][j] == number)
			return (0);
		i++;
	}
	return (1);
}

int		ft_square_min(int number, int **sudoku, int i, int j)
{
	int		temp_i;
	int		temp_j;

	temp_i = 3 * (i / 3);
	temp_j = 3 * (j / 3);
	i = temp_i;
	while (i < temp_i + 3)
	{
		j = temp_j;
		while (j < temp_j + 3)
		{
			if (sudoku[i][j] == number)
				return (0);
			j++;
		}
		i++;
	}
	return (1);
}

int		ft_check_place_min(int **sudoku, int position)
{
	int		i;
	int		j;
	int		number;

	number = 1;
	i = position / 9;
	j = position % 9;
	if (position == 81)
		return (1);
	if (sudoku[i][j] != 0)
		return (ft_check_place_min(sudoku, position + 1));
	while (number <= 9)
	{
		if (ft_line_min(number, sudoku, i) &&
		ft_column_min(number, sudoku, j) && ft_square_min(number, sudoku, i, j))
		{
			sudoku[i][j] = number;
			if (ft_check_place_min(sudoku, position + 1))
				return (1);
		}
		number++;
	}
	sudoku[i][j] = 0;
	return (0);
}
