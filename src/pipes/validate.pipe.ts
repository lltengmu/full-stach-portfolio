import { ValidationException } from '@/exceptions/validationException'
import { parseErrors } from '@/helper'
import { ValidationError, ValidationPipe } from '@nestjs/common'

export default class ValidatePipe extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const errors = parseErrors(validationErrors)
    throw new ValidationException(errors)
  }
}