/home/root/bin/ffmpeg/ffmpeg -s 320x240 -f video4linux2 -i /dev/video0 -f mpeg1video \
-b 800k -r 30 http://[2000:1::7a4b:87ff:fea2:7d93]:8082

