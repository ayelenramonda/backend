curl -X GET "http://localhost:8080/api/info"

autocannon -c 100 -d 20 'http://localhost:8080/api/info'
    
    
