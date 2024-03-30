import { LengthValidator } from '../../../../utils/validators/length/length.validator';

describe.skip('lengthValidator', () => {
  const validator = new LengthValidator();

  it('should return an error message if the value.length is lower than the min length defined', () => {
    const result = validator.validate({
      value: 'pass',
      msgError: 'the value length should be greater than 7',
      options: { min: 8 }
    });

    expect(result).toBe('the value length should be greater than 7');
  });

  it('should be undefine if the value.length is equal or lower than min length defined', () => {
    const result = validator.validate({
      value: 'password',
      msgError: 'the value length should be greater than 7',
      options: { min: 8 }
    });

    expect(result).toBeUndefined();
  });

  it('should return an error message if the value.length is greater than the min length defined', () => {
    const result = validator.validate({
      value: 'password123',
      msgError: 'the value length should be lower than 9',
      options: { max: 8 }
    });

    expect(result).toBe('the value length should be lower than 9');
  });

  it('should be undefine if the value.length is equal or lower than min length defined', () => {
    const result = validator.validate({
      value: 'password',
      msgError: 'the value length should be lower than 9',
      options: { max: 8 }
    });

    expect(result).toBeUndefined();
  });
});
