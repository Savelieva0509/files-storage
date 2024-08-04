import { FilesStateTypes, SearchFormValues } from '../types';

export const getFiles = (state: { files: FilesStateTypes }) =>
  state.files.files;

export const getCountFiles = (state: { files: FilesStateTypes }) =>
  state.files.countFiles;

export const getError = (state: { files: FilesStateTypes }) =>
  state.files.error;

export const getSearchQuery = (state: { search: SearchFormValues }) =>
  state.search.query;
