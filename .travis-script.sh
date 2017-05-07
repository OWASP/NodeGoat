#!/bin/bash
npm start &
sleep 5
curl http://127.0.0.1:4000/login
hostip=$(docker run -u zap -it owasp/zap2docker-stable bash -c 'ip route show' | awk '/default/ {print$3}')
echo Scanning $hostip
docker run -u zap -i owasp/zap2docker-stable zap-cli --verbose quick-scan --self-contained -o "-config api.disablekey=true" --spider -r http://$hostip:4000
