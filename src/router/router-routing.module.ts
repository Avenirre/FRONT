import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from '../app/profile/profile.component';
import {TitlePageComponent} from '../app/title-page/title-page.component';
import {NotFoundComponent} from '../app/not-found/not-found.component';
import {LoginFormComponent} from '../app/auth/login-form/login-form.component';
import {environment} from '../environments/environment';
import {TestingComponent} from '../app/testing/testing.component';
import {CreateCvComponent} from '../app/create-cv/create-cv.component';
import {CompanyRegFormComponent} from '../app/auth/company-reg-form/company-reg-form.component';
import {CandidateRegFormComponent} from '../app/auth/candidate-reg-form/candidate-reg-form.component';
import {MessageComponent} from '../app/modal/message/message.component';
import {CvPresentationComponent} from '../app/create-cv/cv-presentation/cv-presentation.component';

const routes = environment.routes;
const routesApi: Routes = [
  {path: routes.root, component: TitlePageComponent},
  {path: routes.login, component: LoginFormComponent, outlet: 'modal'},
  {path: routes.regCandidate, component: CandidateRegFormComponent, outlet: 'modal'},
  {path: routes.regCompany, component: CompanyRegFormComponent, outlet: 'modal'},
  {path: routes.profile, component: ProfileComponent},
  {
    path: routes.cvCreate, component: CreateCvComponent, children: [
      {path: ':type', component: CvPresentationComponent}
    ]
  },
  {path: 'message', component: MessageComponent, outlet: 'modal'},
  {path: 'testing', component: TestingComponent},
  {path: '404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routesApi),
  ],
  exports: [RouterModule]
})
export class RouterRoutingModule {
}
