/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_read_to_tab.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: justasze <justasze@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/18 10:20:25 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/19 22:37:41 by justasze         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../ft_lib.h"

char	*ft_realloc(char *src, int size)
{
	char	*str;
	int		size_malloc;

	size_malloc = ft_strlen(src) + 1 + size;
	if (!(str = (char*)malloc(sizeof(char) * (size_malloc))))
		return (NULL);
	ft_bzero(str, size_malloc);
	str = ft_strcpy(str, src);
	free(src);
	src = NULL;
	return (str);
}

int		check_buff(char *buff, int size)
{
	int		i;
	char	c;

	i = 0;
	while (i < size)
	{
		c = buff[i];
		if (c != 'o' && c != ' ' && c != '-' && c != '|' &&
				c != 'A' && c != 'B' && c != 'C' &&
				c != '/' && c != '*' && c != '\\' && c != '\n')
			return (0);
		i++;
	}
	return (1);
}

char	*ft_read_to_tab(void)
{
	char	buff[BUFF_SIZE + 1];
	char	*str;
	int		ret;

	if (!(str = malloc(sizeof(str) * BUFF_SIZE + 1)))
		return (NULL);
	ft_bzero(str, BUFF_SIZE + 1);
	while ((ret = read(0, buff, BUFF_SIZE)) != 0)
	{
		buff[ret] = '\0';
		if (!check_buff(buff, ret))
		{
			free(str);
			str = NULL;
			return (NULL);
		}
		str = ft_realloc(str, ret);
		ft_strcat(str, buff);
	}
	if (str[0] == '\0' || str[0] == '\n')
		str[0] = INVALID_CHAR;
	return (str);
}
