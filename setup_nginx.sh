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
mkdir -p $BASE_DIR/logs
mkdir -p $BASE_DIR/tmp/fcgi
touch $BASE_DIR/tmp/citations_serv.sock
touch $BASE_DIR/logs/access.log

cd nginx_src && ./configure \
    --prefix=$BASE_DIR/nginx \
    --sbin-path=$BASE_DIR/nginx/sbin/nginx \
    --conf-path=$BASE_DIR/nginx/conf/nginx.conf \
    --error-log-path=$BASE_DIR/logs/error.log \
    --http-log-path=$BASE_DIR/logs/access.log \
    --pid-path=$BASE_DIR/tmp/nginx.pid \
    --lock-path=$BASE_DIR/tmp/nginx.lock \
    --http-fastcgi-temp-path=$BASE_DIR/tmp/fcgi \
    --http-client-body-temp-path=$BASE_DIR/tmp/client_body \
    --http-proxy-temp-path=$BASE_DIR/tmp/proxy \
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
sed "s#BASE_DIR#$BASE_DIR#g" nginx.conf.pre > ./nginx/conf/nginx.conf

