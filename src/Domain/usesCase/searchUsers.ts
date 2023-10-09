import {User} from '../entities/User';

export interface IUserRepository {
  searchByName(name: string): Promise<User[]>;
}

export class SearchUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string): Promise<User[]> {
    return await this.userRepository.searchByName(name);
  }
}
