#!/bin/bash
cd `dirname $0`
harp compile
opt_date=$(date +%Y%m%d_%H%M%S)
echo "reset version $opt_date "

sed -i -e  "s/__WX_VERSION__/$opt_date/"  ./www/*.html

echo "unpack www "
ip=118.190.65.193
cd www/
tar czf ../wx_yxyx_student_feedback.tar.gz *.html  css/*.css js/*.js img/* fonts/*
cd ../

echo "scp"
scp -P56000 wx_yxyx_student_feedback.tar.gz ybai@$ip:~/

#ssh -p56000 ybai@$ip "mkdir /var/www/wx-yxyx-web.leo1v1.com/wx_yxyx_student_feedback"
echo "unpack  www"
ssh -p56000 ybai@$ip "tar xvf wx_yxyx_student_feedback.tar.gz  -C /var/www/wx-yxyx-web.leo1v1.com/wx_yxyx_student_feedback"

echo "end "
