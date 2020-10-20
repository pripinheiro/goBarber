import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute({ token, password }: IRequest): Promise<void> {
   const userToken = await this.userTokensRepository.findByToken(token);

   if (!userToken) {
     throw new AppError('User token does not exists')
   }
   const user = await this.usersRepository.findById(userToken.user_id);

   if (!user) {
     throw new AppError('User does not exist');
   }

   user.password = await this.hashProvider.generateHash(password);
   
   await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;