/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_concat_params.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/13 18:07:45 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/14 12:48:06 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>

int		ft_strlen_params(char **argv)
{
	int		i;
	int		j;

	i = 1;
	j = 0;
	while (argv[i] != '\0')
	{
		while (argv[i][j] != '\0')
			j++;
		j++;
		i++;
	}
	j++;
	return (j);
}

char	*ft_print(char **argv, char *str)
{
	int		i;
	int		j;
	int		k;

	i = 1;
	k = 0;
	while (argv[i] != '\0')
	{
		j = 0;
		while (argv[i][j] != '\0')
		{
			str[k] = argv[i][j];
			k++;
			j++;
		}
		str[k] = '\n';
		k++;
		i++;
	}
	str[k - 1] = '\0';
	return (str);
}

char	*ft_concat_params(int argc, char **argv)
{
	int		k;
	char	*str;

	(void)argc;
	k = ft_strlen_params(argv);
	if (!(str = (char*)malloc(sizeof(*str) * k)))
		return (NULL);
	ft_print(argv, str);
	return (str);
}
