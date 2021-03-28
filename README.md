Hello ;)

generalnie do form to masz:
```
api/form/create -  w req.body wysylasz caly obiekt i dostajesz obiekt z powrotem z dodatkiem '_id' ktory tworzy baza 
api/form/update - tutaj w req.query.name dajesz name formy i w req.body nową wersję obiektu
api/form/get - tutaj w req.query.name naza formy
api/form/delete - tutaj w req.query.name nazwa formy