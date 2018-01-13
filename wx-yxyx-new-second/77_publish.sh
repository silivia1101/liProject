#!/bin/bash
cd `dirname $0`
harp compile
opt_date=$(date +%Y%m%d_%H%M%S)
echo "reset version $opt_date "

sed -i -e  "s/__WX_VERSION__/$opt_date/"  ./www/*.html

echo "unpack www "
ip=118.190.65.193
cd www/
tar czf ../wx-yxyx-new-second.tar.gz *.html  css/* js/* img/* fonts/* script/*
cd ../

echo "scp"
scp -P56000 wx-yxyx-new-second.tar.gz ybai@$ip:~/

#ssh -p56000 ybai@$ip "mkdir /var/www/wx-yxyx-web.leo1v1.com/wx-yxyx-new-second"
echo "unpack  www"
ssh -p56000 ybai@$ip "tar xvf wx-yxyx-new-second.tar.gz  -C /var/www/wx-yxyx-web.leo1v1.com/wx-yxyx-new-second"

echo "end "
