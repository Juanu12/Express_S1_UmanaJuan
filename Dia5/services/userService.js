export class UserService {
    constructor(userRepository) {
        this.repo = userRepository; // Guardamos la instancia del Repository
    }

    async createUser(userData) {
       
        // Busca si ya existe un usuario con el mismo email
        const existingUser = await this.repo.findByEmail(userData.email);

        // Si existe, lanza el error
        if (existingUser) {
            throw new Error("El correo ya está registrado");
        }

       // Sino existe muestra la data
        return this.repo.create(userData);
    }

    async listUser() {
        // Retorna máximo 10 usuarios
        return this.repo.findAll();
    }

    async getUser(id) {
        return this.repo.findById(id);
    }

    async updateUser(id, dto) {
        return this.repo.updateById(id, dto);
    }

    async deleteUser(id) {
        return this.repo.deleteById(id);
    }
}
