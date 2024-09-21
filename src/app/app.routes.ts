import { Routes } from '@angular/router';
import { StartLayoutComponent } from './layouts/start-layout/start-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { apiKeyGuard } from './core/guards/api-key.guard';
import { hasApiKeyGuard } from './core/guards/has-api-key.guard';



export const routes: Routes = [
    {
        path: "", component: StartLayoutComponent, canActivate: [hasApiKeyGuard], children: [
            { path: "", redirectTo: "welcome", pathMatch: "full" },
            { path: "welcome", component: WelcomeComponent, title: "Welcome" }
        ]
    },
    {
        path: "", component: MainLayoutComponent, canActivate: [apiKeyGuard],
        children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "todos", component: HomeComponent, title: "My Todos" }
        ]
    },
    { path: '**', component: NotfoundComponent, title: "Not Found 404" }

];
