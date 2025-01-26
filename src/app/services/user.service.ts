import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Adjust the path as per your structure

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://api.example.com/users'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  /**
   * Login a user
   * @param email - The email of the user
   * @param password - The password of the user
   * @returns an Observable containing the authentication token
   */
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  /**
   * Create a new user
   * @param user - The user details to create
   * @returns an Observable of the created user
   */
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  /**
   * Reset password
   * @param email - The email of the user requesting the password reset
   * @returns an Observable for success or failure
   */
  resetPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reset-password`, { email });
  }

  /**
   * Logout the current user
   * @returns an Observable for the logout process
   */
  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {});
  }

  /**
   * View user details by ID
   * @param userId - The ID of the user to fetch details for
   * @returns an Observable of the user details
   */
  viewUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  /**
   * Fetches a list of users from the server.
   *
   * @return {Observable<User[]>} An observable containing an array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  /**
   * Deletes a user identified by the provided user ID.
   *
   * @param {number} userId - The unique identifier of the user to be deleted.
   * @return {Observable<void>} An observable that completes when the user is successfully deleted.
   */
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }
}
