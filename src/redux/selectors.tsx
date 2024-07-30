import { FilesState } from '../types';

export const getFiles = (state: { files: FilesState }) => state.files.files;
