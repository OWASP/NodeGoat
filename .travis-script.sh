#!/bin/bash
npm start &
docker run -u zap -i owasp/zap2docker-stable zap-cli --verbose quick-scan --self-contained -o "-config api.disablekey=true" -s xss,sqli --spider http://localhost:4000
