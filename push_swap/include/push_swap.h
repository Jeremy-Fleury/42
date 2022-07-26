/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   push_swap.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/28 11:13:48 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/20 15:22:53 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef PUSH_SWAP_H
# define PUSH_SWAP_H

# include "libft.h"
# include <string.h>
# include <stdlib.h>
# include <SDL2/SDL.h>

typedef struct	s_stack
{
	int				*a;
	int				*b;
	int				len_a;
	int				len_b;
	char			*str;
	int				flag;
	int				flag_rra;
	int				flag_v;
}				t_stack;

typedef struct	s_sort
{
	int				end_a;
	int				end_b;
}				t_sort;

typedef struct	s_pivot
{
	int				pivot;
	int				reverse;
	int				flag;
	int				flag_rrb;
}				t_pivot;

typedef struct	s_v
{
	SDL_Window		*window;
	SDL_Renderer	*ren;
	int				sbh;
	int				sbl;
	int				time;
}				t_v;

typedef struct	s_process
{
	int				process[11];
	char			*(*fptr[11])(t_stack *stack);
}				t_process;

int				ft_parser(int argc, char **argv, t_stack *stack, int *flag);
int				ft_free_intmax(char **str2, int i);
void			ft_print(t_stack *stack);
char			*ft_sort(t_stack *stack, int end, char letter);
int				ft_check_stack(t_stack *stack);
char			*pivot_a(t_stack *stack, t_sort *sort, int end);
int				ft_cal_enda(t_stack *stack, int end);
char			*pivot_b(t_stack *stack, t_sort *sort, int end);
int				ft_mediane(int *stack, int end);
int				ft_mediane_short(int *stack, int end);
char			**ft_post_process(char *str);
void			ft_ra_nope(char **tab, int *i, int *j);
void			ft_rb_nope(char **tab, int *i, int *j);
void			ft_pa_nope(char **tab, int *i, int *j);
void			ft_pb_nope(char **tab, int *i, int *j);
void			ft_rra_nope(char **tab, int *i, int *j);
void			ft_rrb_nope(char **tab, int *i, int *j);
char			**ft_store(int *flag2);
int				ft_check_process(t_stack *stack, char **process, int flag);
void			ft_print(t_stack *stack);
char			*ft_short_tree(t_stack *stack);
char			*ft_short(t_stack *stack);
char			*ft_nb_pa(t_stack *stack, int nb);
char			*ft_shortb(t_stack *stack);
int				ft_sdl(t_v *v, t_stack *stack, int flag);
int				ft_sdl_renderer(t_v *v, t_stack *stack);
int				ft_sdl_quit(t_v *v, int flag);
char			*ft_short_pivot(t_stack *stack, t_sort *sort, int i);
char			*sa(t_stack *stack);
char			*sb(t_stack *stack);
char			*ss(t_stack *stack);
char			*pa(t_stack *stack);
char			*pb(t_stack *stack);
char			*ra(t_stack *stack);
char			*rb(t_stack *stack);
char			*rr(t_stack *stack);
char			*rra(t_stack *stack);
char			*rrb(t_stack *stack);
char			*rrr(t_stack *stack);

#endif
