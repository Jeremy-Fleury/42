# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    function_parser.py                                 :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jfleury <jfleury@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/04/25 16:47:15 by jfleury           #+#    #+#              #
#    Updated: 2019/05/15 10:42:05 by jfleury          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#! /usr/bin/env python3
# coding: utf-8

import fileinput
from main_viewer import *

def ft_line(line):
	i = 0
	while i < len(line):
		while line[i] == '':
			line.pop(i)
		i += 1
	return line

def ft_room(line, type, grid):
	room = Room()
	room.name = line[0]
	room.type_room = type
	room.x = line[1]
	room.y = line[2]
	if int(room.x) > grid.xmax:
		grid.xmax = int(room.x)
	if int(room.y) > grid.ymax:
		grid.ymax = int(room.y)
	return room

def ft_path(line):
	path = Path()
	path.path_1 = line[0]
	path.path_2 = line[1]
	return path

def	ft_parser(list_room, list_move, list_path, grid):
	read = list()
	for line in fileinput.input():
		print(line, end = '')
		if line == "Error":
			sys.exit(0)
		if line[0] != '#' or (line == '##start\n' or line == '##end\n'):
			read.append(line)
	i = 0
	while i < len(read):
		read[i] = read[i][0:-1]
		i += 1
	grid.nb_lem = read[0]
	i = 1
	# Store ROOM
	while True:
		read[i] = read[i].replace('-', ' ')
		line = read[i].split(' ')
		line = ft_line(line)
		len_line = len(line)
		if len_line != 1 and len_line != 3:
			break
		if len_line == 1:
			if line[0] == "##start":
				i += 1
				read[i] = read[i].replace('-', ' ')
				line = read[i].split(' ')
				line = ft_line(line)
				tmp = ft_room(line, 'S', grid)
				list_room.append(tmp)
			if line[0] == "##end":
				i += 1
				read[i] = read[i].replace('-', ' ')
				line = read[i].split(' ')
				line = ft_line(line)
				tmp = ft_room(line, 'E', grid)
				list_room.append(tmp)
		else:
			tmp = ft_room(line, 'M', grid)
			list_room.append(tmp)
		grid.nb_room = grid.nb_room + 1
		i += 1
	# Store PATH
	while True:
		read[i] = read[i].replace('-', ' ')
		if read[i] == '':
			break
		line = read[i].split(' ')
		line = ft_line(line)
		len_line = len(line)
		if len_line != 2:
			break
		tmp = ft_path(line)
		list_path.append(tmp)
		i += 1
	# Store MOVE
	i += 1
	while i < len(read):
		move = Move()
		move.tab_move = read[i].split(' ')
		list_move.append(move)
		i += 1

def ft_store_lem(lem, room):
	tmp_lem = Lem()
	tmp_lem.x = room.x
	tmp_lem.y = room.y
	lem.append(tmp_lem)

def	ft_lem_static(lem, room, nb_lem):
	j = 0
	i = 0
	while room[j].type_room != 'S':
		j += 1
	while i < int(nb_lem):
		ft_store_lem(lem, room[j])
		i += 1

def ft_normalize(room, grid):
	i = 0
	x = 0
	y = 0
	while i < len(room):
		room[i].x = ((int((int(room[i].x) * (grid.nb_room - 1) / (grid.xmax))) * 100) + 25)
		room[i].y = ((int((int(room[i].y) * (grid.nb_room - 1) / (grid.ymax))) * 100) + 25)
		i += 1
