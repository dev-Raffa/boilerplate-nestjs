import { EmailValidator } from '../../../../utils/validators/email/email.validator';
import { isEmail } from '../../../../utils/decorators/isEmail/isEmail.decorator';
import { Validate } from '../../../../utils/decorators/validate/validate.decorator';

jest.mock('../../../../utils/decorators/validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('isEmail', () => {
  it('should call the Validate method with EmailValidator & "email is invalid"  value parameters ', () => {
    const emailDecorator = isEmail('email is invalid');
    emailDecorator;

    expect(Validate).toHaveBeenCalledWith(new EmailValidator(), {
      errorMsg: 'email is invalid'
    });
  });
});
