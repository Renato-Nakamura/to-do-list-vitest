export const remove_ = (word: string) => word.replace(/_/g, " ");

export const add_ = (word: string) => word.replace(/ /g, "_");

export interface Task {
  title: string;
  done: boolean;
}

export interface List {
  created: number;
  listTitle: string;
  _id:string;
  tasks: Task[];
}
