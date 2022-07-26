/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_post_process2.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:27:46 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/07 10:59:42 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

void	ft_ra_nope(char **tab, int *i, int *j)
{
	if (ft_strequ(tab[*i], "ra") == 1)
	{
		*j = *i + 1;
		while (ft_strequ(tab[*j], "NOPE") == 1)
			*j = *j + 1;
		if (ft_strequ(tab[*i], "ra") == 1 && ft_strequ(tab[*j], "rra") == 1)
		{
			free(tab[*i]);
			free(tab[*j]);
			tab[*i] = ft_strdup("NOPE");
			tab[*j] = ft_strdup("NOPE");
			*i = 0;
		}
	}
}

void	ft_rb_nope(char **tab, int *i, int *j)
{
	if (ft_strequ(tab[*i], "rb") == 1)
	{
		*j = *i + 1;
		while (ft_strequ(tab[*j], "NOPE") == 1)
			*j = *j + 1;
		if (ft_strequ(tab[*i], "rb") == 1 && ft_strequ(tab[*j], "rrb") == 1)
		{
			free(tab[*i]);
			free(tab[*j]);
			tab[*i] = ft_strdup("NOPE");
			tab[*j] = ft_strdup("NOPE");
			*i = 0;
		}
	}
}

void	ft_pa_nope(char **tab, int *i, int *j)
{
	if (ft_strequ(tab[*i], "pa") == 1)
	{
		*j = *i + 1;
		while (ft_strequ(tab[*j], "NOPE") == 1)
			*j = *j + 1;
		if (ft_strequ(tab[*i], "pa") == 1 && ft_strequ(tab[*j], "pb") == 1)
		{
			free(tab[*i]);
			free(tab[*j]);
			tab[*i] = ft_strdup("NOPE");
			tab[*j] = ft_strdup("NOPE");
			*i = 0;
		}
	}
}

void	ft_pb_nope(char **tab, int *i, int *j)
{
	if (ft_strequ(tab[*i], "pb") == 1)
	{
		*j = *i + 1;
		while (ft_strequ(tab[*j], "NOPE") == 1)
			*j = *j + 1;
		if (ft_strequ(tab[*i], "pb") == 1 && ft_strequ(tab[*j], "pa") == 1)
		{
			free(tab[*i]);
			free(tab[*j]);
			tab[*i] = ft_strdup("NOPE");
			tab[*j] = ft_strdup("NOPE");
			*i = 0;
		}
	}
}
