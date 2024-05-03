import { EmailValidator } from '../../../../utils/validators/email/email.validator';
import { isEmail } from '../../../../utils/decorators/isEmail/isEmail.decorator';
import { Validate } from '../../../../utils/decorators/validate/validate.decorator';

jest.mock('../../../../utils/decorators/validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('isEmail', () => {
  it('should call the Validate method with EmailValidator, errorMsg equal "email is invalid" and nullable equal false value parameters', () => {
    const emailDecorator = isEmail({ errorMsg: 'email is invalid' });
    emailDecorator;

    expect(Validate).toHaveBeenCalledWith(new EmailValidator(), {
      errorMsg: 'email is invalid',
      nullable: false
    });
  });

  it('should call the Validate method with EmailValidator, errorMsg equal "the email should contain a valid format like "name@domain.com" & a valid domain" and nullable equal true value parameters', () => {
    const emailDecorator = isEmail({ nullable: true });
    emailDecorator;

    expect(Validate).toHaveBeenCalledWith(new EmailValidator(), {
      errorMsg:
        'the email should contain a valid format like "name@domain.com" & a valid domain',
      nullable: true
    });
  });
});
