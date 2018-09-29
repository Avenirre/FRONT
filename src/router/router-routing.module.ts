import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileCandidateComponent} from '../app/profiles/profile-candidate/profile-candidate.component';
import {TitlePageComponent} from '../app/title-page/title-page.component';
import {NotFoundComponent} from '../app/not-found/not-found.component';
import {LoginFormComponent} from '../app/auth/login-form/login-form.component';
import {environment} from '../environments/environment';
import {TestingComponent} from '../app/testing/testing.component';
import {CreateCvComponent} from '../app/create-cv/create-cv.component';
import {CompanyRegFormComponent} from '../app/auth/company-reg-form/company-reg-form.component';
import {CandidateRegFormComponent} from '../app/auth/candidate-reg-form/candidate-reg-form.component';
import {MessageComponent} from '../app/modal/message/message.component';
import {AuthGuard} from '../app/auth/auth-guard.service';
import {ProfileCompanyComponent} from '../app/profiles/profile-company/profile-company.component';
import {ProfileCvsComponent} from '../app/profiles/profile-candidate/profile-cvs/profile-cvs.component';
import {ProfileSettingComponent} from '../app/profiles/profile-candidate/profile-setting/profile-setting.component';
import {ProfileStatisticComponent} from '../app/profiles/profile-candidate/profile-statistic/profile-statistic.component';
import {CompanyFolderComponent} from '../app/profiles/profile-company/company-folder/company-folder.component';
import {CompanySettingsComponent} from '../app/profiles/profile-company/company-settings/company-settings.component';
import {CvPresentationComponent} from '../app/create-cv/cv-presentation/cv-presentation.component';
import {CvSearchComponent} from '../app/profiles/profile-company/cv-search/cv-search.component';
import {ShowCvComponent} from '../app/create-cv/show-cv/show-cv.component';

const routes = environment.routes;
const routesApi: Routes = [
  {path: routes.root, component: TitlePageComponent},
  {path: routes.login, component: LoginFormComponent, outlet: 'modal'},
  {path: routes.regCandidate, component: CandidateRegFormComponent, outlet: 'modal'},
  {path: routes.regCompany, component: CompanyRegFormComponent, outlet: 'modal'},
  {
    path: routes.profile,
    // component: ProfileCandidateComponent,
    canActivate: [AuthGuard],
    children: []
  },
  {
    path: routes.profileCandidate, component: ProfileCandidateComponent,
    children: [
        {path: '', redirectTo: 'cvs-manager', pathMatch: 'full'},
        {path: 'cvs-manager', component: ProfileCvsComponent},
        {path: 'settings', component: ProfileSettingComponent},
        {path: 'statistics', component: ProfileStatisticComponent}
    ]
  },
  {
    path: routes.profileCompany, canActivateChild: [AuthGuard], children: [
      {
        path: ':section', component: ProfileCompanyComponent, children: [
          {path: ':id', component: CompanyFolderComponent},
        ]
      },
      // {path: routes.profileCompanySearch, component: CvSearchComponent},
      // {path: routes.profileCompanySettings, component: CompanySettingsComponent},
    ]
  },
  {
    path: routes.cvCreate, component: CreateCvComponent, children: [
      {path: ':type', component: CvPresentationComponent}
    ]
  },
  {
    path: routes.cvEdit, component: CreateCvComponent, children: [
        {
          path: ':type',
          canActivate: [AuthGuard],
          component: CvPresentationComponent
        }
    ]
  },
  // {path: routes.cvShow, component: ShowCvComponent},
  {path: 'message', component: MessageComponent, outlet: 'modal'},
  {path: 'testing', component: TestingComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routesApi),
  ],
  exports: [RouterModule]
})
export class RouterRoutingModule {
}
