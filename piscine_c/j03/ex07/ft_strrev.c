/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strrev.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/02 13:56:40 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/03 11:54:02 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int		ft_strlen(char *str)
{
	int		counter;

	counter = 0;
	while (str[counter] != '\0')
		counter++;
	return (counter);
}

char	*ft_strrev(char *str)
{
	char	stra;
	int		start;
	int		end;

	start = 0;
	end = ft_strlen(str);
	end--;
	while (start < end)
	{
		stra = str[end];
		str[end] = str[start];
		str[start] = stra;
		start++;
		end--;
	}
	return (str);
}
