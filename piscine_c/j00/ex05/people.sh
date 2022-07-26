ldapsearch -Q uid='z*' | grep cn: | cut -c5- | sort -rbdf
