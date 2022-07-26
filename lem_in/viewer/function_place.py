# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    function_place.py                                  :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/04/25 16:47:18 by jfleury           #+#    #+#              #
#    Updated: 2019/04/26 15:57:20 by jfleury          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#! /usr/bin/env python3
# coding: utf-8

from tkinter import *

def ft_place_grid(canvas, grid):
	j = 0
	while j < grid.win_height * 10:
		canvas.create_line(j, 0, j, grid.win_height * 10, fill="#323232")
		j += 100
	j = 0
	while j < grid.win_width * 10:
		canvas.create_line(0, j, grid.win_width * 10, j, fill="#323232")
		j += 100

def ft_place_room(room, canvas):
		i = 0
		while i < len(room):
			if room[i].type_room == 'S':
				canvas.create_oval(	int(room[i].x),			\
									int(room[i].y),			\
									int(room[i].x) + 50,	\
									int(room[i].y) + 50,	\
									outline="#FE53BB",		\
									width="6",				\
									fill="black")
				canvas.create_text(room[i].x - 20, room[i].y - 15, text=room[i].name.capitalize(), fill="#F5D300", anchor="w")
			if room[i].type_room == 'E':
				canvas.create_oval(	int(room[i].x),			\
									int(room[i].y),			\
									int(room[i].x) + 50,	\
									int(room[i].y) + 50,	\
									outline="#FE53BB",		\
									width="6",				\
									fill="black")
				canvas.create_text(room[i].x - 20, room[i].y - 15, text=room[i].name.capitalize(), fill="#F5D300", anchor="w")
			if room[i].type_room == 'M':
				canvas.create_oval(	int(room[i].x),			\
									int(room[i].y),			\
									int(room[i].x) + 50,	\
									int(room[i].y) + 50,	\
									outline="#08F7FE",		\
									width="6",				\
									fill="black")
				canvas.create_text(room[i].x - 20, room[i].y - 15, text=room[i].name.capitalize(), fill="#F5D300", anchor="w")
			i += 1

def ft_place_path(room, path, canvas):
		i = 0
		while i < len(path):
			j = 0
			k = 0
			while room[j].name != path[i].path_1:
				j += 1
			while room[k].name != path[i].path_2:
				k += 1
			canvas.create_line(	int(room[j].x) + 25,		\
								int(room[j].y) + 25,		\
								int(room[k].x) + 25,		\
								int(room[k].y) + 25,		\
								fill="#08F7FE",				\
								width="6")
			i += 1

def ft_place_lem(lem,canvas):
		i = 0
		l = list()
		while (i < len(lem)):
			l.append(canvas.create_oval(int(lem[i].x) + 15,	\
										int(lem[i].y) + 15,	\
										int(lem[i].x) + 35,	\
										int(lem[i].y) + 35,	\
										fill="#F5D300"))
			i += 1
		return l
