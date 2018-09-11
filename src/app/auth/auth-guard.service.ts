import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ModalService} from '../modal/modal.service';
import {DataService} from '../../services/data.service';
import {environment} from '../../environments/environment';
import {SectionUnit} from '../../enums/section.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private routes = environment.routes;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const usertype = DataService.getUserType();
    if (usertype === 'COMPANY') {
      let section;
      const localSection: SectionUnit = DataService.getCurrentMenuSection();
        if (localSection !== null) {
          section = localSection;
        } else {
          section = this.routes.profileCompanySearch;
        }
        switch (section) {
          case SectionUnit.SEARCH: {
            section = this.routes.profileCompanySearch;
            break;
          }
          case SectionUnit.SETTINGS: {
            section = this.routes.profileCompanySettings;
            break;
          }
          case SectionUnit.FOLDERS: {
            section = this.routes.profileCompanyFolders;
            break;
          }
        }
      this.router.navigate([this.routes.profileCompany, this.routes.profileCompanySearch]);
    } else if (usertype === 'CANDIDATE') {
      this.router.navigate([this.routes.profileCandidate]);
    }
    const isAuthorisedUser = AuthService.isLoggedIn();
    if (isAuthorisedUser) {
      return true;
    }
    this.router.navigate(['/'], {relativeTo: this.route});
    this.modalService.showUnauthorizedMessage();
    return false;
    // return true;
  }
}
