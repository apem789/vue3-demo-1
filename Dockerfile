FROM nginx
COPY . /usr/share/nginx/html/
COPY app.conf /etc/nginx/nginx.conf
CMD [ "systemctl", "restart", "nginx" ]