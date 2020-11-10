export type TodoFormValidationType = {
  title?: string;
  deadline?: string;
  complete?: string;
};

export type TodoForm = {
  title: string;
  deadline: Date;
  complete: boolean;
};
