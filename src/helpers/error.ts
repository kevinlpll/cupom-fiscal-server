import { Response } from 'express'

enum httpCodes {
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  imATeapot = 418,
  unprocessableEntity = 422,
  internalServerError = 500,
  badGateway = 502
}

export const ResponseError = (response: Response, code: httpCodes, message: string, data: any) => {
  switch (code) {
    case 400:
      return response.send_badRequest(message, data)
    case 401:
      return response.send_unauthorized(message, data)
    case 403:
      return response.send_forbidden(message, data)
    case 404:
      return response.send_notFound(message, data)
    case 409:
      return response.send_conflict(message, data)
    case 418:
      return response.send_imATeapot(message, data)
    case 422:
      return response.send_unprocessableEntity(message, data)
    case 500: 
      return response.send_internalServerError(message, data)
    case 502:
      return response.send_badGateway(message, data)
    default:
      return response.send_badRequest(message, data)
  }
}

export class CustomError {
  public readonly message: string

  public readonly code: httpCodes

  public readonly data: any

  constructor(message: string, code: httpCodes, data?: any) {
    this.code = code
    this.message = message
    this.data = data
  }
}
