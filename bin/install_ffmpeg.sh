# Con este archivo se descarga ffmpeg. Si el archivo a descargarse no es la ultima version, se puede visitar la siguiente pagina para bajar la ultima version http://johnvansickle.com/ffmpeg/.

# Cambiar aqui si el archivo no se descarga
FNAME=ffmpeg-release-32bit-static.tar.xz

echo "Creando el directorio ~/bin si no existe aun..."
mkdir -p ~/bin

echo "Removiendo versiones obsoletas de ffmpeg..."
rm -rf ~/bin/ffmpeg*

echo "Descargando ffmpeg..."
wget -P /home/root/bin http://johnvansickle.com/ffmpeg/releases/$FNAME

echo "Descomprimiendo..."
tar -xf /home/root/bin/$FNAME -C /home/root/bin

echo "Limpiando Archivos..."
rm /home/root/bin/$FNAME
mv /home/root/bin/ffmpeg*/ /home/root/bin/ffmpeg
