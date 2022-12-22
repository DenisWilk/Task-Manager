export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IUserForm {
  name?: string;
  login: string;
  password?: string;
}

export interface IUserBoard {
  id?: string;
  title?: string;
  description?: string;
  taskPriority?: string;
}
export interface IDate {
  year: number;
  month: number;
  date: number;
  day: number;
}
export interface ITaskDescriptionData {
  description: string;
  createTask?: IDate;
  doneTask?: IDate;
  taskPriority?: {
    priority: string;
    color: string;
    index: string;
  };
}
export interface IUserTask {
  userId: string;
  title?: string;
  description?: string;
  order?: number;
  boardId?: string;
  columnId?: string;
}

export interface IFetchQuery {
  boardData?: IUserBoard;
  columnData?: IComleteColumn;
  taskData?: IUserTask;
  boardId?: string;
  columnId?: string;
  taskId?: string;
  token: string;
  newOrder?: number;
  userId?: string;
  newColumn?: string;
  userData?: IUserForm;
  userLogin?: string;
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
  columns: IColumn[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface IFiles {
  filename: string;
  fileSize: number;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
  files?: IFiles[];
}

export type UserId = {
  [key: number]: string;
};

export type BoardId = {
  [key: number]: string;
};

export interface IComleteColumn {
  id: string;
  title: string;
  order: number;
  tasks?: ITask[];
}

export type JwtDecode = {
  iat: number;
  login: string;
  userId: string;
};

export type ChangeTask = {
  taskArray: ITask[];
  destinationId: string;
};

export interface IDoneColumnByBoardId {
  boardId: string;
  doneColumn: IColumn[];
}
