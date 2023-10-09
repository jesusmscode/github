import {useState} from 'react';
import {User} from '../../domain/entities/User';
import {IUserRepository} from '../../Domain/usesCase/searchUsers';

export function useUser(repository: IUserRepository) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const searchUsers = async (query: string) => {
    try {
      setLoading(true);
      const result = await repository.searchByName(query);
      setUsers(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, users, searchUsers};
}
