import { EmailValidator } from '../../../../utils/validators/email/email.validator';
import { isEmail } from '../../../../utils/decorators/isEmail/isEmail.decorator';
import { Validate } from '../../../../utils/decorators/validate/validate.decorator';

jest.mock('../../../../utils/decorators/validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('isEmail', () => {
  it('should return a Validate decorator with EmailValidator', () => {
    const emailDecorator = isEmail();
    emailDecorator;

    expect(Validate).toHaveBeenCalledWith(new EmailValidator());
  });
});
