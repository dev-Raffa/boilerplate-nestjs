import { NumberValidator } from '../../../../utils/validators/number/number.validator';
import { Validate } from '../../../../utils/decorators/Validate/validate.decorator';
import { minValue } from '../../../../utils/decorators/minValue/minValue.decorator';

jest.mock('../../../../utils/decorators/Validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('minValue decorator', () => {
  it('should call the Validate method with Validator & "the value should be greater 4"', () => {
    const minValueDecorator = minValue({ min: 5 });
    minValueDecorator;

    expect(Validate).toHaveBeenCalledWith(new NumberValidator(), {
      errorMsg: 'the value should be greater 4',
      options: {
        min: 5
      }
    });
  });
});
