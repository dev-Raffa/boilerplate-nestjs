import { isNumber } from '../../../../utils/decorators/isNumber/isNumber.decorator';
import { Validate } from '../../../../utils/decorators/Validate/validate.decorator';
import { NumberValidator } from '../../../../utils/validators/number/number.validator';

jest.mock('../../../../utils/decorators/Validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('isNumber decorator', () => {
  it('should call the Validate method with NumberValidator & "the porperty should be a numeric value lower 11"', () => {
    const decorator = isNumber({ options: { max: 10 } });
    decorator;

    expect(Validate).toHaveBeenCalledWith(new NumberValidator(), {
      errorMsg: 'the porperty should be a numeric value lower 11',
      nullable: false,
      options: {
        max: 10
      }
    });
  });

  it('should call the Validate method with NumberValidator & "the porperty should be a numeric value greater 4"', () => {
    const decorator = isNumber({ nullable: false, options: { min: 5 } });
    decorator;

    expect(Validate).toHaveBeenCalledWith(new NumberValidator(), {
      errorMsg: 'the porperty should be a numeric value greater 4',
      nullable: false,
      options: {
        min: 5
      }
    });
  });

  it('should call the Validate method with NumberValidator & "the porperty should be a numeric value greater 4"', () => {
    const decorator = isNumber({
      nullable: true,
      options: { min: 5, max: 10 }
    });
    decorator;

    expect(Validate).toHaveBeenCalledWith(new NumberValidator(), {
      errorMsg: 'the porperty should be a numeric value greater 4 and lower 11',
      nullable: true,
      options: {
        min: 5,
        max: 10
      }
    });
  });
});
