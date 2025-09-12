export class UserService{

    constructor(userRepository){
         this.repo = userRepository
    }
    async createUser(dto){

// Aqui cuenta y revisa los emails de usuarios si existe es 1,, sino,  es 0 

  const exists = await User.countDocuments({ email: userData.email });


  // Si existe , lanza el error
    if (exists > 0) {
      throw new Error("El correo ya está registrado");



    
    }

        /*
        Lógica para cuando se ingrese el correo
        pues no esté existente...
         */
    }
    async listUser(){
        /*
        Limitar a exportar máximo 10 */
    }
    async getUser(id){
        return this.repo.findById(id);
    }
    async updateUser(id,dto){}
    async deleteUser(id){}
}


