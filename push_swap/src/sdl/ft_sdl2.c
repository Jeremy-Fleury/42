/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sdl2.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:29:47 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/04 23:38:50 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static void		ft_cal_nega(t_stack *stack, t_v *v, int i, int *h)
{
	if (stack->a[i] < 0)
	{
		SDL_SetRenderDrawColor(v->ren, 233, 239, 242, 255);
		*h = *h * -1;
	}
}

static int		ft_cal_stack_a(t_v *v, t_stack *stack)
{
	int		i;
	int		j;
	int		k;
	int		h;

	i = 0;
	j = 0;
	while (i < stack->len_a)
	{
		SDL_SetRenderDrawColor(v->ren, 85, 102, 112, 255);
		h = stack->a[i];
		k = v->sbh;
		if (i == 0)
			j = v->sbh;
		else
			j = (i + 1) * v->sbh;
		ft_cal_nega(stack, v, i, &h);
		while (k != 0)
		{
			SDL_RenderDrawLine(v->ren, 0, 900 - j, v->sbl * h, 900 - j);
			j-- && k--;
		}
		i++;
	}
	return (0);
}

static void		ft_cal_negb(t_stack *stack, t_v *v, int i, int *h)
{
	if (stack->b[i] < 0)
	{
		*h = *h * -1;
		SDL_SetRenderDrawColor(v->ren, 148, 139, 127, 255);
	}
}

static int		ft_cal_stack_b(t_v *v, t_stack *stack)
{
	int		i;
	int		j;
	int		k;
	int		h;

	i = 0;
	j = 0;
	while (i < stack->len_b)
	{
		SDL_SetRenderDrawColor(v->ren, 112, 96, 74, 255);
		h = stack->b[i];
		k = v->sbh;
		if (i == 0)
			j = v->sbh;
		else
			j = (i + 1) * v->sbh;
		ft_cal_negb(stack, v, i, &h);
		while (k != 0)
		{
			SDL_RenderDrawLine(v->ren, 800, 900 - j, v->sbl * h + 800, 900 - j);
			j-- && k--;
		}
		i++;
	}
	return (0);
}

int				ft_sdl_renderer(t_v *v, t_stack *stack)
{
	v->ren = SDL_CreateRenderer(v->window, -1, SDL_RENDERER_SOFTWARE);
	SDL_SetRenderDrawColor(v->ren, 163, 179, 189, 255);
	SDL_RenderClear(v->ren);
	SDL_SetRenderDrawColor(v->ren, 0, 0, 0, 255);
	ft_cal_stack_a(v, stack);
	ft_cal_stack_b(v, stack);
	SDL_RenderPresent(v->ren);
	SDL_Delay(v->time);
	SDL_DestroyRenderer(v->ren);
	return (0);
}
