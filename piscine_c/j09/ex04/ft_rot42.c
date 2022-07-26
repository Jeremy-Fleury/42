/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_rot42.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/10 10:41:41 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/10 11:33:42 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

void	ft_putchar(char c);

char	*ft_rot42(char *str)
{
	int		i;

	i = 0;
	while (str[i] != '\0')
	{
		if (str[i] >= 'a' && str[i] <= 'z')
		{
			if (str[i] + 16 > 'z')
				str[i] = str[i] - 10;
			else
				str[i] = str[i] + 16;
		}
		if (str[i] >= 'A' && str[i] <= 'Z')
		{
			if (str[i] + 16 > 'Z')
				str[i] = str[i] - 10;
			else
				str[i] = str[i] + 16;
		}
		i++;
	}
	return (str);
}
