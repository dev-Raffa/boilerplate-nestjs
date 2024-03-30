import { NumberValidator } from '../../../../utils/validators/number/number.validator';

describe.skip('numberValidator', () => {
  const validator = new NumberValidator();

  it('it should return an error message if the number is lower than the min value defined', () => {
    const result = validator.validate({
      value: 8,
      msgError: 'the value should be greater than 9',
      options: { min: 10 }
    });

    expect(result).toBe('the value should be greater than 9');
  });

  it('should return undefined if the number is equal or greater than the min value defined', () => {
    const result = validator.validate({
      value: 8,
      msgError: 'the value should be greater than 4',
      options: { min: 5 }
    });

    expect(result).toBeUndefined();
  });

  it('it should return an error message if the number is greater than the max value defined', () => {
    const result = validator.validate({
      value: 15,
      msgError: 'the value should be lower than 11',
      options: { max: 10 }
    });

    expect(result).toBe('the value should be lower than 11');
  });

  it('should return undefined if the number is equal or greater than the max value defined', () => {
    const result = validator.validate({
      value: 8,
      msgError: 'the value should be greater than 11',
      options: { max: 10 }
    });

    expect(result).toBeUndefined();
  });
});
