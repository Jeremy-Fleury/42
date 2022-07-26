/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_check_param.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: justasze <justasze@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/18 14:28:10 by mdaoud            #+#    #+#             */
/*   Updated: 2018/08/19 22:55:11 by mdaoud           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../ft_lib.h"

void		ft_match_colle(char *str, int col, int row)
{
	int		nb;
	char	*colle;

	nb = 0;
	colle = colle00(col, row);
	nb += (ft_strcmp(colle, str) == 0 ? 1 : 0);
	free(colle);
	colle = colle01(col, row);
	nb += (ft_strcmp(colle, str) == 0 ? 2 : 0);
	free(colle);
	colle = colle02(col, row);
	nb += (ft_strcmp(colle, str) == 0 ? 3 : 0);
	free(colle);
	colle = colle03(col, row);
	nb += (ft_strcmp(colle, str) == 0 ? 4 : 0);
	free(colle);
	colle = colle04(col, row);
	nb += (ft_strcmp(colle, str) == 0 ? 5 : 0);
	free(colle);
	ft_print(col, row, nb);
}

void		ft_check_param(char *str, int col, int row)
{
	if (col == -1 || row == -1)
	{
		ft_print(0, 0, 0);
		return ;
	}
	ft_match_colle(str, col, row);
	free(str);
}
