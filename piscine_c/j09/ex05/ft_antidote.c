/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_antidote.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 11:10:12 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/10 11:32:42 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_sort(int *tab)
{
	int		c;
	int		check;
	int		temp;

	c = 0;
	check = 0;
	while (check == 0)
	{
		check = 1;
		while (c < 3)
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
	return (tab[1]);
}

int		ft_antidote(int i, int j, int k)
{
	int		tab[3];

	tab[0] = i;
	tab[1] = j;
	tab[2] = k;
	return (ft_sort(tab));
}
