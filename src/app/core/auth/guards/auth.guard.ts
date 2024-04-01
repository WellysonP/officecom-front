import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserSessionService } from '../services/user-session.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private router: Router, private authenticationService: AuthenticationService, private userSessionService: UserSessionService) {}

    canActivate() {
        this.authenticationService.forceAuthenticate();
        if (this.userSessionService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}
