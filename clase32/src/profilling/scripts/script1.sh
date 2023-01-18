curl -X GET "http://localhost:8080/api/info"

artillery quick --count 50 -n 20 "http://localhost:8080/api/info" > result_prof.txt