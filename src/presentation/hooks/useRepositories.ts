import {useState, useEffect} from 'react';
import {GithubAPIAdapter} from '../../infra/api';

export const useRepositories = (username: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [repositories, setRepositories] = useState<string[]>([]);

  const apiAdapter = new GithubAPIAdapter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repos = await apiAdapter.getRepositories(username);
        setRepositories(repos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return {loading, error, repositories};
};
