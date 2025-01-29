import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = `${environment.baseUrl}/users`;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', 'fdhj678AHGJKfj7nfj3gF4DDe3'))
    );
  }

  //checkAuthentication(): Observable<boolean> {
  checkAuthentication(): boolean {
    //if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');

    if (token) {
      this.http
        .get<User>(`${this.baseUrl}/1`)
        .subscribe((user) => (this.user = user));
    }

    return token != null;
    // return this.http.get<User>(`${this.baseUrl}/1`).pipe(
    //   tap((user) => (this.user = user)),
    //   map((user) => !!user),
    //   catchError((err) => of(false))
    // );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
