import { EmailValidator } from '../../../../utils/validators/email/email.validator';

describe('email validator', () => {
  const validator = new EmailValidator();

  it('should return false when email format is not valid', () => {
    const testEmail_A = validator.validate('juninho.com');
    const testEmail_B = validator.validate('junho@@company.com');
    const testEmail_C = validator.validate('junho@company.');
    const testEmail_D = validator.validate('@company.com');

    expect(testEmail_A).toBe(false);
    expect(testEmail_B).toBe(false);
    expect(testEmail_C).toBe(false);
    expect(testEmail_D).toBe(false);
  });

  it('should return false when top-level domain is invalid', () => {
    const testEmail = validator.validate('juninho@company.teste.com');

    expect(testEmail).toBe(false);
  });

  it('should return true when email format and top-level domain are valid', () => {
    const testEmail = validator.validate('juninho@company.com');

    expect(testEmail).toBe(true);
  });
});
