export type TErrorSources = {
  path: string | number | undefined;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSource: TErrorSources;
};
