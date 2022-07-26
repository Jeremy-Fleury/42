/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort_integer_table.c                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/02 23:09:02 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/03 11:51:16 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void	ft_sort_integer_table(int *tab, int size)
{
	int		temp;
	int		c;
	int		check;

	c = 0;
	check = 0;
	while (check == 0)
	{
		check = 1;
		while (c < size - 1)
		{
			if (tab[c] > tab[c + 1])
			{
				temp = tab[c];
				tab[c] = tab[c + 1];
				tab[c + 1] = temp;
				check = 0;
			}
			c++;
		}
		c = 0;
	}
}
