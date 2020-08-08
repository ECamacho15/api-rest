const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let user = {
    name: '',
    lastName: '',
}

let response = {
    error: false,
    code: 200,
    message: '',
}

app.get('/', (req, res) => {
    response = {
        error: true,
        code: 200,
        message: 'Initial Point',
    }
    res.send(response)
})

app.route('/user')
    .get((req, res) => {
        response = {
            error: false,
            code: 200,
            message: '',
        }
        if(user.name === '' || user.lastName === '') {
            response = {
                error: true,
                code: 501,
                message: 'User has not been created',
            };
        } 
        else {
            response = {
                error: false,
                code: 200,
                message: 'user response',
                response: user,
            };
        }
        res.send(response)
    })
    .post((req, res) => {
        if(!req.body.name || !req.body.lastName) {
            response = {
                error: true,
                code: 502,
                message: 'Name and LastName required'
            };
        } else {
            if(user.name !== '' || user.lastName !== '') {
                response = {
                    error: true,
                    code: 503,
                    message: 'User is already created'
                }
            } 
            else {
                user = {
                    name: req.body.name,
                    lastName: req.body.lastName
                }
                response = {
                    error: false,
                    code: 200,
                    message: 'User Created',
                    response: user
                }
            }
        }
        res.send(response)
    })
    .put((req, res) => {
        if(!req.body.name || !req.body.lastName) {
            response = {
                error: true,
                code: 502,
                message: 'El campo nombre y apellido son requeridos'
            }
        } 
        else {
            if(user.name === '' || user.lastName === '') {
                response = {
                    error: true,
                    code: 501,
                    message: 'El usuario no ha sido creado'
                }
            } 
            else {
                user = {
                    name: req.body.name,
                    lastName: req.body.lastName
                }
                response = {
                    error: false,
                    code: 200,
                    message: 'Usuario actualizado',
                    response: user
                }
            }
        } 
        res.send(response)
    })
    .delete((req, res) => {
        if(user.name === '' || user.lastName === '') {
            response = {
                error: true,
                code: 501,
                message: 'User has not been created!'
            }
        } 
        else {
            response = {
                error: false,
                code: 200,
                message: 'User Deleted!'
            }
            user = { 
                name: '', 
                lastName: '' 
            }
        }
        res.send(response);
    })

app.use((req, res, next) => {
    response = {
        error: true, 
        code: 404, 
        message: 'URL NOT FOUND'
    }
    res.status(404).send(response);
})

app.listen(3000, () => {
    console.log("Server initialized in port 3000")
})