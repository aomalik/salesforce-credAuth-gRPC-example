import { AxiosError } from 'axios';

export const isError = (value: unknown): value is Error =>
  value instanceof Error;

export const isAxiosError = (error: unknown): error is AxiosError =>
  (error as AxiosError).isAxiosError !== undefined;
