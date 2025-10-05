import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodType } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          errors: fromZodError(error),
          message: 'validation failed',
          statusCode: 400,
        })
      }
      throw new BadRequestException('validation failed')
    }
    return value
  }
}
