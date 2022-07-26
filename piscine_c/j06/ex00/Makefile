# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jfleury <marvin@42.fr>                     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2018/08/16 21:15:29 by jfleury           #+#    #+#              #
#    Updated: 2018/08/20 15:02:16 by jfleury          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = libft.a
AR =  ar r
RL = ranlib
SRC_SRC = ./srcs/
FILES = $(SRC_SRC)ft_putchar.c \
		$(SRC_SRC)ft_putstr.c \
		$(SRC_SRC)ft_strcmp.c \
		$(SRC_SRC)ft_strlen.c \
		$(SRC_SRC)ft_swap.c
OBJ = $(FILES:.c=.o)

all : $(NAME)

$(NAME) : $(OBJ)
	$(AR) $(NAME) $(OBJ)
	$(RL) $(NAME)

clean :
	rm -Rf $(OBJ)

fclean : clean
	rm -Rf $(NAME)

re : fclean all
