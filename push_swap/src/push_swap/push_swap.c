/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   push_swap.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/28 11:09:34 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/12 13:06:07 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static int		ft_error(t_stack *stack)
{
	free(stack->a);
	free(stack->b);
	ft_putstr_fd("Error\n", 2);
	return (0);
}

static void		ft_print_process(char **tab)
{
	int		i;

	i = 0;
	while (tab[i] != 0)
	{
		if ((ft_strequ(tab[i], "NOPE") != 1))
		{
			ft_putstr(tab[i]);
			ft_putchar('\n');
		}
		i++;
	}
}

static void		ft_free_stack(t_stack *stack)
{
	free(stack->a);
	free(stack->b);
}

static	void	ft_free_tab(char **tab)
{
	int		i;

	i = 0;
	while (tab[i] != 0)
	{
		free(tab[i]);
		i++;
	}
	free(tab);
}

int				main(int argc, char **argv)
{
	t_stack		stack;
	char		**tab;
	int			i;
	int			flag;

	i = 0;
	flag = 0;
	stack.flag_rra = 0;
	if (argc == 1)
		return (0);
	if (!(ft_parser(argc, argv, &stack, &flag)) || stack.flag_v == 1)
		return (ft_error(&stack));
	if (ft_check_stack(&stack) == 1)
	{
		ft_free_stack(&stack);
		return (0);
	}
	stack.str = ft_strnew(1);
	stack.str = ft_sort(&stack, stack.a[stack.len_a - 1], 'A');
	tab = ft_post_process(stack.str);
	ft_print_process(tab);
	ft_free_stack(&stack);
	ft_free_tab(tab);
	free(stack.str);
	return (0);
}
