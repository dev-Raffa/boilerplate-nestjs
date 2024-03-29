import { EmailValidator } from '../../../../utils/validators/email/email.validator';

describe('email validator', () => {
  const validator = new EmailValidator();
  const msgError = 'the email propety value  is invalid';

  it('should return false when email format is not valid', () => {
    const testEmail_A = validator.validate({
      value: 'juninho.com',
      msgError: msgError
    });
    const testEmail_B = validator.validate({
      value: 'junho@@company.com',
      msgError: msgError
    });
    const testEmail_C = validator.validate({
      value: 'junho@company.',
      msgError: msgError
    });
    const testEmail_D = validator.validate({
      value: '@company.com',
      msgError: msgError
    });

    expect(testEmail_A).toBe(msgError);
    expect(testEmail_B).toBe(msgError);
    expect(testEmail_C).toBe(msgError);
    expect(testEmail_D).toBe(msgError);
  });

  it('should return false when top-level domain is invalid', () => {
    const testEmail = validator.validate({
      value: 'juninho@company.teste.com',
      msgError: msgError
    });

    expect(testEmail).toBe(msgError);
  });

  it('should return true when email format and top-level domain are valid', () => {
    const testEmail = validator.validate({
      value: 'juninho@company.com',
      msgError: msgError
    });

    expect(testEmail).toBeUndefined();
  });
});
