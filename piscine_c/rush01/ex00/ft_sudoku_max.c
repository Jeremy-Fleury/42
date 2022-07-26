/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sudoku.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/11 16:08:24 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/12 22:02:42 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_line_max(int number, int **sudoku, int i)
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

int		ft_column_max(int number, int **sudoku, int j)
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

int		ft_square_max(int number, int **sudoku, int i, int j)
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

int		ft_check_place_max(int **sudoku, int position)
{
	int		i;
	int		j;
	int		number;

	if (position == -1)
		return (1);
	number = 1;
	i = position / 9;
	j = position % 9;
	if (sudoku[i][j] != 0)
		return (ft_check_place_max(sudoku, position - 1));
	while (number <= 9)
	{
		if (ft_line_max(number, sudoku, i) &&
		ft_column_max(number, sudoku, j) && ft_square_max(number, sudoku, i, j))
		{
			sudoku[i][j] = number;
			if (ft_check_place_max(sudoku, position - 1))
				return (1);
		}
		number++;
	}
	sudoku[i][j] = 0;
	return (0);
}
