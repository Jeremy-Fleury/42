/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_post_process3.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:26:04 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/07 10:59:53 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

void	ft_rra_nope(char **tab, int *i, int *j)
{
	if (ft_strequ(tab[*i], "rra") == 1)
	{
		*j = *i + 1;
		while (ft_strequ(tab[*j], "NOPE") == 1)
			*j = *j + 1;
		if (ft_strequ(tab[*i], "rra") == 1 && ft_strequ(tab[*j], "ra") == 1)
		{
			free(tab[*i]);
			free(tab[*j]);
			tab[*i] = ft_strdup("NOPE");
			tab[*j] = ft_strdup("NOPE");
			*i = 0;
		}
	}
}

void	ft_rrb_nope(char **tab, int *i, int *j)
{
	if (ft_strequ(tab[*i], "rrb") == 1)
	{
		*j = *i + 1;
		while (ft_strequ(tab[*j], "NOPE") == 1)
			*j = *j + 1;
		if (ft_strequ(tab[*i], "rrb") == 1 && ft_strequ(tab[*j], "rb") == 1)
		{
			free(tab[*i]);
			free(tab[*j]);
			tab[*i] = ft_strdup("NOPE");
			tab[*j] = ft_strdup("NOPE");
			*i = 0;
		}
	}
}
