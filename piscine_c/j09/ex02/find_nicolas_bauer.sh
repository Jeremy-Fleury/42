grep -i -E 'nicolas.*bauer' contacts_hard.txt | grep -v -i bomber | rev | cut -f2 -d$'\t' | rev
