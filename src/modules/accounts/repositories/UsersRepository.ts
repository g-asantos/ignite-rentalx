import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDto';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '../infra/typeorm/entities/User';


class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async create({
        name,
        driver_license,
        email,
        password,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            driver_license,
            email,
            password,
            avatar,
            id,
        });

        await this.repository.save(user);
    }
}

export { UsersRepository };
