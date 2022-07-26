/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_store.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/27 16:06:41 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/12 15:42:28 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static	char	**ft_error_store(char *tmp, char *line)
{
	free(tmp);
	free(line);
	return (NULL);
}

static int		ft_check(char *str)
{
	if (!((ft_strequ(str, "sa")) || (ft_strequ(str, "sb"))
		|| (ft_strequ(str, "ss")) || (ft_strequ(str, "pa"))
		|| (ft_strequ(str, "pb")) || (ft_strequ(str, "ra"))
		|| (ft_strequ(str, "rb")) || (ft_strequ(str, "rr"))
		|| (ft_strequ(str, "rra")) || (ft_strequ(str, "rrb"))
		|| (ft_strequ(str, "rrr"))))
		return (0);
	return (1);
}

static char		**ft_return(int ret, char *tmp, char *line, int *flag2)
{
	char	**process;

	process = NULL;
	if (ret == 0)
	{
		if (!(process = ft_strsplit(tmp, ' ')))
			return (ft_error_store(tmp, line));
		free(tmp);
		free(line);
		*flag2 = 1;
		return (process);
	}
	else
	{
		free(tmp);
		return (NULL);
	}
}

char			**ft_store(int *flag2)
{
	char	*line;
	char	*tmp;
	int		ret;

	if (!(tmp = ft_strnew(0)))
		return (NULL);
	while ((ret = get_next_line(0, &line)) == 1)
	{
		if (ft_check(line) == 0)
		{
			ret = -1;
			free(line);
			break ;
		}
		if (!(tmp = ft_strextend(tmp, line)))
			return (ft_error_store(tmp, line));
		if (!(tmp = ft_strextend(tmp, " ")))
			return (ft_error_store(tmp, line));
		free(line);
	}
	return (ft_return(ret, tmp, line, flag2));
}
