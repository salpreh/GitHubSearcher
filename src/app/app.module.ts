import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GitSearchService } from './git-search.service';

import { AppComponent } from './app.component';
import { GitSearchComponent } from './git-search/git-search.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavBarHComponent } from './nav-bar-h/nav-bar-h.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home',
    component: HomePageComponent
  },
  { path: 'search',
    redirectTo: 'search/angular/1',
    pathMatch: 'full'
  },
  { path: 'search/:query',
    redirectTo: 'search/:query/1',
    pathMatch: 'full'
  },
  { path: 'search/:query/:page',
    component: GitSearchComponent,
    data: {
      title: 'Git Search'
    }
  },
  { path: '**',
    component: NotFoundComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent,
    NavBarHComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GitSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
