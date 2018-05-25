import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
 /**
  *这里是全局路由配置，全局路由只有2个，login和main
  *用户从login登录之后跳转到workspace
  */
export const appRoutes = [
   {
     path: '',
     redirectTo: 'login',
     pathMatch: 'full'
   },
   {
     path: 'login',
     component: LoginComponent
   },
   {
     path: 'main',
     loadChildren: './main/main.module#MainModule'
     // component: MainComponent
   },
   {
     path: '**', // fallback router must in the last
     component: LoginComponent
   }
];
