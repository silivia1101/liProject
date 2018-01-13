#!/bin/bash
cd `dirname $0`

ip=118.190.65.193

tar czf wx_teacher_share.tar.gz js/*.js img/* leo_student_side/* leo_teacher_help/*

echo "scp"
scp -P56000 wx_teacher_share.tar.gz ybai@$ip:~/
#ssh -p56000 ybai@$ip "mkdir /var/www/wx-teacher-web.leo1v1.com/wx_teacher_share"

echo "unpack  www"
ssh -p56000 ybai@$ip "tar xvf wx_teacher_share.tar.gz  -C /var/www/wx-teacher-web.leo1v1.com/wx_teacher_share "

echo "end "
