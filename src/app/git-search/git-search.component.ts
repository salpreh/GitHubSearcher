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
  navigationData = {
    currentPage: 0,
    entriesXPage: 0,
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
      this.displayQuery = params.get('query');
      this.gitSearch();
    });

    this.navigationData.currentPage = 1;

    this.route.data.subscribe(data => {
      this.title = data.title;
    });
  }

  gitSearch(): void {
    this.gitSearchService.gitRepositorySearch(this.searchQuery, this.navigationData.currentPage)
    .then((response) => {
      this.searchResults = response;
      this.checkNavigation();
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  nextPage(): void {
    if (this.navigationData.hasNext) {
      this.navigationData.currentPage++;
      this.gitSearch();
    }
  }

  previousPage(): void {
    if (this.navigationData.hasPrevious) {
      this.navigationData.currentPage--;
      this.gitSearch();
    }
  }

  sendQuery(): void {
    this.searchResults = null;
    this.router.navigate([`/search/${this.searchQuery}`]);
  }

  checkNavigation(): void {
    this.navigationData.hasPrevious = this.navigationData.currentPage > 1;

    if (this.navigationData.currentPage === 1) {
      this.navigationData.entriesXPage = this.searchResults.items.length;
    }

    this.navigationData.hasNext = this.searchResults.total_count > this.navigationData.currentPage * this.navigationData.entriesXPage;
  }

}
