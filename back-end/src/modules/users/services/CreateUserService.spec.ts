import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });
  });

    it('should be able to create a new user with same email from another', async () => {
      const fakeUsersRepository = new FakeUsersRepository();
      const createUser = new CreateUserService(fakeUsersRepository);
  
      await createUser.execute({
        name: 'John Doe',
        email: 'johndoe@exemple.com',
        password: '123456',
      });

      await expect(
        createUser.execute({
          name: 'John Doe',
          email: 'johndoe@exemple.com',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
});
