# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    function_move.py                                   :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/04/25 16:47:03 by jfleury           #+#    #+#              #
#    Updated: 2019/05/15 16:45:38 by jfleury          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#! /usr/bin/env python3
# coding: utf-8

from tkinter import *
from main_viewer import *

class Display:
	def __init__(self):
		self.name = list()
		self.x = []
		self.y = []

def ft_move_lem(move, room, lem, l, canvas, menu, scale_lem):
		menu.button_start.config(state=DISABLED)
		menu.button_neg.config(state=DISABLED)
		menu.button_reset.config(state=DISABLED)
		i = 0
		tab_display = list()
		while i < len(move):
			tmp_display = Display()
			j = 0
			while j < len(move[i].tab_move):
				k = 0
				tmp = move[i].tab_move[j].split('-')
				next_room = tmp[1].replace('\n', '')
				name_lem = int(tmp[0].replace('L', '')) - 1
				#Search Room
				while room[k].name != next_room:
					k += 1
				#Cal de x et y
				x = ((int(room[k].x) - int(lem[name_lem].x)) * scale_lem) / 50
				y = ((int(room[k].y) - int(lem[name_lem].y)) * scale_lem) / 50
				lem[name_lem].x = int(room[k].x)
				lem[name_lem].y = int(room[k].y)
				#Move
				tmp_display.name.append(name_lem)
				tmp_display.x.append(x)
				tmp_display.y.append(y)
				j += 1
			tab_display.append(tmp_display)
			i += 1
		i = 0
		while i < len(tab_display):
			canvas.after(1000)
			for loops in range(50):
				j = 0
				while j < len(tab_display[i].name):
					canvas.move(	l[tab_display[i].name[j]],	\
									int(tab_display[i].x[j]),	\
									int(tab_display[i].y[j]))
					j += 1
				canvas.update()
				menu.counter2.config(text=str(i))
				canvas.after(10)
			i += 1
		menu.counter2.config(text=str(i))
		menu.button_reset.config(state="normal")
