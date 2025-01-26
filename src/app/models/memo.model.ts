import {User} from './user.model';

export interface Memo {
  id: string;
  sentBy: User;
  receiver: User;
  createdAt: Date;
  updatedAt: Date;
  forwardHistory: Array<{from: User, to: User}>;
  subject: string;
  content: string;
  status: string;
  isRead: boolean;
  isForwarded?: boolean;
  comments?: Array<Comment>;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  memoStatus: string;
}
