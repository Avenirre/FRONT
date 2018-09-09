// MODULES
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterRoutingModule} from '../router/router-routing.module';
import { AgmCoreModule } from '@agm/core';
import {AgmCvComponent} from './create-cv/cv-form/agm-cv/agm-cv.component';
// LIBRARIES

// COMPONENTS
import {AppComponent} from './app.component';
import {TitlePageComponent} from './title-page/title-page.component';
import {TitlePageHeaderComponent} from './title-page/title-page-header/title-page-header.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {StatisticsComponent} from './title-page/statistics/statistics.component';
import {TutorialComponent} from './title-page/tutorial/tutorial.component';
import {TemplatesComponent} from './title-page/templates/templates.component';
import {CompaniesComponent} from './title-page/companies/companies.component';
import {LoginFormComponent} from './auth/login-form/login-form.component';
import {CandidateRegFormComponent} from './auth/candidate-reg-form/candidate-reg-form.component';
import {CompanyRegFormComponent} from './auth/company-reg-form/company-reg-form.component';
import {ModalComponent} from './modal/modal.component';
import {ProfileCandidateComponent} from './profiles/profile-candidate/profile-candidate.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProfileMenuComponent} from './profiles/profile-candidate/profile-menu/profile-menu.component';
import {ProfileCvsComponent} from './profiles/profile-candidate/profile-cvs/profile-cvs.component';
import {CvsEditPanelComponent} from './profiles/profile-candidate/profile-cvs/cvs-edit-panel/cvs-edit-panel.component';
import {CreateCvComponent} from './create-cv/create-cv.component';
import {TestingComponent} from './testing/testing.component';
import {CvFormComponent} from './create-cv/cv-form/cv-form.component';
import {CvPresentationComponent} from './create-cv/cv-presentation/cv-presentation.component';
import {CvChooseViewComponent} from './create-cv/cv-choose-view/cv-choose-view.component';
import {CvActionsComponent} from './create-cv/cv-actions/cv-actions.component';

// SERVICES
import {ModalService} from './modal/modal.service';
import {ApiService} from '../services/rest/api.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiCandidatesService} from '../services/rest/api-candidates.service';
import {ApiCompaniesService} from '../services/rest/api-companies.service';
import {CvItemComponent} from './profiles/profile-candidate/profile-cvs/cv-item/cv-item.component';
import {MessageComponent} from './modal/message/message.component';
import {BtnsLoggedComponent} from './header/header-controls/btns-logged/btns-logged.component';
import {BtnsUnloggedComponent} from './header/header-controls/btns-unlogged/btns-unlogged.component';
import {AuthService} from './auth/auth.service';
import { ProfileCompanyComponent } from './profiles/profile-company/profile-company.component';
import { CompanyMenuComponent } from './profiles/profile-company/company-menu/company-menu.component';
// import { CvPreviewComponent } from './profiles/profile-company/cv-preview/cv-preview.component';
import { ProfileStatisticComponent } from './profiles/profile-candidate/profile-statistic/profile-statistic.component';
import { ProfileSettingComponent } from './profiles/profile-candidate/profile-setting/profile-setting.component';
import { CompanyCvPrevComponent } from './profiles/profile-company/company-folder/company-cv-prev/company-cv-prev.component';
import { CmpEditPanelComponent } from './profiles/profile-company/company-folder/cmp-edit-panel/cmp-edit-panel.component';
import { CompanyFolderComponent } from './profiles/profile-company/company-folder/company-folder.component';
import { CompanySettingsComponent } from './profiles/profile-company/company-settings/company-settings.component';


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
    LoginFormComponent,
    CompanyRegFormComponent,
    CandidateRegFormComponent,
    ModalComponent,
    ProfileCandidateComponent,
    NotFoundComponent,
    ProfileMenuComponent,
    ProfileCvsComponent,
    CvsEditPanelComponent,
    TestingComponent,
    CreateCvComponent,
    CvFormComponent,
    CvPresentationComponent,
    CvChooseViewComponent,
    CvActionsComponent,
    CvItemComponent,
    MessageComponent,
    BtnsLoggedComponent,
    BtnsUnloggedComponent,
    ProfileCompanyComponent,
    CompanyMenuComponent,
    // CvPreviewComponent,
    ProfileStatisticComponent,
    ProfileSettingComponent,
    CompanyCvPrevComponent,
    CmpEditPanelComponent,
    CompanyFolderComponent,
    CompanySettingsComponent,
      AgmCvComponent
  ],
  imports: [
      AgmCoreModule.forRoot({
          apiKey: 'AIzaSyA-FppnYJfomJjEu7p3kkhcw2P3RqLZ-9c',
          libraries: ["places"]
      }),
    BrowserModule,
    RouterRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ModalService,
    ApiService,
    ApiCandidatesService,
    ApiCompaniesService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
