# <center>Snowcrash level09</center>

# Explanations

<br/>

## On VM:
> $ ls -l
>> $ -rwsr-sr-x 1 flag09 level09 7640 Mar  5  2016 level09
>> $ ----r--r-- 1 flag09 level09   26 Mar  5  2016 token

> $ ./level09 token
>> tpmhr

> $ ./level09 111111111111111111111111111111111111111111111111111111111
>> 123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghi

- The binary ./level09 takes a string and encrypts it by adding +x relative to the index in the string.

> $ scp -P 4242 level09@<IP_VM>:~/token .

<br/>

## On your computer:
> $ python script.py ./token
>> f3iji1ju5yuevaus41q1afiuq

<br/>

## On VM:
> $ su flag09<br/>
>$ f3iji1ju5yuevaus41q1afiuq<br/>
>$ getflag
>> Check flag.Here is your token : s5cAJpM8ev6XHw998pRWG728z