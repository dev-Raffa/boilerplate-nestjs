import { NumberValidator } from '../../../../utils/validators/number/number.validator';

describe('numberValidator', () => {
  const validator = new NumberValidator();

  it('it should return false if the number is lower than the min value defined', () => {
    const result = validator.validate({
      value: 8,
      options: { min: 10 }
    });

    expect(result).toBe(false);
  });

  it('should return true if the number is equal or greater than the min value defined', () => {
    const result = validator.validate({
      value: 8,
      options: { min: 5 }
    });

    expect(result).toBe(true);
  });

  it('it should return false if the number is greater than the max value defined', () => {
    const result = validator.validate({
      value: 15,
      options: { max: 10 }
    });

    expect(result).toBe(false);
  });

  it('should return true if the number is equal or greater than the max value defined', () => {
    const result = validator.validate({
      value: 8,
      options: { max: 10 }
    });

    expect(result).toBe(true);
  });
});
