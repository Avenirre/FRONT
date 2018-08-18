  //MODULES
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterRoutingModule } from './router/router-routing.module';

//LIBRARIES
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//COMPONENTS
import { AppComponent } from './app.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { TitlePageHeaderComponent } from './title-page/title-page-header/title-page-header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { StatisticsComponent } from './title-page/statistics/statistics.component';
import { TutorialComponent } from './title-page/tutorial/tutorial.component';
import { TemplatesComponent } from './title-page/templates/templates.component';
import { CompaniesComponent } from './title-page/companies/companies.component';
import { ModalLoginComponent } from './modal/modal-login/modal-login.component';
import { ModalEmployerRegistrationComponent } from './modal/modal-employer-registration/modal-employer-registration.component';
import { ModalEmployeeRegistrationComponent } from './modal/modal-employee-registration/modal-employee-registration.component';
import { ModalComponent } from './modal/modal.component';
import { SliderModule } from 'angular-image-slider';

//SERVICES
import { ModalService } from './services/modal.service';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApiService } from './services/api.service';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    TitlePageComponent,
    TitlePageHeaderComponent,
    FooterComponent,
    HeaderComponent,
    StatisticsComponent,
    TutorialComponent,
    TemplatesComponent,
    CompaniesComponent,
    ModalLoginComponent,
    ModalEmployerRegistrationComponent,
    ModalEmployeeRegistrationComponent,
    ModalComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    SliderModule,
    AngularFontAwesomeModule,
    RouterRoutingModule,
    HttpClientModule
  ],
  providers: [
    ModalService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
