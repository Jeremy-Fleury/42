/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strsplit.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/13 10:02:06 by jfleury           #+#    #+#             */
/*   Updated: 2018/11/14 13:30:58 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include <string.h>

static int		ft_strlen_word(char const *str, char c)
{
	int		i;
	int		counter_word;

	i = 0;
	counter_word = 0;
	while (str[i] != '\0')
	{
		if ((str[i] != c && (str[i + 1] == c || str[i + 1] == '\0')))
			counter_word++;
		i++;
	}
	return (counter_word);
}

static char		*ft_strdup_split(char const *src, int i, char c)
{
	int		j;
	char	*str;

	j = 0;
	while (src[i] != '\0' && src[i] != c)
	{
		i++;
		j++;
	}
	if (!(str = (char*)malloc(sizeof(*str) * (j + 1))))
		return (NULL);
	i = i - j;
	j = 0;
	while (src[i] != '\0' && src[i] != c)
	{
		str[j] = src[i];
		i++;
		j++;
	}
	str[j] = '\0';
	return (str);
}

char			**ft_strsplit(char const *s, char c)
{
	int		i;
	int		j;
	int		counter_word;
	char	**final_str;

	if (s == NULL)
		return (NULL);
	i = 0;
	j = 0;
	counter_word = ft_strlen_word(s, c);
	if (!(final_str = (char**)malloc(sizeof(char*) * (counter_word + 1))))
		return (NULL);
	final_str[counter_word] = 0;
	while (s[i] != 0)
	{
		if ((s[i] != c) && (s[i - 1] == c || s[i - 1] == '\0'))
		{
			if (!(final_str[j] = ft_strdup_split(s, i, c)))
				return (NULL);
			j++;
		}
		i++;
	}
	return (final_str);
}
