/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lemin.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/19 12:34:08 by jfleury           #+#    #+#             */
/*   Updated: 2019/05/16 19:07:47 by allefebv         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef LEMIN_H
# define LEMIN_H

# include <stdlib.h>
# include <string.h>
# include <unistd.h>
# include "libft.h"

# define HASH_TAB 20011

typedef	struct			s_neighbor
{
	void				*room;
	int					flow;
	int					storage_flow;
	struct s_neighbor	*next;
}						t_neighbor;

typedef struct			s_room
{
	char				*name;
	char				*x;
	char				*y;
	int					flow;
	int					src_neigh;
	int					weight;
	short				visited;
	short				upstream;
	t_neighbor			*neighbor;
	int					ant;
	struct s_room		*source;
	struct s_room		*next;
}						t_room;

typedef struct			s_coord
{
	int					x;
	int					y;
	struct s_coord		*next;
}						t_coord;

typedef struct			s_data
{
	long long			nb_ants;
	int					nb_path;
	int					nb_room;
	int					flag_print;
	t_room				*start_room;
	t_room				*end_room;
	t_list				**instructions;
}						t_data;

typedef	struct			s_path
{
	t_room				**path;
	t_room				*end;
	int					length;
	int					ants;
	int					steps;
}						t_path;

typedef struct			s_bfs
{
	t_room				*tmp_r;
	t_room				*tmp_r2;
	t_neighbor			*tmp_n;
}						t_bfs;

typedef struct			s_dispatch
{
	int					nb_path;
	int					sum_len;
	int					unplaced_ants;
	int					flag;
}						t_dispatch;

unsigned int			ft_hash(char *str, int size);
int						parser(t_data *data, t_room **room, int flag,
							int check);
int						ft_ants(char *line, t_data *data, int *flag);
int						ft_comment(char *line);
int						ft_command(char *line, int *flag);
int						ft_room(char *line, t_room **room, t_data *data,
							int flag);
int						ft_check_coord(char *line, t_coord **coord_tab);
int						ft_path(char *line, t_room **room);
int						ft_refactoring_room(t_room **room, t_data data,
							t_room ***final_room);
int						ft_algo(t_room **room, t_data data);
int						ft_count_bottleneck(t_data data);
void					ft_init_storage_flow(t_room **room, t_data data);
int						ft_bfs(t_room **room, t_data data,
							t_room ***shortest_path, int i);
t_path					**ft_chose_best_path(t_path ***all_path, t_data data);
int						**ft_create_path_tab(t_room ****all_path);
int						ft_store_path(t_path ***all_path, t_data data);
void					ft_ants_manage(t_path **path, t_data data);
void					ft_free_ptr(void *content, size_t size);
int						ft_free_paths(t_path ***all_path);
int						ft_neigh_1(t_room *tmp_r1, t_room *tmp_r2,
							t_neighbor *tmp_n1);
int						ft_neigh_2(t_room *tmp_r1, t_room *tmp_r2,
							t_neighbor *tmp_n2);
void					ft_store_type(char **str, t_room **room, t_data *data,
							int flag);
int						ft_store_room(char **str, t_room **room);
int						ft_init_room(t_room ***room);
void					ft_init_start_neigh(t_data *data);
int						ft_init_data(t_data *data, int argc, char **argv);
void					ft_clean_main2(t_room *tmp_r, t_room *tmp_r_nxt);
int						ft_clean_main(t_room **room, t_data *data);
int						ft_clean_refacto(t_room **room, t_data data);
int						ft_malloc_error(int r_value);
int						ft_error(int r_value);
int						ft_check_circle(t_room *tmp_r, t_room *tmp_n);
int						ft_check_same_path(t_room *tmp_r, t_room *tmp_n_r);
void					ft_init_data_bfs(t_bfs *bfs, t_data data,
							t_room **room);
int						ft_create_shortest_path(t_bfs *bfs,
							t_room ***shortest_path);
int						ft_quick_upstream(t_bfs *bfs, t_data data);
void					ft_place_remaining_ants(int unplaced_ants,
							t_path **path);
void					ft_neg_ants(t_path **path, t_dispatch *dis);
void					ft_compute_nb_ants2(t_dispatch *dis, t_path **path,
							t_data data);
void					ft_compute_nb_ants(t_path **path, t_data data);

#endif
