/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lib.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: justasze <justasze@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/08/18 15:30:05 by jfleury           #+#    #+#             */
/*   Updated: 2018/08/19 22:38:22 by justasze         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FT_LIB_H
# define FT_LIB_H

# include <stdlib.h>
# include <unistd.h>

# define BUFF_SIZE 4095
# define INVALID_CHAR 'X'

void	ft_bzero(char *s, int n);
char	*ft_strcat(char *dest, char *src);
char	*ft_strjoin(char *str1, char *str2);
int		ft_strlen(char *str);
int		ft_strcmp(char *s1, char *s2);
void	ft_putchar(char c);
char	*ft_strcpy(char *dest, char *src);
char	*ft_strdup(char *str);
void	ft_putstr(char *str);
void	ft_putnbr(int nb);
char	*ft_gen_line(char lst, char lnc, char le, int col);
char	*colle00(int col, int row);
char	*colle01(int col, int row);
char	*colle02(int col, int row);
char	*colle03(int col, int row);
char	*colle04(int col, int row);
int		ft_row(char *str);
int		ft_col(char *str);
void	ft_check_param(char *str, int col, int row);
void	ft_print(int col, int row, int colle);
void	ft_print_line(int col, int row, int colle);
void	ft_print_one_colle(int col, int raw, int colle);
void	ft_print_two_colle(int col, int raw, int colle);
void	ft_print_three_colle(int col, int raw);
char	*ft_read_to_tab(void);
void	rush(int x, int y);

#endif
