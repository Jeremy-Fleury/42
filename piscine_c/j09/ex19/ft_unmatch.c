/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_unmatch.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 16:14:56 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/10 16:35:44 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_unmatch(int *tab, int length)
{
	int		i;
	int		j;
	int		result;

	i = 0;
	result = 0;
	while (i < length)
	{
		j = 0;
		while (j < length)
		{
			if (tab[i] == tab[j])
				result++;
			j++;
		}
		if (result % 2 == 1)
			return (tab[i]);
		i++;
		result = 0;
	}
	return (tab[length - 1]);
}
