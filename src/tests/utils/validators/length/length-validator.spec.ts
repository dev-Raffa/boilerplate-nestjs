import { LengthValidator } from '../../../../utils/validators/length/length.validator';

describe('lengthValidator', () => {
  const validator = new LengthValidator();

  it('should return false if the value.length is lower than the min length defined', () => {
    const result = validator.validate({
      value: 'pass',
      options: { min: 8 }
    });

    expect(result).toBe(false);
  });

  it('should return true if the value.length is equal or lower than min length defined', () => {
    const result = validator.validate({
      value: 'password',
      options: { min: 8 }
    });

    expect(result).toBe(true);
  });

  it('should return false if the value.length is greater than the min length defined', () => {
    const result = validator.validate({
      value: 'password123',
      options: { max: 8 }
    });

    expect(result).toBe(false);
  });

  it('should return true if the value.length is equal or lower than min length defined', () => {
    const result = validator.validate({
      value: 'password',
      options: { max: 8 }
    });

    expect(result).toBe(true);
  });
});
