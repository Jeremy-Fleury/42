/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_is_prime.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/06 17:41:41 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/07 12:02:19 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_is_prime(int nb)
{
	int temp;

	temp = 3;
	if (nb < 2)
		return (0);
	if (nb == 2 || nb == 3)
		return (1);
	while (nb % temp != 0 && temp < nb)
		temp = temp + 2;
	if (temp == nb)
		return (1);
	else
		return (0);
}
