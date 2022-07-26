/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   read_new.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: allefebv <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/23 13:59:25 by allefebv          #+#    #+#             */
/*   Updated: 2018/12/03 12:41:29 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"
#include <fcntl.h>

static int	ft_fill(char **shape, t_tetri **atetri)
{
	t_tetri	*newtetri;
	int		ret;

	ret = 0;
	if (!(newtetri = ft_tetrinew(shape)))
		return (0);
	ft_tetriadd_end(atetri, newtetri);
	ret = ft_tetri_error(newtetri);
	if (ret > 8 || ret < 6)
		return (0);
	return (1);
}

static int	ft_check(char **line, t_tetri **atetri, char **shape, int *flag)
{
	static int	i;
	int			ret;

	ret = 0;
	if (*flag == 0 || *flag == 2)
	{
		if (!(ret = ft_block_error(*line)))
			*flag = 1;
		if (**line != '\0' && (*flag == 0 || *flag == 2))
		{
			ft_strcpy(shape[i % 4], *line);
			i++;
			if (i % 4 == 0)
			{
				if (!(ft_fill(shape, atetri)))
					*flag = 1;
			}
		}
		if (**line != '\0' && *flag != 1)
			*flag = 0;
		if (**line == '\0' && *flag != 1)
			*flag = 2;
	}
	free(*line);
	return (ret);
}

static int	ft_read(char **av, char **line, t_tetri **atetri)
{
	char	**shape;
	int		ret;
	int		fd;
	int		flag;
	int		check;

	flag = 0;
	check = 0;
	fd = open(av[1], O_RDONLY);
	if (!(shape = (char**)ft_memtab(4, 4)))
		return (0);
	while ((ret = get_next_line(fd, line)) > 0)
		check = ft_check(line, atetri, shape, &flag);
	if (check % 5 != 4)
		flag = 1;
	close(fd);
	if (flag == 2)
		flag = 1;
	free(*line);
	ft_sstrdel((void**)shape, 4);
	if (ret == -1 || flag == 1)
		return (0);
	return (1);
}

t_tetri		**ft_store(char **av)
{
	t_tetri			**atetri;
	char			*line;

	if (!(atetri = (t_tetri**)ft_memalloc(sizeof(t_tetri*) * 1)))
		return (NULL);
	*atetri = NULL;
	line = NULL;
	if (!(ft_read(av, &line, atetri)))
	{
		ft_tetri_del(atetri, ft_sstrdel);
		free(atetri);
		return (NULL);
	}
	return (atetri);
}
