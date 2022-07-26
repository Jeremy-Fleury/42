/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_post_process.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/27 15:17:39 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/12 13:33:56 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static char		**ft_reduct(char **tab)
{
	int		i;
	int		j;

	i = 0;
	j = 0;
	while (tab[i + 1] != 0)
	{
		ft_ra_nope(tab, &i, &j);
		ft_rb_nope(tab, &i, &j);
		ft_pa_nope(tab, &i, &j);
		ft_pb_nope(tab, &i, &j);
		ft_rra_nope(tab, &i, &j);
		ft_rrb_nope(tab, &i, &j);
		i++;
	}
	return (tab);
}

char			**ft_post_process(char *str)
{
	char	**tab;

	tab = ft_strsplit(str, '\n');
	tab = ft_reduct(tab);
	return (tab);
}
