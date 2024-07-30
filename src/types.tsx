// Тип для состояния задач
export interface FileTypes {
  _id: string;
  name: string;
  description: string;
  size: string;
  extension: string;
}

// Тип для состояния файлов
export interface FilesState {
  files: FileTypes[];
}

// Определение типа значений формы задачи
export interface FileFormValues {
  name: string;
  description: string;
  url: string;
}

// Определение типа значений формы поиска
export interface SearchFormValues {
  id: string;
}
