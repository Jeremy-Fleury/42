/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_destroy.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 11:48:14 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/10 11:52:27 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ultimator.h"
#include <stdlib.h>

void	ft_destroy(char ***factory)
{
	int		i;

	i = 0;
	while (*factory[i] != '\0')
	{
		free(factory[i]);
		i++;
	}
	i = 0;
	while (factory[i] != '\0')
	{
		free(factory[i]);
		i++;
	}
	free(factory);
}
