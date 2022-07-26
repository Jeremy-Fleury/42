# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/03/19 14:24:03 by jfleury           #+#    #+#              #
#    Updated: 2019/05/23 13:33:09 by allefebv         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME 		=	lem-in
CC 			=	gcc
RM 			=	rm -Rf
INCLUDE 	=	-I ./include
INCLUDE_L	=	-I ./libft/include
CFLAGS 		+=	-Wall -Wextra -Werror $(INCLUDE) $(INCLUDE_L)
LIB			=	libft/libft.a
SRC			= 	src/main.c 							\
				src/lib_lem/ft_init_main.c 			\
				src/lib_lem/ft_free_ptr.c 			\
				src/lib_lem/ft_clean.c 				\
				src/lib_lem/ft_error.c 				\
				src/parser/parser.c					\
				src/parser/ft_room.c				\
				src/parser/ft_room2.c				\
				src/parser/ft_path.c				\
				src/parser/ft_path2.c 				\
				src/parser/ft_check_coord.c			\
				src/parser/ft_ants.c				\
				src/parser/ft_comment.c				\
				src/parser/ft_command.c				\
				src/parser/ft_refactoring_room.c	\
				src/parser/ft_hash.c				\
				src/algo/ft_algo.c					\
				src/algo/ft_algo2.c					\
				src/algo/ft_chose_option.c			\
				src/algo/ft_chose_option2.c			\
				src/algo/ft_path_management.c		\
				src/algo/ft_bfs.c					\
				src/algo/ft_bfs2.c					\
				src/move_ants/move_ants.c

OBJ			= $(SRC:.c=.o)

all: libft $(NAME)

libft :
	make -C libft -f Makefile

$(NAME): $(OBJ)
	make -C libft -f Makefile
	$(CC) -o $(NAME) $(CFLAGS) $(OBJ) $(LIB)
	echo "Make lem-in"

clean:
	make -C libft -f Makefile clean
	$(RM) $(OBJ) viewer/__pycache__
	echo "Clean lem-in"

fclean: clean
	make -C libft -f Makefile fclean
	$(RM) $(NAME)
	echo "Fclean lem-in"

re: fclean all

.SILENT: $(OBJ) $(NAME) all clean fclean re libft
.PHONY: all libft clean fclean re
