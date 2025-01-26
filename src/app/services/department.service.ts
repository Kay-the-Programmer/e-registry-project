import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly apiUrl = 'https://api.example.com/departments';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of departments from the server.
   *
   * @return {Observable<Department[]>} An observable that emits an array of departments.
   */
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a department by its unique identifier.
   *
   * @param {number} id - The unique identifier of the department to retrieve.
   * @return {Observable<Department>} An observable containing the requested department data.
   */
  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Adds a new department to the system by making an HTTP POST request.
   *
   * @param {Department} department - The department object to be added.
   * @return {Observable<Department>} An observable that emits the added department.
   */
  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Updates an existing department's information on the server.
   *
   * @param {Department} department - The department object containing updated information with a valid department ID.
   * @return {Observable<Department>} An observable emitting the updated department object upon success.
   */
  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${department.id}`, department).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a department based on the given ID.
   *
   * @param {number} id - The unique identifier of the department to be deleted.
   * @return {Observable<void>} An observable that completes when the department is successfully deleted.
   */
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors by logging the error and returning an observable with a user-facing error message.
   *
   * @param {HttpErrorResponse} error - The HTTP error response to be handled.
   * @return {Observable<never>} An observable that emits an error with a user-friendly message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }

}
