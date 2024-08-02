// Тип для состояния задач
export interface FileTypes {
  _id: string;
  name: string;
  description: string;
  size: number;
  extension: string;
  url: string;
  downloadCount: number;
  createdAt: Date;
}

// Тип для состояния файлов
export interface FilesStateTypes {
  files: FileTypes[];
  loading: boolean;
  countFiles: number;
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

