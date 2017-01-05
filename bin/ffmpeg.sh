/home/root/bin/ffmpeg/ffmpeg -s 320x240 -f video4linux2 -i /dev/video0 -f mpeg1video \
-b 800k -r 30 http://127.0.0.1:8082

#-s indica la resolucion (ancho x alto) del video que queremos obtener.

# Video4Linux o V4L es una API de captura de video para Linux. Muchas webcams USB, sintonizadoras de tv, y otros periféricos son soportados. Video4Linux está integrado con el núcleo Linux.

# -i para indicar el archivo de entrada /dev/video0 que esta capturando video de la camara

# -f = formato que se quiere obtener

# -b = es el bitrate del vídeo.

# -r = es el número de imágenes por segundo (1 Hz = 1 / seg). Es opcional (fps)
