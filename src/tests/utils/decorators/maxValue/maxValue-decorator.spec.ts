import { NumberValidator } from '../../../../utils/validators/number/number.validator';
import { Validate } from '../../../../utils/decorators/Validate/validate.decorator';
import { maxValue } from '../../../../utils/decorators/maxValue/maxValue.decorator';

jest.mock('../../../../utils/decorators/Validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('maxValue decorator', () => {
  it('should call the Validate method with numberValidator & "the value should be lower 10"', () => {
    const maxValueDecorator = maxValue({ max: 10 });
    maxValueDecorator;

    expect(Validate).toHaveBeenCalledWith(new NumberValidator(), {
      errorMsg: 'the value should be lower 11',
      options: {
        max: 10
      }
    });
  });
});
