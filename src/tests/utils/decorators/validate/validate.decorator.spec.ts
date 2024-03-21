import { Validate } from '../../../../utils/decorators/validate/validate.decorator';
import { EmailValidator } from '../../../../utils/validators/email/email.validator';

describe('validate decorator', () => {
  class mockClass {
    id: number;
    name: string;
    @Validate(new EmailValidator())
    email: string;

    constructor(args: { id: number; name: string; email: string }) {
      this.id = args.id;
      this.name = args.name;
      this.email = args.email;
    }
  }

  it('should add a Validator_Errors atribute and a getValidatorErrors method to the class if the email is invalid', () => {
    const result = new mockClass({
      id: 1,
      name: 'Luiz',
      email: 'email.com'
    });

    //@ts-expect-error getValidatorErrors does not exist in mockClass
    expect(result.getValidatorErros()).toEqual(['email']);
    //@ts-expect-error Validator_Errors does not exist in mockClass
    expect(result.Validator_Errors).toBeUndefined();
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
