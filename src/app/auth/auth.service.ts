import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from "rxjs"
import { User } from './user.model';
import { Router } from '@angular/router';

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
    

    constructor(private http: HttpClient, private router: Router){}

    signUp(email: string, password: string, ){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAR_-ld7E1cLeSLlaz4QM-tcbI7wu44C1c',
        {email: email,
        password: password,
    returnSecureToken: true} 
    ).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAR_-ld7E1cLeSLlaz4QM-tcbI7wu44C1c', 
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
    }


    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user)
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