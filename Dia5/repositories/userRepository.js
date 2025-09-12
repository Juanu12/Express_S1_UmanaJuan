// Repositorio es donde guardamos datos u instancias

export class UserRepository{
    constructor(UserModel){
        this.User = UserModel;//OJO --- NO OLVIDARSE QUE "User" es un atributo de UserRepository
    }
    async create(data){
        return this.User.create(data);
    }
    async findAll(){
        return this.User.find();
    }
    async findByID(id){

        return this.User.findByID(id)
    }
    async updateById(id,data){
        return this.User.updateById(id, data)
    }

    async deleteById(id){
        return this.User.deleteById(id)
    }
    async findByEmail(email){
        return this.User.findByEmail(email)
    }
}