Hello ;)

Endpoints:

Logowanie:

        url: api/user/signup 
        methode: POST, 
        req.body: {email: 'janek@gmail.com', password: 'hello'}
        
        Response: 
        {status: "success", token}

        url: api/user/google 
        methode: GET, 
        wchodzisz i leci sobie flow google a dostajesz  przekierowanie i Response na api/user/google/callback : 
        {status: "success", token}

        url: api/user/login 
        methode: POST, 
        req.body: {email: 'janek@gmail.com', password: 'hello'} 
        
        Response: {status: "success", token}


do wszystkich poniżej metoda POST i w req.headers musisz dać Bearer token:
Obsługa form: 

        url: api/form/createForm  
        req.body: {name: "form123"}
        
        Response: {
                "steps": [],
                "createdOn": "2021-04-01T19:49:42.175Z",
                "_id": "60662434db2624001a25ea64",
                "name": "form123",
                "__v": 0
                }

        url: api/form/createStep
        req.query: formid=6063865289abc8002662ff89
        req.body: 
        {
            position: 2, (<== opcjonalnie podajesz pozycje, jesli nie podajesz to req.body jest puste i dodaje jako kolejny/ostatni step w formie)
        }

        Response: {
                "_id": "60735ef5069e23001b52c3e7",
                "elements": [],
                "owner": "6071fbed622b3f001bd38680",
                "__v": 0
                }

        url: api/form/createElement
        req.query: stepid=6063865289abc8002662ff89
        req.body: 
        {
            "position": 0, <== opcjonalnie, jeśli brak to dodaje na ostatniej pozycji
            "element": {"element":"checkbox","label":"checkbox","placeholder":"wybierz"}
        }

        Response: 
                [{
                        "options": [],
                        "_id": "607366977a17ba0024fa3fce",
                        "element": "checkbox",
                        "label": "checkbox",
                        "placeholder": "wybierz"
                },
                {
                        "options": [],
                        "_id": "60736816f326650026e25051",
                        "element": "other",
                        "label": "hello",
                        "placeholder": "wybierz"
                }]

        url: api/form/editForm
        req.query: formid=6063865289abc8002662ff89
        req.body: {name: "form43"} <== nowa nazwa formy
        
        Response: {
                "steps": [
                        "6072073ecc9c4a001b670af8",
                        "60720964ac30f0001b5d6f69",
                        ],      
                "createdOn": "2021-04-10T14:10:00.591Z",
                "_id": "6071fc35622b3f001bd38681",
                "name": "form999",
                "owner": "6071fbed622b3f001bd38680",
                "__v": 19
                }

        url: api/form/editStep
        req.query: formid=6063865289abc8002662ff89 & stepid=3865289abc8002662
        req.body: 
        {
            "position": "1", <== nowa pozycja step w form)
        }
        
        Response: {
                "steps": [
                        "6072073ecc9c4a001b670af8",
                        "60720964ac30f0001b5d6f69",
                        ],      
                "createdOn": "2021-04-10T14:10:00.591Z",
                "_id": "6071fc35622b3f001bd38681",
                "name": "form999",
                "owner": "6071fbed622b3f001bd38680",
                "__v": 19
                }

        url: api/form/editElement
        req.query: stepid=6063865289abc8002662ff89 & elementid=63865289abc8
        req.body: 
        {
            "position": "3", <== nowa pozycja elementu w stepie
            "element": {"element":"checkbox","label":"checkbox","placeholder":"wybierz"} 
        }

        Response: [{
                        "options": [],
                        "_id": "607366977a17ba0024fa3fce",
                        "element": "checkbox",
                        "label": "checkbox",
                        "placeholder": "wybierz"
                },
                {
                        "options": [],
                        "_id": "60736816f326650026e25051",
                        "element": "other",
                        "label": "hello",
                        "placeholder": "wybierz"
                }]

        url: api/form/deleteform
        req.query: formid=6063865289abc8002662ff8
        
        Response: 'form deleted'

        url: api/form/deletestep
        req.query: formid=b6063865289abc8002662ff8 & stepid=6063865289abc8002662ff8
        
        Response: Form bez step ktory zostal usuniety

        url: api/form/deleteelement
        req.query: stepid=607370940a23860026bea328 & elementid=607370940a23860026bea328
        
        Response: Step bez element ktory został usunięty


dla poniższych metoda GET, w req.headers Bearer Token

        url: api/form/getform
        req.query: formid=484465

        Response: form

        url: api/form/getfullform
        req.query: formid=484465

        Response: form z wszystkimi stepami i elementami

        url: api/form/getformlist

        Response: [
                {
                        "steps": [
                        "6072af7a2be1b70025173c8c",
                        "6072afc72be1b70025173c8f",
                        "6072fe5544cec000242e5836"
                        ],
                        "createdOn": "2021-04-11T07:16:44.982Z",
                        "_id": "6072a4bee1cf010025a4bbf6",
                        "name": "form87",
                        "owner": "6072a2e9e1cf010025a4bbf5",
                        "__v": 29
                },
                {
                        "steps": [],
                        "createdOn": "2021-04-11T13:00:21.973Z",
                        "_id": "6072f32df72a9e0025a24875",
                        "name": "form9",
                        "owner": "6072a2e9e1cf010025a4bbf5",
                        "__v": 0
                }]

        url: api/form/getstep
        req.query: stepid=484465

        Response: step


