import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GitSearchService } from '../git-search.service';
import { GitRepositories } from '../git-repositories';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  title: string;
  displayQuery: string;
  searchResults: GitRepositories;
  searchQuery: string;
  constructor(
    private gitSearchService: GitSearchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();
    });

    this.route.data.subscribe(data => {
      this.title = data.title;
    });
  }

  gitSearch(): void {
    this.gitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.searchResults = response;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  sendQuery(): void {
    this.searchResults = null;
    this.router.navigate([`/search/${this.searchQuery}`]);
  }

}
