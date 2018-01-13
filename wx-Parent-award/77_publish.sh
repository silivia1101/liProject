#!/bin/bash
cd `dirname $0`
harp compile
opt_date=$(date +%Y%m%d_%H%M%S)
echo "reset version $opt_date "
sed -i -e  "s/__WX_VERSION__/$opt_date/"  ./www/*.html
echo "unpack www "
ip=118.190.65.193
cd www/
tar czf ../wx-Parent-award.tar.gz *.html  css/* img/* js/*.js script/*.js fonts/*
cd ../
echo "scp"
scp -P56000 wx-Parent-award.tar.gz ybai@$ip:~/

#ssh -p56000 ybai@$ip "mkdir /var/www/wx-parent-web.leo1v1.com/wx-Parent-award"
echo "unpack  www"
ssh -p56000 ybai@$ip "tar xvf wx-Parent-award.tar.gz  -C /var/www/wx-parent-web.leo1v1.com/wx-Parent-award"

echo "end "
