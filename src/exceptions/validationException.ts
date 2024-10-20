import { HttpException, HttpStatus } from '@nestjs/common'

export class ValidationException<T extends Record<string, string[]>> extends HttpException {
  constructor(errors: T) {
    super(
      { statusCode: HttpStatus.UNPROCESSABLE_ENTITY, mssage: 'The given data was invalid.', errors },
      HttpStatus.UNPROCESSABLE_ENTITY,
    )
  }
}
