export class UserController {

    constructor(userService) {
        this.service = userService

    }

    // Ojo aqui ya mandamos el body, parametros.. del request
    create = async (req, res) =>{
         try {
            // Llamamos al Service para crear usuario
            const newUser = await this.service.createUser(req.body);
            res.status(201).json(newUser); // Retornamos el usuario creado
        } catch (err) {
            res.status(400).json({ error: err.message }); // Retornamos error si existe
        }
        
    };
    list = async (req, res) => {
         try {
        const users = await this.service.listUser(); // o usa un array vacío temporal
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
    get = async (req, res) => {}; // Obtener id desde el endpoint 
    update = async (req, res) => {};
    delete = async (req, res) => {};

}