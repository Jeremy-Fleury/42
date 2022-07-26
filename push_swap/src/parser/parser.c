/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parser.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jfleury <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/02/11 13:31:17 by jfleury           #+#    #+#             */
/*   Updated: 2019/03/20 13:55:06 by jfleury          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "push_swap.h"

static int		ft_error_parser(t_stack *stack)
{
	int		i;
	int		j;

	i = 0;
	while (i < stack->len_a)
	{
		j = 0;
		while ((stack->a[i] != stack->a[j]) || (j == stack->len_a))
			j++;
		if ((stack->a[i] == stack->a[j]) && (i != j))
			return (0);
		i++;
	}
	return (1);
}

static int		ft_check_str(char *s, int i)
{
	int			sign;
	long long	nb;

	i = 0;
	sign = 1;
	nb = 0;
	if (s[i] == '+' || s[i] == '-')
	{
		if (s[i] == '-')
			sign = -1;
		i++;
	}
	if (s[i] == '\0')
		return (0);
	while (ft_isdigit(s[i]))
	{
		if ((sign == 1 && nb * 10 + s[i] - 48 > 2147483647)
			|| (sign == -1 && nb * 10 + s[i] - 48 > 2147483648))
			return (0);
		nb = nb * 10 + s[i] - 48;
		i++;
	}
	if (s[i] != '\0')
		return (0);
	return (1);
}

static int		ft_strtotab(char *str, t_stack *stack)
{
	int		*tab;
	int		i;

	i = 0;
	if (!(tab = (int*)ft_memalloc(sizeof(int) * (stack->len_a + 1))))
		return (0);
	while (i < stack->len_a)
	{
		tab[i] = stack->a[i];
		i++;
	}
	tab[stack->len_a] = ft_atoi(str);
	stack->len_a++;
	free(stack->a);
	stack->a = tab;
	return (1);
}

static int		ft_parser2(t_stack *stack, char **tab, char **argv, int argc)
{
	int		j;
	int		i;

	i = 1;
	if (stack->flag_v == 1)
		i++;
	while (argc > 1)
	{
		j = 0;
		if (!(tab = ft_strsplit(argv[i], ' ')))
			return (0);
		while (tab[j] != 0)
		{
			if (!(ft_check_str(tab[j], i)))
				return (ft_sstrdel(tab, j));
			if (!(ft_strtotab(tab[j], stack)))
				return (ft_sstrdel(tab, j));
			j++;
		}
		argc--;
		i++;
		ft_sstrdel(tab, j);
	}
	return (1);
}

int				ft_parser(int argc, char **argv, t_stack *stack, int *flag)
{
	char	**tab;

	if (argc == 1)
		exit(0);
	tab = NULL;
	stack->len_a = 0;
	stack->len_b = 0;
	stack->flag_v = 0;
	if (ft_strequ(argv[1], "-v") == 1)
	{
		argc--;
		stack->flag_v = 1;
		*flag = 1;
		if (argc == 1)
			exit(1);
	}
	if (!(stack->a = (int*)ft_memalloc(sizeof(int) * 1)))
		return (0);
	if (!(ft_parser2(stack, tab, argv, argc)))
		return (0);
	if (!(stack->b = (int*)ft_memalloc(sizeof(int) * stack->len_a)))
		return (0);
	if (!(ft_error_parser(stack)))
		return (0);
	return (1);
}
