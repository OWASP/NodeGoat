#!/bin/bash
npm start &
sleep 5
curl http://127.0.0.1:4000/login
docker run -u zap -i owasp/zap2docker-stable zap-cli --verbose quick-scan --self-contained -o "-config api.disablekey=true" --spider -r http://172.17.0.1:4000
