import {User} from '../Domain/entities/User';
import {IUserRepository} from '../Domain/usesCase/searchUsers';

export class GithubAPIAdapter implements IUserRepository {
  private BASE_URL = 'https://api.github.com';

  async searchByName(name: string): Promise<User[]> {
    const response = await fetch(`${this.BASE_URL}/search/users?q=${name}`);
    const data = await response.json();

    return data.items.map((item: any) => ({
      id: item.id,
      name: item.login,
      avatarUrl: item.avatar_url,
      repositories: item.repos_url,
      organizations: item.organizations_url,
      personalURL: item.html_url,
    }));
  }

  async getOrganizations(username: string): Promise<string[]> {
    const response = await fetch(`${this.BASE_URL}/users/${username}/orgs`);
    const data = await response.json();

    return data.map((org: any) => org.login);
  }

  async getRepositories(username: string): Promise<string[]> {
    const response = await fetch(`${this.BASE_URL}/users/${username}/repos`);
    const data = await response.json();

    return data.map((repo: any) => repo.name);
  }
}
