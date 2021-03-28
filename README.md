Hello ;)

endpointy:

api/user/signup methode: POST, req.body{userName: 'janek', email: 'janek@gmail.com', password: 'hello'} Response: {
        status: "success",
        token,
        data: {email, token, userName, _id}}

api/user/google methode: GET wchodzisz i leci sobie flow google a dostajesz  przekierowanie i Response na api/user/google/callback : {
        status: "success",
        token,
        data: {email, token, userName, _id}}

api/user/login methode: POST, req.body{email: 'janek@gmail.com', password: 'hello'} Response: {
        status: "success",
        token,
        data: {email, token, userName, _id}}


do wszystkich poniżej w req.headers musisz dać Bearer token:
api/form/create -  w req.body wysylasz caly obiekt i dostajesz obiekt z powrotem z dodatkiem '_id' ktory tworzy baza 
api/form/update - tutaj w req.query.name dajesz name formy i w req.body nową wersję obiektu
api/form/get - tutaj w req.query.name nazwa formy
api/form/delete - tutaj w req.query.name nazwa formy