# Lem_in
42 project Lem_in

<img src="https://github.com/Alblfbv/Lem_in/blob/master/media/lem_in_visu.gif" width="80%">

## Description
Lem_in is a program whose role is to move N ants through a graph from vStart to vEnd in the least amount of __steps__.
The program reads the graph details and number of ants from the standard input.

Following conditions apply :
  * the graph is non-oriented
  * graph details and number of ants are given at launch
  * __constraints__ : the vertices and edges have a one ant capacity
  * __step__ : moving all possible ants simultaneously without breaking the __constraints__


## Solution
We used Edmond's Karp max flow algorithm.
https://en.wikipedia.org/wiki/Edmonds%E2%80%93Karp_algorithm

## Requirements
  * gcc
  * visualizer : python3

## Usage


### Run
```
make
```
#### without visualizer
```
./lemin < map.lem
```
#### with visualizer
```
./lemin < map.lem | python3 viewer/main.py
```


### Map file

#### Map format specifications

In the order listed below
  1. Number of ants : integer
  2. Vertices definition : ```name x_coordinates y_coordinates```
      * mandatory start vertex command : ```##start``` above vertex definition line
      * mandatory end vertex command : ```##end``` above vertex definition line
  3. Edges definition : ```name_a-name_b```
  
  * comments  : #
  * commands  : ##

#### Map example
```
10          # PHASE 1 : ants number
v_1 10 10   # PHASE 2 : vertices declaration  
v_2 15 10
v_3 20 20
v_4 10 5
##end           # end room definition
v_5 11 7
v_6 4 1
##start         # start room definition
name 1 8
v_1-v_2     # PHASE 3 : edges definition
v_2-v_3
v_3-v_4
name-v_1
v_4-v_5
```


### Visualizer controls

  * ```Play```  : starts the program
  * ```Reset``` : resets the program
  * ```-```     : zoom out
  * ```Exit```  : exits the program
  
  
  ## Author
  
  [Alblfbv](https://github.com/Alblfbv)  
  [Jfleury](https://github.com/Jeremy-Fleury)
