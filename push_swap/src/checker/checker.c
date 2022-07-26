/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   checker.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/11 12:27:30 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/20 15:21:11 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static void		ft_del_process(char **process)
{
	int		i;

	i = 0;
	while (process[i] != 0)
	{
		free(process[i]);
		process[i] = NULL;
		i++;
	}
}

static int		ft_error(t_stack *stack, char **process, int flag2)
{
	ft_putstr_fd("Error\n", 2);
	if (flag2 == 1)
	{
		ft_del_process(process);
		free(process);
	}
	free(stack->a);
	free(stack->b);
	return (-1);
}

static int		ft_ko(t_stack *stack, char **process, int flag2)
{
	ft_putstr("KO\n");
	if (flag2 == 1)
	{
		ft_del_process(process);
		free(process);
	}
	free(stack->a);
	free(stack->b);
	return (-1);
}

static void		free_stack(t_stack *stack, char **process, int flag2)
{
	if (flag2 == 1)
	{
		ft_del_process(process);
		free(process);
	}
	free(stack->a);
	free(stack->b);
}

int				main(int argc, char **argv)
{
	t_stack		stack;
	char		**process;
	int			flag;
	int			flag2;

	flag = 0;
	flag2 = 0;
	process = NULL;
	if (argc == 1)
		return (0);
	if (!(ft_parser(argc, argv, &stack, &flag)))
		return (ft_error(&stack, process, flag2));
	if ((process = ft_store(&flag2)) == NULL)
		return (ft_error(&stack, process, flag2));
	if (ft_check_process(&stack, process, flag) != 1)
		return (ft_error(&stack, process, flag2));
	if (!(ft_check_stack(&stack)) || stack.len_b != 0)
		return (ft_ko(&stack, process, flag2));
	if (flag == 1)
		ft_print(&stack);
	ft_putstr("OK\n");
	free_stack(&stack, process, flag2);
	return (0);
}
