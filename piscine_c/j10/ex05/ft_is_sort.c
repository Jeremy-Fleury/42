/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_is_sort.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/20 22:01:20 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/21 22:07:59 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_is_sort(int *tab, int length, int (*f)(int, int))
{
	int		i;

	i = 0;
	while (i < length && (f(tab[i], tab[i + 1]) <= 0))
		i++;
	if (i == length)
		return (1);
	i = 0;
	while (i < length && (f(tab[i], tab[i + 1]) >= 0))
		i++;
	if (i == length)
		return (1);
	return (0);
}
