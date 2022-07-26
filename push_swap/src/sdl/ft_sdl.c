/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sdl.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/03/02 12:28:25 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/20 15:08:44 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

int		ft_num_max(t_stack *stack)
{
	int		i;
	int		result;

	i = 0;
	result = -2147483648;
	while (i < stack->len_a)
	{
		if (stack->a[i] > result)
			result = stack->a[i];
		i++;
	}
	return (result);
}

int		ft_sdl(t_v *v, t_stack *stack, int flag)
{
	if (flag == 1)
	{
		if (SDL_Init(SDL_INIT_VIDEO) != 0)
			return (-1);
		v->window = NULL;
		v->window = SDL_CreateWindow(
									"Visualizer",
									SDL_WINDOWPOS_UNDEFINED,
									SDL_WINDOWPOS_UNDEFINED,
									1600,
									900,
									SDL_WINDOW_FULLSCREEN_DESKTOP);
		v->sbh = 900 / stack->len_a;
		v->sbl = 800 / ft_num_max(stack);
	}
	return (0);
}

int		ft_sdl_quit(t_v *v, int flag)
{
	if (flag == 1)
	{
		SDL_Delay(3000);
		SDL_DestroyWindow(v->window);
		SDL_Quit();
	}
	return (0);
}
