/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_gen_line.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: justasze <justasze@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/18 18:52:37 by mdaoud            #+#    #+#             */
/*   Updated: 2018/08/19 22:41:42 by justasze         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../ft_lib.h"

char	*ft_gen_line(char lst, char lnc, char le, int col)
{
	int		x;
	char	*temp;

	temp = malloc(sizeof(char) * col + 2);
	if (!temp)
		return (NULL);
	temp[0] = lst;
	x = 1;
	while (x < col - 1)
	{
		temp[x] = lnc;
		x++;
	}
	if (col > 1)
	{
		temp[x] = le;
		x++;
	}
	temp[x] = '\n';
	temp[x + 1] = '\0';
	return (temp);
}
