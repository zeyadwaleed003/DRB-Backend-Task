export type APIResponse = {
  status: string;
  statusCode: number;
  data?: object;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  timestamp?: string;
  size?: number;
};

export type QueryString = {
  limit?: string;
  page?: string;
};
