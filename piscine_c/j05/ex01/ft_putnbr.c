/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/01 14:13:42 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/06 00:15:04 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void			ft_putchar(char c);

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
