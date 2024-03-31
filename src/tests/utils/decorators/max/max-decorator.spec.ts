import { NumberValidator } from '../../../../utils/validators/number/number.validator';
import { Validate } from '../../../../utils/decorators/Validate/validate.decorator';
import { max } from '../../../../utils/decorators/max/max.decorator';

jest.mock('../../../../utils/decorators/Validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('max decorator', () => {
  it('should call the Validate method with numberValidator & "the value should be lower 10"', () => {
    const maxDecorator = max({ max: 10 });
    maxDecorator;

    expect(Validate).toHaveBeenCalledWith(new NumberValidator(), {
      errorMsg: 'the value should be lower 11',
      options: {
        max: 10
      }
    });
  });
});
