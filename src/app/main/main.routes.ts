import { MainComponent } from './main.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { ArticleListComponent } from './content/article-list/article-list.component';
import { ArticleAddComponent} from './content/article-add/article-add.component';

export const mainRoutes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'articleList', component: ArticleListComponent},
      { path: 'articleAdd', component: ArticleAddComponent},
    ]
  }
];
