import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDto";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";




let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })


    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "231232141",
            email: "wtf@test.com",
            password: "1234",
            name: "Test name"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        })

        expect(result).toHaveProperty("token");
    })


    it("should not be able to authenticate non existent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@mail.com",
                password: "fake",
            })
        
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "123az",
                email: "wtsdfsdfdsf@test.com",
                password: "1234",
                name: "Test name"
            }
    
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "wtsdfsdfdsf@test.com",
                password: "incorrectpass"
            })
        }).rejects.toBeInstanceOf(AppError);
    })
})