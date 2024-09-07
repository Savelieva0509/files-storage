import { FilesStateTypes, SearchFormValues } from '../types';

export const getFiles = (state: { files: FilesStateTypes }) =>
  state.files.files;

export const getCountFiles = (state: { files: FilesStateTypes }) =>
  state.files.countFiles;

export const getLoading = (state: { files: FilesStateTypes }) =>
  state.files.loading;

export const getSearchQuery = (state: { search: SearchFormValues }) =>
  state.search.query;

