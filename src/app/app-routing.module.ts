import { LoginComponent } from './components/login/login.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  { path: "",component:DashbordComponent, canActivate: [AuthGuardGuard]  },
  { path: "clients/add", component: AddClientComponent, canActivate: [AuthGuardGuard] },
  { path: "clients/:id", component: DetailsClientComponent, canActivate: [AuthGuardGuard] },
  { path: "clients/edit/:id", component: EditClientComponent ,canActivate: [AuthGuardGuard]},
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "settings", component: SettingsComponent,canActivate: [AuthGuardGuard] },
  { path: "**", component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardGuard]
})
export class AppRoutingModule { }
