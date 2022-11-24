import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

export class User {
  _id: any;
  name!: string;
  email!: string;
  username!: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserCrudService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.httpClient
      .post<User>(
        'http://localhost:5000/api/create-user',
        user,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<User>('Error Occured')));
  }

  getUser(id: number): Observable<User[]> {
    return this.httpClient
      .get<User[]>('http://localhost:5000/api/fetch-user/' + id)
      .pipe(
        tap((_) => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User[]>(`Get User id=${id}`))
      );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:5000/api').pipe(
      tap((users) => console.log('Users fetched')),
      catchError(this.handleError<User[]>('Get Users', []))
    );
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.httpClient
      .put(
        'http://localhost:5000/api/update-user/' + id,
        user,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update User'))
      );
  }

  deleteUser(id: any): Observable<User[]> {
    return this.httpClient
      .delete<User[]>(
        'http://localhost:5000/api/delete-user/' + id,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`User deleted: ${id}`)),
        catchError(this.handleError<User[]>('Delete User'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return new Observable<T>();
    };
  }
}
