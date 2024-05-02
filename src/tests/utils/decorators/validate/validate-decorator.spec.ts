import { errorsException } from '../../../../utils/types/ErrorsException/errorsException.type';
import { Validate } from '../../../../utils/decorators/validate/validate.decorator';
import { EmailValidator } from '../../../../utils/validators/email/email.validator';
import { Validator_Errors } from '../../../../utils/constants/validatorErrors/validatorErrors.const';
import { Type } from '@nestjs/common';

describe('validate decorator', () => {
  const msgError = 'email is invalid.';
  let mockClass: Type;
  beforeEach(() => {
    class mock {
      id: number;
      name: string;
      @Validate(new EmailValidator(), { errorMsg: msgError, nullable: false })
      email: string;

      constructor(args: { id: number; name: string; email?: string }) {
        this.id = args.id;
        this.name = args.name;
        args.email && (this.email = args.email);
      }
    }
    mockClass = mock;
  });

  it('should defined the Validator_Errors atribute and the getValidatorErrors method', () => {
    const result = new mockClass({
      id: 1,
      name: 'Luiz',
      email: 'luiz@email.com'
    });

    expect(result[Validator_Errors]).toBeDefined();

    expect(result.getValidatorErrors()).toBeDefined();
  });

  it('should return a errorException with the error "the email is required" ', () => {
    const result = new mockClass({
      id: 2,
      name: 'Luiz'
    });

    expect(result.getValidatorErrors()).toEqual([
      {
        error: 'the email is required',
        field: 'email'
      } as errorsException
    ]);
  });

  it('should return a errorExcepetion with the error "email is invalid" ', () => {
    const result = new mockClass({
      id: 1,
      name: 'Luiz',
      email: 'email.com'
    });

    expect(result.getValidatorErrors()).toEqual([
      {
        error: 'email is invalid.',
        field: 'email'
      } as errorsException
    ]);
    expect(result.email).toBeUndefined();
  });

  it('The attribute "email" value should be defined if the parameter "email" value is valid.', () => {
    const result = new mockClass({
      id: 1,
      name: 'Luiz',
      email: 'luiz@email.com'
    });

    expect(result.email).toBe('luiz@email.com');
  });
});
