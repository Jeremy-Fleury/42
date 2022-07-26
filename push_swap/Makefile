# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/01/28 11:04:16 by jfleury           #+#    #+#              #
#    Updated: 2019/03/20 15:22:41 by jfleury          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

.PHONY: all libft clean fclean re

NAME 	= 	push_swap
NAME2 	= 	checker
CC 		= 	gcc
RM 		= 	rm -f
INCLUDE = 	-I ./include
IN_LIB	= 	-I ./libft/
CFLAGS	+=	-Wall		\
			-Wextra		\
			-Werror		\
			$(INCLUDE)	\
			$(IN_LIB)
SDL 	= 	-F/Library/Frameworks -framework SDL2

SRC1	= 	src/push_swap/push_swap.c			\
			src/push_swap/ft_sort.c				\
			src/push_swap/ft_sort_short.c		\
			src/push_swap/ft_sort_short2.c		\
			src/push_swap/pivot_a.c				\
			src/push_swap/pivot_a2.c			\
			src/push_swap/pivot_b.c				\
			src/push_swap/ft_mediane.c			\
			src/push_swap/ft_post_process.c		\
			src/push_swap/ft_post_process2.c	\
			src/push_swap/ft_post_process3.c	\
			src/parser/parser.c					\
			src/process/process_p.c				\
			src/process/process_r.c				\
			src/process/process_rr.c			\
			src/process/process_s.c				\
			src/process/ft_check_stack.c		\
			src/process/ft_print.c

SRC2	=	src/checker/checker.c				\
			src/checker/ft_store.c				\
			src/checker/ft_check_process.c		\
			src/sdl/ft_sdl.c 					\
			src/sdl/ft_sdl2.c					\
			src/parser/parser.c					\
			src/process/process_p.c				\
			src/process/process_r.c				\
			src/process/process_rr.c			\
			src/process/process_s.c				\
			src/process/ft_check_stack.c		\
			src/process/ft_print.c

LIB		=	libft/libft.a

OBJ1	=	$(SRC1:.c=.o)
OBJ2	=	$(SRC2:.c=.o)

all: libft $(NAME) $(NAME2)

libft :
	make -C libft -f Makefile

$(NAME): $(OBJ1)
	make -C libft -f Makefile
	$(CC) -o $(NAME) $(CFLAGS) $(OBJ1) $(LIB)
	echo "Make Push_swap"

$(NAME2): $(OBJ2)
	make -C libft -f Makefile
	$(CC) -o $(NAME2) $(CFLAGS) $(OBJ2) $(LIB) $(SDL)
	echo "Make Checker"

clean:
	make -C libft -f Makefile clean
	$(RM) $(OBJ1) $(OBJ2)
	echo "Clean push_swap"

fclean: clean
	make -C libft -f Makefile fclean
	$(RM) $(NAME) $(NAME2)
	echo "Fclean push_swap"

re: fclean all
.SILENT: $(OBJ1) $(OBJ2) $(NAME) $(NAME2) all clean fclean re libft
