export enum ErrorCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  LOCKED = 423,
  INTERNAL_SERVER_ERROR = 500
}

export class ILCError extends Error {
  httpStatus: number | undefined;
  errorCode: string;

  constructor(msg: string, httpStatus: number | undefined, errorCode: string) {
    super(msg);
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
  }
}

const errorMsg =
  'Bitte wenden Sie sich mit folgendem Error-Code an Ihren Administrator.';
export const fjdAlertErrorMsg = 'Es ist ein Fehler aufgetreten. '.concat(
  errorMsg
);
export const useAlertErrorMsg = 'Fehler. '.concat(errorMsg);
