/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_atoi.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/02 14:06:03 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/04 12:48:04 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_atoi(char *str)
{
	int		number;
	int		c;
	int		signe;

	number = 0;
	c = 0;
	signe = 0;
	while (str[c] != '\0' && (str[c] == '\t' || str[c] == '\n'
	|| str[c] == '\v' || str[c] == '\f' || str[c] == '\r' || str[c] == ' '))
		c++;
	if (str[c] == '-' || str[c] == '+')
	{
		if (str[c] == '-')
			signe = 1;
		c++;
	}
	while (str[c] != '\0' && (str[c] >= '0' && str[c] <= '9'))
	{
		number = ((number * 10) + (str[c] - 48));
		c++;
	}
	if (signe == 1)
		number = -number;
	return (number);
}
