import {useState, useEffect} from 'react';
import {GithubAPIAdapter} from '../../infra/api';

export const useOrganizations = (username: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [organizations, setOrganizations] = useState<string[]>([]);

  const apiAdapter = new GithubAPIAdapter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgs = await apiAdapter.getOrganizations(username);
        setOrganizations(orgs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return {loading, error, organizations};
};
