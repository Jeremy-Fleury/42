/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_print_comb2.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/01 13:44:00 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/01 18:26:50 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void	ft_putchar(char c);

void	ft_print(int nb)
{
	ft_putchar((nb / 10) + 48);
	ft_putchar((nb % 10) + 48);
}

void	ft_print_comb2(void)
{
	int		a;
	int		b;

	a = 0;
	b = 1;
	while (a < 99)
	{
		if (a <= b)
		{
			ft_print(a);
			ft_putchar(' ');
			ft_print(b);
			if (a != 98 || b != 99)
			{
				ft_putchar(',');
				ft_putchar(' ');
			}
		}
		b++;
		if (b > 99)
		{
			a++;
			b = a + 1;
		}
	}
}
