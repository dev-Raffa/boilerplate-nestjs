import { NumberValidator } from '../../../../utils/validators/number/number.validator';
import { Validate } from '../../../../utils/decorators/Validate/validate.decorator';
import { min } from '../../../../utils/decorators/min/min.decorator';

jest.mock('../../../../utils/decorators/Validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('min decorator', () => {
  it('should call the Validate method with Validator & "the value should be greater 4"', () => {
    const minDecorator = min({ min: 5 });
    minDecorator;

    expect(Validate).toHaveBeenCalledWith(new NumberValidator(), {
      errorMsg: 'the value should be greater 4',
      options: {
        min: 5
      }
    });
  });
});
