# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: allefebv <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2018/11/22 14:03:29 by allefebv          #+#    #+#              #
#    Updated: 2018/12/03 11:56:35 by allefebv         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME	=	fillit

CC		=	gcc

RM		=	rm -f

CFLAGS	=	-Wall -Werror -Wextra

SRC		=	src/main.c			\
			src/ft_read.c		\
			src/ft_algo.c		\
			src/ft_error.c		\
			src/ft_tetrinew.c	\
			src/ft_lstmanage.c

LIB		=	libft/libft.a

OBJ		=	$(SRC:.c=.o)

all: $(NAME)

libft:
	make -C libft/

$(NAME): $(OBJ) libft
	$(CC) -o $(NAME) $(CFLAGS) $(OBJ) $(LIB)
	echo "Make ok !"

clean:
	$(RM) $(OBJ)
	make -C libft/ clean
	echo "Make clean ok !"

fclean: clean
	@$(RM) $(NAME)
	make -C libft/ fclean
	echo "Make fclean ok !"

re: fclean all

.PHONY: all libft clean fclean re
.SILENT: $(NAME) clean fclean re all libft
