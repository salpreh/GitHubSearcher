import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GitSearchService } from '../git-search.service';
import { GitRepositories } from '../git-repositories';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css', '../app.component.css']
})
export class GitSearchComponent implements OnInit {

  title: string;
  displayQuery: string;
  searchResults: GitRepositories;
  searchQuery: string;
  searchPage: number;
  navigationData = {
    entriesXPage: 30,
    hasNext: false,
    hasPrevious: false
  };

  constructor(
    private gitSearchService: GitSearchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.searchPage = parseInt(params.get('page'), 10);
      this.displayQuery = params.get('query');
      this.gitSearch();
    });

    this.route.data.subscribe(data => {
      this.title = data.title;
    });
  }

  gitSearch(): void {
    this.gitSearchService.gitRepositorySearch(this.searchQuery, this.searchPage)
    .then((response) => {
      this.searchResults = response;
      this.checkNavigation();
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  nextPage(): void {
    if (this.navigationData.hasNext) {
      this.searchPage++;
      this.sendQuery();
    }
  }

  previousPage(): void {
    if (this.navigationData.hasPrevious) {
      this.searchPage--;
      this.sendQuery();
    }
  }

  newSearch(): void {
    this.searchPage = 1;
    this.sendQuery();
  }

  sendQuery(): void {
    this.searchResults = null;
    this.router.navigate([`/search/${this.searchQuery}/${this.searchPage}`]);
  }

  checkNavigation(): void {
    this.navigationData.hasPrevious = this.searchPage > 1;
    this.navigationData.hasNext = this.searchResults.total_count > this.searchPage * this.navigationData.entriesXPage;
  }

}
