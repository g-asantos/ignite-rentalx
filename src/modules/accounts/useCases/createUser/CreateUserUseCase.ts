import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDto';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        name,
        driver_license,
        email,
        password,
        username,
    }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            driver_license,
            email,
            name,
            password,
            username,
        });
    }
}

export { CreateUserUseCase };
