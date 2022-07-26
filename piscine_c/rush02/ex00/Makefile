# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: justasze <justasze@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2018/08/18 14:57:04 by cnoel             #+#    #+#              #
#    Updated: 2018/08/19 22:38:33 by justasze         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

CC = gcc
NAME = colle-2
NAME_00 = colle-00
NAME_01 = colle-01
NAME_02 = colle-02
NAME_03 = colle-03
NAME_04 = colle-04
CFLAGS = -Wall -Werror -Wextra
SRC_SYS = ./ft_sys/
SRC_SRC = ./ft_src/
SRC_SRC_COLLE = ./ft_src/ft_colle/
SRC_RUSH = ./rush00/

FILES = 		main.c \
				$(SRC_SYS)ft_putchar.c \
				$(SRC_SYS)ft_bzero.c \
				$(SRC_SYS)ft_putnbr.c \
				$(SRC_SYS)ft_putstr.c \
				$(SRC_SYS)ft_strcat.c \
				$(SRC_SYS)ft_strjoin.c \
				$(SRC_SYS)ft_strcmp.c \
				$(SRC_SYS)ft_strcpy.c \
				$(SRC_SYS)ft_strdup.c \
				$(SRC_SYS)ft_strlen.c \
				$(SRC_SRC)ft_check_param.c \
				$(SRC_SRC)ft_gen_line.c \
				$(SRC_SRC)ft_print.c \
				$(SRC_SRC)ft_read_to_tab.c \
				$(SRC_SRC)ft_row_col.c \
				$(SRC_SRC_COLLE)ft_colle00.c \
				$(SRC_SRC_COLLE)ft_colle01.c \
				$(SRC_SRC_COLLE)ft_colle02.c \
				$(SRC_SRC_COLLE)ft_colle03.c \
				$(SRC_SRC_COLLE)ft_colle04.c
FILES_RUSH =	$(SRC_RUSH)main.c \
				$(SRC_RUSH)ft_putchar.c
FILES_RUSH_00 = $(FILES_RUSH) \
				$(SRC_RUSH)rush00.c
FILES_RUSH_01 = $(FILES_RUSH) \
				$(SRC_RUSH)rush01.c
FILES_RUSH_02 = $(FILES_RUSH) \
				$(SRC_RUSH)rush02.c
FILES_RUSH_03 = $(FILES_RUSH) \
				$(SRC_RUSH)rush03.c
FILES_RUSH_04 = $(FILES_RUSH) \
				$(SRC_RUSH)rush04.c

OBJ = $(FILES:.c=.o)
OBJ_00 = $(FILES_RUSH_00:.c=.o)
OBJ_01 = $(FILES_RUSH_01:.c=.o)
OBJ_02 = $(FILES_RUSH_02:.c=.o)
OBJ_03 = $(FILES_RUSH_03:.c=.o)
OBJ_04 = $(FILES_RUSH_04:.c=.o)

all : $(NAME) $(NAME_00) $(NAME_01) $(NAME_02) $(NAME_03) $(NAME_04)

$(NAME) : $(OBJ)
	@$(CC) $(CFLAGS) $(OBJ) -o $(NAME)

$(NAME_00) : $(OBJ_00)
	@$(CC) $(CFLAGS) $(OBJ_00) -o $(NAME_00)

$(NAME_01) : $(OBJ_01)
	@$(CC) $(CFLAGS) $(OBJ_01) -o $(NAME_01)

$(NAME_02) : $(OBJ_02)
	@$(CC) $(CFLAGS) $(OBJ_02) -o $(NAME_02)

$(NAME_03) : $(OBJ_03)
	@$(CC) $(CFLAGS) $(OBJ_03) -o $(NAME_03)

$(NAME_04) : $(OBJ_04)
	@$(CC) $(CFLAGS) $(OBJ_04) -o $(NAME_04)

%.o: %.c
	@$(CC) -o $@ -c $< $(CFLAGS)

clean :
	@(rm -rf $(OBJ) $(OBJ_00) $(OBJ_01) $(OBJ_02) $(OBJ_03) $(OBJ_04))

fclean : clean
	@(rm -rf $(NAME) $(NAME_00) $(NAME_01) $(NAME_02) $(NAME_03) $(NAME_04))

re : fclean all
