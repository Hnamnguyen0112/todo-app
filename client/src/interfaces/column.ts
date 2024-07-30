import { Task } from "./task";

export interface Column {
  id: string;
  projectId: string;
  name: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  tasks: Task[];
}
