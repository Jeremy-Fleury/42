/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstmanage.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/30 11:23:40 by jfleury           #+#    #+#             */
/*   Updated: 2018/12/03 14:08:58 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

void		ft_tetriadd_end(t_tetri **atetri, t_tetri *newtetri)
{
	t_tetri	*tmp;

	if (atetri == NULL || newtetri == NULL)
		return ;
	tmp = *atetri;
	if (*atetri == NULL)
	{
		*atetri = newtetri;
	}
	else
	{
		while (tmp->next != NULL)
			tmp = tmp->next;
		tmp->next = newtetri;
	}
}

int			ft_tetricount(t_tetri *atetri)
{
	int	i;

	i = 0;
	while (atetri != NULL)
	{
		i++;
		atetri = atetri->next;
	}
	return (i);
}

static void	ft_tetridelone(t_tetri **atetri, void (*del)(void**, int))
{
	del((void**)(*atetri)->c, 4);
	free(*atetri);
	*atetri = NULL;
}

void		ft_tetri_del(t_tetri **atetri, void (*del)(void**, int))
{
	t_tetri	*save_next;

	while (*atetri != NULL)
	{
		save_next = (*atetri)->next;
		ft_tetridelone(atetri, del);
		*atetri = save_next;
	}
}
