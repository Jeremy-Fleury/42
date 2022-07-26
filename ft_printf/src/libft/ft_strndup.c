/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strndup.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/15 17:33:47 by allefebv          #+#    #+#             */
/*   Updated: 2019/01/16 16:43:54 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_strndup(const char *s, size_t len)
{
	char	*strcpy;

	if (ft_strlen(s) > len)
	{
		if (!(strcpy = (char*)malloc(sizeof(char) * (len + 1))))
			return (NULL);
		ft_strncpy(strcpy, s, len);
	}
	else
	{
		if (!(strcpy = ft_strdup(s)))
			return (NULL);
	}
	return (strcpy);
}
