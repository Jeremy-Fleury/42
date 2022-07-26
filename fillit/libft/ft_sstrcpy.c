/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sstrcpy.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/23 14:12:08 by jfleury           #+#    #+#             */
/*   Updated: 2018/11/23 15:41:40 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"
#include <string.h>

char	**ft_sstrcpy(char **dest, char const **src)
{
	while (*src != 0 && *dest != 0)
	{
		ft_strcpy(*dest, *src);
		src++;
		dest++;
	}
	return (dest);
}
