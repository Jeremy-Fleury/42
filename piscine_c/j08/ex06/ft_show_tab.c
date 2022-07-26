/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_show_tab.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/16 14:26:24 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/16 16:21:11 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_stock_par.h"

unsigned int	ft_negatif(int nb)
{
	unsigned int	nbr;

	if (nb < 0)
	{
		nbr = -nb;
		ft_putchar('-');
	}
	else
		nbr = nb;
	return (nbr);
}

void			ft_putnbr(int nb)
{
	unsigned int	nbr;
	int				counter;
	char			tab[11];

	nbr = ft_negatif(nb);
	counter = 1;
	if (nbr == 0)
		ft_putchar(nbr + 48);
	else
	{
		while (nbr > 0)
		{
			tab[counter] = nbr % 10;
			nbr = nbr / 10;
			counter++;
		}
		counter--;
		while (counter != 0)
		{
			ft_putchar(tab[counter] + 48);
			counter--;
		}
	}
}

void			ft_putstr(char *str)
{
	int		i;

	i = 0;
	while (str[i] != '\0')
	{
		ft_putchar(str[i]);
		i++;
	}
}

void			ft_print_words_tables(char **tab)
{
	int		i;

	i = 0;
	while (tab[i] != 0)
	{
		ft_putstr(tab[i]);
		ft_putchar('\n');
		i++;
	}
}

void			ft_show_tab(struct s_stock_par *par)
{
	int		i;

	i = 0;
	while (par[i].str != '\0')
	{
		ft_putstr(par[i].copy);
		ft_putchar('\n');
		ft_putnbr(par[i].size_param);
		ft_putchar('\n');
		ft_print_words_tables(par[i].tab);
		i++;
	}
}
