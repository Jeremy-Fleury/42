# <center>Snowcrash level01</center>

# Tool
- john the ripper<br/>

<br/>

# Explanations

<br/>

## On VM
>$ ls -l /etc/shadow; ls -l /etc/passwd<br/>
>> -rw-r----- 1 root shadow 4428 Mar  6  2016 /etc/shadow<br/>
>> -rw-r--r-- 1 root root 2477 Mar  5  2016 /etc/passwd<br/>

>$ cat -rw-r--r-- 1 root root 2477 Mar  5  2016 /etc/passwd<br/>
>>flag01:42hDRfypTqqnw:3001:3001::/home/flag/flag01:/bin/bash<br/>

<br/>

## On your computer:
>$ scp -P 4242 level01@<IP_VM>:/etc/passwd .<br/>
>$ x24ti5gi3x0ol2eh4esiuxias<br/>
>$ john --show passwd<br/>
>>flag01:abcdefg:3001:3001::/home/flag/flag01:/bin/bash<br/>
>>1 password hash cracked, 0 left<br/>

<br/>

## On VM<br/>
>$ su flag01<br/>
>$ abcdefg<br/>
>$ getflag<br/>
>>Check flag.Here is your token : f2av5il02puano7naaf6adaaf<br/>