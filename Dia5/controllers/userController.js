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
            res.status(400).json({ error: err.message }); 
        }
        
    };
    list = async (req, res) => {
         try {
        const users = await this.service.listUser(); // o usa un array vacío temporal
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
    get = async (req, res) => {
        const { id } = req.params; // Tomamos el id que ingresan en los parametros 

        try{
            const getUsers = await this.service.getUser(id);
            res.status(200).json(getUsers); // Retornamos el usuario obtenido


        } catch (err) {
            res.status(400).json({error: err.message})
        }



    }; // Obtener id desde el endpoint 
    update = async (req, res) => {

        const {id} = req.params;



        try {


            const updteUser = await this.service.updateUser(id, req.body);

            if (!updteUser) return res.status(404).json({ error: "Usuario no encontrado" });

            res.status(200).json(updteUser);// Retornamos el usuario actualizado

        } catch(err) {

            res.status(400).json({ error: err.message }); 


        }
    };
    delete = async (req, res) => {

 const { id } = req.params; // Tomamos el id que ingresan en los parametros 

        try{
            const deltUser = await this.service.deleteUser(id);
            res.status(200).json(deltUser); // Retornamos el usuario  eliminado


        } catch (err) {
            res.status(400).json({error: err.message})
        }

    };

}