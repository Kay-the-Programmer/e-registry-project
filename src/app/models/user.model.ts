import {Department} from './department.model';

export interface User {
  id: number;
  firstName: string; // Required property
  lastName: string;
  email: string;
  password: string;
  department: Department; // Optional property for department
  position?: string; // Optional property for position
  role: string; // Role is required
  createdAt: Date;
  updatedAt: Date;
}
