/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_check_process.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:12:29 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/19 11:08:35 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static void		ft_init_struct(t_process *p)
{
	p->process[0] = 21;
	p->process[1] = 213;
	p->process[2] = 230;
	p->process[3] = 209;
	p->process[4] = 210;
	p->process[5] = 211;
	p->process[6] = 212;
	p->process[7] = 228;
	p->process[8] = 325;
	p->process[9] = 326;
	p->process[10] = 342;
	p->fptr[0] = sa;
	p->fptr[1] = sb;
	p->fptr[2] = ss;
	p->fptr[3] = pa;
	p->fptr[4] = pb;
	p->fptr[5] = ra;
	p->fptr[6] = rb;
	p->fptr[7] = rr;
	p->fptr[8] = rra;
	p->fptr[9] = rrb;
	p->fptr[10] = rrr;
}

static int		ft_cal(char *str)
{
	int		i;
	int		j;

	i = 0;
	j = 0;
	if (ft_strequ(str, "sa") == 1)
		return (21);
	while (str[i] != 0)
	{
		j = str[i] + j;
		i++;
	}
	return (j);
}

int				ft_check_process(t_stack *stack, char **process, int flag)
{
	t_process	p;
	t_v			v;
	int			i;
	int			j;

	ft_init_struct(&p);
	v.time = 100 / (stack->len_a + 1);
	i = -1;
	j = 0;
	ft_sdl(&v, stack, flag);
	while (process[j] != 0)
	{
		i++;
		if (ft_cal(process[j]) == p.process[i])
		{
			p.fptr[i](stack);
			j++;
			i = -1;
		}
		if (flag == 1)
			ft_sdl_renderer(&v, stack);
	}
	ft_sdl_quit(&v, flag);
	return (1);
}
