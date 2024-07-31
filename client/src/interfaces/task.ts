export interface Task {
  id: string;
  columnId: string;
  assigneeId: string;
  position: number;
  title: string;
  priority: number;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
