#!/bin/sh

###################################
# Download
###################################

NGINX=nginx-1.4.7
PCRE=pcre-8.35

wget 'http://nginx.org/download/'$NGINX'.tar.gz'
wget 'ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/'$PCRE'.tar.gz'

tar -xzf $NGINX.tar.gz
tar -xzf $PCRE.tar.gz

mv $NGINX nginx_src
mv $PCRE pcre_src

###################################
# Make
###################################

BASE_DIR=`pwd`
INSTALL_DIR=$BASE_DIR/nginx

mkdir -p $INSTALL_DIR/logs
mkdir -p $INSTALL_DIR/tmp/fcgi
touch $INSTALL_DIR/tmp/citations_serv.sock

cd nginx_src && ./configure \
    --prefix=$INSTALL_DIR \
    --sbin-path=$INSTALL_DIR/sbin/nginx \
    --conf-path=$INSTALL_DIR/conf/nginx.conf \
    --error-log-path=$INSTALL_DIR/logs/error.log \
    --http-log-path=$INSTALL_DIR/logs/access.log \
    --pid-path=$INSTALL_DIR/tmp/nginx.pid \
    --lock-path=$INSTALL_DIR/tmp/nginx.lock \
    --http-fastcgi-temp-path=$INSTALL_DIR/tmp/fcgi \
    --http-client-body-temp-path=$INSTALL_DIR/tmp/client_body \
    --http-proxy-temp-path=$INSTALL_DIR/tmp/proxy \
    --with-pcre=$BASE_DIR/pcre_src \
    --without-mail_pop3_module \
    --without-mail_imap_module \
    --without-mail_smtp_module \
    --without-http_gzip_module \
    --without-http_ssi_module \
    --without-http_userid_module \
    --without-http_auth_basic_module \
    --without-http_autoindex_module \
    --without-http_uwsgi_module \
    --without-http_scgi_module \
    --without-http_memcached_module \
    --without-http_empty_gif_module \
    --without-http_browser_module

make && make install && cd ..
sed "s#INSTALL_DIR#$INSTALL_DIR#g" nginx.conf.pre > ./nginx/conf/nginx.conf

