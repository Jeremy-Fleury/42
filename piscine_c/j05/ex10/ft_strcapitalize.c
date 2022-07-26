/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcapitalize.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/08 13:31:18 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/09 17:56:59 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

char	*ft_strlowcase(char *str)
{
	int		i;

	i = 0;
	while (str[i] != '\0')
	{
		if (str[i] >= 'A' && str[i] <= 'Z')
			str[i] = str[i] + 32;
		i++;
	}
	return (str);
}

char	*ft_strcapitalize(char *str)
{
	int		i;

	i = 0;
	str = ft_strlowcase(str);
	while (str[i] != '\0')
	{
		if ((str[i - 1] < 97) || (str[i - 1] > 122))
		{
			if ((str[i] > 96 && str[i] < 123) && (str[i - 1] < 65 ||
				str[i - 1] > 90) && (str[i - 1] < 48 || str[i - 1] > 57))
				str[i] = str[i] - 32;
		}
		i++;
	}
	return (str);
}
