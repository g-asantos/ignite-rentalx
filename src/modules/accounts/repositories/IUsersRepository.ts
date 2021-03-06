import { ICreateUserDTO } from '../dtos/ICreateUserDto';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
