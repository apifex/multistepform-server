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
api/form/createForm -  
        req.body: object form
        np. 
                {
                "name":"form43",
                "steps":[
                        {"elements":
                        [{"element":"input","label":"imie","placeholder":"wpisz imie"},
                        {"element":"input","label":"nazwisko","placeholder":"wpisz nazwisko"}]
                        },
                        {"elements":
                        [{"element":"input","label":"hobby","placeholder":"wpisz hobby"},
                        {"element":"input","label":"adres","placeholder":"wpisz adres"}]
                        }
                ]
                }
        jako response masz object form z polem _id nadanym przez baze dla form, dla każdego step(o ile byl), i dla kazdego element(o ile byly)

api/form/createStep?formid=6063865289abc8002662ff89
        req.body: 
        {
            "stepPosition": "2",
            "step": {"elements":
                [{"element":"button","label":"wyslij","placeholder":""},
                {"element":"checkbox","label":"checkbox","placeholder":"wybierz"}
                ]}
        }

        jako response masz object step z polem _id nadanym przez baze podobnie jak wyzej

api/form/createElement?stepid=6063865289abc8002662ff89
        req.body: 
        {
        "elementPosition": "2",
        "element": {"element":"checkbox","label":"checkbox","placeholder":"wybierz"}
        }

        jako response masz object element z polem _id nadanym przez baze podobnie jak wyzej

api/form/editForm?formid=6063865289abc8002662ff89

        req.body: object form
        np. 
                {
                "name":"form43",
                "steps":[
                        {"elements":
                        [{"element":"input","label":"imie","placeholder":"wpisz imie"},
                        {"element":"input","label":"nazwisko","placeholder":"wpisz nazwisko"}]
                        },
                        {"elements":
                        [{"element":"input","label":"hobby","placeholder":"wpisz hobby"},
                        {"element":"input","label":"adres","placeholder":"wpisz adres"}]
                        }
                ]
                }
        jako response masz object form


api/form/editStep?formid=6063865289abc8002662ff89&stepid=3865289abc8002662
        req.body: 
        {
            "stepPosition": "1",
            "step": {"elements":
                [{"element":"button","label":"wyslij","placeholder":""},
                {"element":"checkbox","label":"checkbox","placeholder":"wybierz"}
                ]}
        }

        jako response masz object step 

api/form/editElement?stepid=6063865289abc8002662ff89&elementid=63865289abc8
        req.body: 
        {
        "elementPosition": "2",
        "element": {"element":"checkbox","label":"checkbox","placeholder":"wybierz"}
        }

        jako response masz object element 

