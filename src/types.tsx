// Тип для состояния задач
export interface TaskTypes {
  _id: string;
  boardId: string;
  title: string;
  text: string;
  status: string;
}

// Тип для доски
export interface DashboardTypes {
  _id: string;
  title: string;
  createdAt?: string; 
  updatedAt?: string;
}

// Тип для состояния досок
export interface DashboardsState {
  dashboards: DashboardTypes[];
}

// Определение типа значений формы задач
export interface FormValues {
  title: string;
  text: string;
}

// Определение типа значений формы доски
export interface DashboardFormValues {
  dashboard: string;
}

// Определение типа значений формы поиска
export interface SearchFormValues {
  dashboardId: string;
}

// Определение типа значений формы задачи
export interface TaskFormValues {
  title: string;
  text: string;
  boardId: string;
}
