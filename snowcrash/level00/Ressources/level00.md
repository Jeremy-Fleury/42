# <center>Snowcrash level00</center>

# Explanations

<br/>

## On VM:
>$ find / -user flag00 2>/tmp/trash<br/>
>>/usr/sbin/john<br/>
>>/rofs/usr/sbin/john<br/>

>$ cat /usr/sbin/john<br/>
>>cdiiddwpgswtgt<br/>

<br/>

## On your computer:
- Use https://www.dcode.fr/chiffre-cesar to decrypt the password with Cesar's algorithm<br/>
- Result: nottoohardhere<br/>

<br/>

## On VM:

>$ su flag00<br/>
>$ nottoohardhere<br/>
>$ getflag<br/>
>> Check flag.Here is your token : x24ti5gi3x0ol2eh4esiuxias<br/>