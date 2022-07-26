#! /usr/bin/env python3

import sys

def getFile():
    if len(sys.argv) == 2:
        encrypt = open(sys.argv[1], "rb")
        encryptList = list(encrypt.read())
        return encryptList
    else:
        print("Error")
        exit()

def decrypt(encryptList):
    i = 0
    while i < len(encryptList):
            encryptList[i] = encryptList[i] - i
            i += 1
    return encryptList

def printListChr(decryptList):
    for i in decryptList:
        if i > 0 and i < 128:
            print(chr(i), end="")
    print()

if __name__ == "__main__":
    encryptList = getFile()
    decryptList = decrypt(encryptList)
    printListChr(decryptList)
