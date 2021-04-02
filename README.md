Hello ;)

endpointy:

api/user/signup methode: POST, req.body{email: 'janek@gmail.com', password: 'hello'} Response: {
        status: "success",
        token}

api/user/google methode: GET wchodzisz i leci sobie flow google a dostajesz  przekierowanie i Response na api/user/google/callback : {
        status: "success",
        token}

api/user/login methode: POST, req.body{email: 'janek@gmail.com', password: 'hello'} Response: {
        status: "success",
        token,
        }


do wszystkich poniżej metoda POST i w req.headers musisz dać Bearer token:
api/form/createForm -  
        req.body: object z name formy
        np. 
                {
                "name":"form43",
                }
        jako response masz object z form (caly form) i z id nadanym przez baze dla formy

        np.     {
                "steps": [],
                "createdOn": "2021-04-01T19:49:42.175Z",
                "_id": "60662434db2624001a25ea64",
                "name": "form123",
                "__v": 0
                }

api/form/createStep?formid=6063865289abc8002662ff89
        req.body: 
        {
            "position": "2", (<== opcjonalnie podajesz pozycje, jesli nie podajesz to req.body jest puste i dodaje jako kolejny/ostatni step w formie)
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
                "name":"form43", <== nowa nazwa form)
                }
        jako response masz object form


api/form/editStep?formid=6063865289abc8002662ff89&stepid=3865289abc8002662
        req.body: 
        {
            "position": "1", <== nowa pozycja step w form)
        }
        jako response masz object step 

api/form/editElement?stepid=6063865289abc8002662ff89&elementid=63865289abc8
        req.body: 
        {
        "position": "3", 
        "element": {"element":"checkbox","label":"checkbox","placeholder":"wybierz"}
        }

        jako response masz object element 


dla poniższych metoda GET, w req.headers Bearer Token

api/form/getform?formid=484465

        jako response dostajesz form

api/form/getformlist

        jako response dostajesz liste form uzytkownika

api/form/getstep?stepid=484465

        jako response dostajesz step
