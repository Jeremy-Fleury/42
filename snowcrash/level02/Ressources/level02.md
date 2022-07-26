# <center>Snowcrash level02</center>

# Tools:

- Wireshark

<br/>

# Explanations

<br/>

## On VM:
> $ ls -l
>> ----r--r-- 1 flag02 level02 8302 Aug 30  2015 level02.pcap

<br/>

## On your computer:
> $ scp -P 4242 level02@<IP_VM>:~/level02.pcap .<br/>
> $ chmod 600 level02.pcap
- Open level02.pcap with wireshark and follow TCP stream.
- Password: ft_wandr...NDRel.L0L
- In the packets, the . corresponds to the value 7f (Del in ascii).
- Delete ...
- ft_wandrNDRelL0L

<br/>

## On VM:
>$ su flag02<br/>
>$ ft_wandrNDRelL0L<br/>
>$ getflag<br/>
>>Check flag.Here is your token : kooda2puivaav1idi4f57q8iq<br/>