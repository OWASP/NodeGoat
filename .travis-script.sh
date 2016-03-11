#!/bin/bash
npm start &
sleep 5
curl http://localhost:4000/login
docker run -u zap -i owasp/zap2docker-stable zap-cli --verbose quick-scan --self-contained -o "-config api.disablekey=true" -s xss,sqli --spider http://localhost:4000
