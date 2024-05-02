import { HttpException, HttpStatus, PipeTransform, Type } from '@nestjs/common';
import { errorsException } from '../../../types/ErrorsException/errorsException.type';

export abstract class ValidateDTOPipe implements PipeTransform {
  constructor(protected DTO: Type<any>) {}

  async transform(value: object) {
    let errors: errorsException[];

    errors = this.verifyArgs(value);

    errors.length > 0 && this.throwError(errors);

    if (this.DTO) {
      try {
        errors = new this.DTO(value).getValidatorErrors();
      } catch (error) {
        console.log(error);
      }
    }

    errors.length > 0 && this.throwError(errors);

    return value;
  }

  verifyArgs(values: object): errorsException[] {
    const errors: errorsException[] = [];
    const keysInValue = Object.keys(values);
    const keysInDto = Object.keys(this.DTO.prototype);

    keysInValue.forEach((key) => {
      if (!keysInDto.includes(key)) {
        errors.push({ field: key, error: 'parameter not expected' });
      }
    });

    return errors;
  }

  throwError(errors: errorsException[]) {
    throw new HttpException(
      {
        message: `Validation failed`,
        error: 'Bad Request',
        errors: errors,
        statusCode: HttpStatus.BAD_REQUEST
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
