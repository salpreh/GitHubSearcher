import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitRepositories } from './git-repositories';
import { GitUsers } from './git-users';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues: Array<{
    [query: string]: GitRepositories
  }> = [];
  constructor(private http: HttpClient) { }

  gitSearch = (query: string) => {
    const promise = new Promise<GitRepositories>((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query]);

      } else {
        this.http.get('https://api.github.com/search/repositories?q=' + query)
        .toPromise()
        .then((response) => {
          resolve(response as GitRepositories);

        }, (error) => {
          reject(error);

        });
      }
    });

    return promise;
  }

  gitUserSearch(query: string): Promise<GitUsers> {
    const promise = new Promise<GitUsers>((resolve, reject) => {
      this.http.get(`https://api.github.com/search/users?q=${query}`)
      .toPromise()
      .then((response) => {
        resolve(response as GitUsers);
      }, (error) => {
        reject(error);
      });
    });

    return promise;
  }
}
