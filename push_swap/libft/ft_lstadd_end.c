/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstadd_end.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/12 13:54:26 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/12 13:54:28 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	ft_lstadd_end(t_list **alst, t_list *elem)
{
	t_list *end;

	if (alst == NULL || elem == NULL)
		return ;
	end = *alst;
	while (end->next != NULL)
		end = end->next;
	end->next = elem;
	elem->next = NULL;
}
