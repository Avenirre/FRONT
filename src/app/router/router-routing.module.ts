import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from '../profile/profile.component';
import {TitlePageComponent} from '../title-page/title-page.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {ModalEmployeeRegistrationComponent} from '../modal/modal-employee-registration/modal-employee-registration.component';
import {ModalEmployerRegistrationComponent} from '../modal/modal-employer-registration/modal-employer-registration.component';
import {ModalLoginComponent} from '../modal/modal-login/modal-login.component';
import {routes} from '../../environments/environment.fake-roots';
import {TestingComponent} from '../testing/testing.component';
import {CreateCvComponent} from '../create-cv/create-cv.component';

const routesApi: Routes = [
    {path: routes.root, component: TitlePageComponent},
    {path: routes.login, component: ModalLoginComponent, outlet: 'modal'},
    {path: routes.regEmployee, component: ModalEmployeeRegistrationComponent, outlet: 'modal'},
    {path: routes.regEmployer, component: ModalEmployerRegistrationComponent, outlet: 'modal'},
    {path: routes.profile, component: ProfileComponent},
    {path: 'create-cv', component: CreateCvComponent},
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
