# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jfleury <marvin@42.fr>                     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2018/11/14 20:22:58 by jfleury           #+#    #+#              #
#    Updated: 2019/03/07 13:51:21 by jfleury          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = libft.a
AR = ar rc
CC = gcc
RL = ranlib
RM = rm -f
CFLAGS = -Wall -Werror -Wextra -c

SRC =	ft_memset.c		\
		ft_bzero.c		\
		ft_memcpy.c		\
		ft_memccpy.c	\
		ft_memmove.c	\
		ft_memchr.c		\
		ft_memcmp.c		\
		ft_strlen.c		\
		ft_strcmp.c 	\
		ft_strdup.c		\
		ft_strcpy.c		\
		ft_strncpy.c	\
		ft_strcat.c		\
		ft_strncat.c	\
		ft_strlcat.c	\
		ft_strchr.c		\
		ft_strrchr.c	\
		ft_atoi.c		\
		ft_atoi_long.c	\
		ft_isalpha.c	\
		ft_isdigit.c	\
		ft_isalnum.c	\
		ft_strstr.c 	\
		ft_strnstr.c 	\
		ft_strncmp.c 	\
		ft_strnequ.c 	\
		ft_isascii.c	\
		ft_isprint.c	\
		ft_toupper.c	\
		ft_tolower.c	\
		ft_memalloc.c	\
		ft_memdel.c		\
		ft_strnew.c		\
		ft_strdel.c		\
		ft_strclr.c		\
		ft_striter.c	\
		ft_striteri.c	\
		ft_strmap.c		\
		ft_strmapi.c	\
		ft_strequ.c		\
		ft_strsub.c		\
		ft_strtrim.c	\
		ft_strsplit.c	\
		ft_itoa.c		\
		ft_strjoin.c	\
		ft_putchar.c	\
		ft_putstr.c		\
		ft_putendl.c	\
		ft_putnbr.c		\
		ft_putchar_fd.c	\
		ft_putstr_fd.c	\
		ft_putendl_fd.c	\
		ft_putnbr_fd.c	\
		ft_lstnew.c		\
		ft_lstdelone.c	\
		ft_lstdel.c		\
		ft_lstadd.c		\
		ft_lstiter.c	\
		ft_lstmap.c		\
		ft_strextend.c	\
		ft_strnextend.c	\
		ft_sstrnew.c	\
		ft_sstrcpy.c	\
		ft_sstrdel.c	\
		get_next_line.c	\
		ft_memtab.c		\
		ft_memint_tab.c	\
		ft_sstrprint.c	\
		ft_bubble_sort.c

OBJ = $(SRC:.c=.o)

all: $(NAME)

$(NAME): $(OBJ)
	$(CC) $(CFLAGS) $(SRC)
	$(AR) $(NAME) $(OBJ)
	$(RL) $(NAME)
	echo "Make libft"

clean:
	$(RM) $(OBJ)
	echo "Clean libft"

fclean: clean
	$(RM) $(NAME)
	echo "Fclean libft"

re: fclean all

.SILENT: $(OBJ) $(NAME) all clean fclean re
