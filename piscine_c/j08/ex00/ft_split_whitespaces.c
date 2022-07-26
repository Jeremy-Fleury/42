/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_split_whitespaces.c                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/15 22:47:30 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/15 22:47:33 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int		ft_strlen_word(char *str)
{
	int		i;
	int		counter_word;

	i = 0;
	counter_word = 0;
	while (str[i] != '\0')
	{
		if ((str[i] != ' ' && str[i] != '\t' && str[i] != '\n') &&
		(str[i + 1] == ' ' || str[i + 1] == '\t' ||
		str[i + 1] == '\n' || str[i + 1] == '\0'))
			counter_word++;
		i++;
	}
	return (counter_word);
}

char	*ft_strdup_space(char *src, int i)
{
	int		j;
	char	*str;

	j = 0;
	while (src[i] != '\0' && src[i] != ' ' && src[i] != '\t' && src[i] != '\n')
	{
		i++;
		j++;
	}
	str = (char*)malloc(sizeof(*str) * (j + 1));
	if (str == NULL)
		return (NULL);
	i = i - j;
	j = 0;
	while (src[i] != '\0' && src[i] != ' ' && src[i] != '\t' && src[i] != '\n')
	{
		str[j] = src[i];
		i++;
		j++;
	}
	str[j] = '\0';
	return (str);
}

char	**ft_split_whitespaces(char *str)
{
	int		i;
	int		j;
	int		counter_word;
	char	**final_str;

	i = 0;
	j = 0;
	counter_word = ft_strlen_word(str);
	final_str = (char**)malloc(sizeof(char*) * (counter_word + 1));
	final_str[counter_word] = 0;
	while (str[i] != 0)
	{
		if ((str[i] != ' ' && str[i] != '\t' && str[i] != '\n') &&
			(str[i - 1] == ' ' || str[i - 1] == '\t' ||
			str[i - 1] == '\n' || str[i - 1] == 0))
		{
			final_str[j] = ft_strdup_space(str, i);
			j++;
		}
		i++;
	}
	return (final_str);
}
