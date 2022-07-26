/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strjoin.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/19 22:50:27 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/19 22:53:04 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../ft_lib.h"

char	*ft_strjoin(char *str1, char *str2)
{
	int		len;
	int		i;
	int		j;
	char	*ret;

	i = 0;
	j = 0;
	len = ft_strlen(str1) + ft_strlen(str2);
	ret = malloc(sizeof(char) * len + 1);
	while (str1[i])
		ret[j++] = str1[i++];
	i = 0;
	while (str2[i])
		ret[j++] = str2[i++];
	ret[j] = 0;
	free(str1);
	free(str2);
	return (ret);
}
