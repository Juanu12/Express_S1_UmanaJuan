export class userController {

    constructor(userService) {
        this.service = userService

    }

    // Ojo aqui ya manamos el body, parametros.. del request
    create = async (req, res) =>{};
    list = async (req, res) => {};
    get = async (req, res) => {}; // Obtener id desde el endpoint 
    update = async (req, res) => {};
    delete = async (req, res) => {};

}