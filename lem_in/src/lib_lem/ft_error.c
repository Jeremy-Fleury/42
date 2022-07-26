/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_error.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/14 17:12:21 by allefebv          #+#    #+#             */
/*   Updated: 2019/05/16 19:07:33 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

int			ft_malloc_error(int r_value)
{
	ft_printf("Memory Allocation Error\n");
	return (r_value);
}

int			ft_error(int r_value)
{
	ft_printf("Error\n");
	return (r_value);
}
