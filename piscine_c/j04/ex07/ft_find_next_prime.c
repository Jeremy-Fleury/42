/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_find_next_prime.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/06 20:26:12 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/07 12:07:35 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_find_next_prime(int nb)
{
	int		temp;

	temp = 3;
	if (nb < 2)
		return (2);
	if (nb == 2 || nb == 3)
		return (nb);
	if (nb == 4)
		return (5);
	while (nb <= 2147483647)
	{
		while (nb % temp != 0)
			temp++;
		if (temp == nb)
			return (nb);
		temp = 3;
		nb++;
	}
	return (nb);
}
