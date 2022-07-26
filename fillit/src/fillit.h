/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fillit.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/22 13:54:08 by jfleury           #+#    #+#             */
/*   Updated: 2018/12/03 14:13:30 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FILLIT_H
# define FILLIT_H

# include <string.h>
# include <unistd.h>
# include <stdlib.h>
# include "../libft/libft.h"

typedef struct		s_tetri
{
	int				**c;
	int				w_l;
	int				w_r;
	int				h_b;
	struct s_tetri	*next;
}					t_tetri;

t_tetri				*ft_tetrinew(char **shape);
void				ft_tetriadd_end(t_tetri **atetri, t_tetri *new);
void				ft_tetri_del(t_tetri **atetri, void (*del)(void**, int));
t_tetri				**ft_store(char **av);
char				**ft_algo(int count_tetri, t_tetri **atetri, int *size);
int					ft_tetricount(t_tetri *atetri);
int					ft_block_error(char *line);
int					ft_tetri_error(t_tetri *t);

#endif
