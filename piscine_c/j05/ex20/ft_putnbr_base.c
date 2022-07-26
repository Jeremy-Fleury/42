/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putnbr_base.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/17 10:12:07 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/17 11:21:02 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void	ft_putstr(char *str);
#include <string.h>
void	ft_putchar(char c);

char	*ft_sort_base(char *str)
{
	int		i;
	int		check;
	char	temp;

	check = 0;
	while (check == 0)
	{
		check = 1;
		i = 0;
		while (str[i] != '\0')
		{
			if (str[i] > str[i + 1] && str[i + 1] != '\0')
			{
				temp = str[i];
				str[i] = str[i + 1];
				str[i + 1] = temp;
				check = 0;
			}
			i++;
		}
	}
	return (str);
}

int		ft_strlen(char *str)
{
	int		i;

	i = 0;
	while (str[i] != '\0')
	{
		if (str[i] == str[i + 1] || str[i] == '-' || str[i] == '+')
			return (0);
		i++;
	}
	return (i);
}

int		ft_putnbr(int nbr, int nb_base)
{
	
}

int		ft_putnbr_base(int nbr, char *base)
{
	int		nb_base;
	
	nbr = 0;
	ft_sort_base(base);
	nb_base = ft_strlen(base);
	if (nb_base == 0 || nb_base == 1)
		return (0);
	ft_putnbr(nbr, nb_base);
	return (0);
}

int		main(void)
{
	char	*str;

	str = strdup("0123456789ABCDEFGH");
	ft_putnbr_base(12, str);
	return (0);
}
