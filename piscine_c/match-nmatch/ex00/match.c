/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   match.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/11 10:59:13 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/13 12:45:19 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
void	ft_putnbr(int nb);

int		match(char *s1, char *s2)
{
	if (*s1 == '\0' && *s2 == '\0')
		return (1);
	else if (*s1 == *s2 && *s1 != '*')
		return (match(s1 + 1, s2 + 1));
	else if (*s2 == '*')
	{
		if (*s1 == '\0')
			return (match(s1, s2 + 1));
		else
			return ((match(s1 + 1, s2) && printf("A "))  + (match(s1, s2 + 1) && printf("B ")));
	}
	else if (*s1 == '\0' || *s2 == '\0')
		return (0);
	else
		return (0);
}

int		main(int argc, char **argv)
{
	char	*str;
	char	*str2;

	str = strdup(argv[1]);
	str2 = strdup(argv[2]);
	ft_putnbr(match(str, str2));
	return (0);
}
