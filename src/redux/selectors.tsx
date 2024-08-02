import { FilesStateTypes } from '../types';

export const getFiles = (state: { files: FilesStateTypes }) =>
  state.files.files;

export const getCountFiles = (state: { files: FilesStateTypes }) =>
  state.files.countFiles;
