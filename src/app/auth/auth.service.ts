import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from "rxjs"
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment"

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string, 
    refreshToken: string,
    expiresIn: string, 
    localId: string,
    registered?: boolean
}


@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    

    constructor(private http: HttpClient, private router: Router){}

    signUp(email: string, password: string, ){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.APIkey,
        {email: email,
        password: password,
    returnSecureToken: true} 
    ).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.APIkey, 
        {email: email,
        password: password,
        returnSecureToken: true}
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }))
    }

    logout(){
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _expirationDate: string
        } = JSON.parse(localStorage.getItem('userData'))
        if (!userData){
            return
        } 
        const loadeduser = new User(userData.email, userData.id, userData._token, new Date (userData._expirationDate));
        if (loadeduser.token) {
            this.user.next(loadeduser);
            this.autoLogout(new Date (userData._expirationDate).getTime() - new Date().getTime())
        }        
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() =>{
            this.logout()
        }, expirationDuration)
    }


    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handleError(errorRes: HttpErrorResponse) {

        let errorMessage = "An unknown error has occured!"
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already';
            break;
            case 'EMAIL_NOT_FOUND' || "INVALID_PASSWORD":
                errorMessage = "Incorrect User Credentials";
            break;
            }
        return throwError(errorMessage)
    
    }

}