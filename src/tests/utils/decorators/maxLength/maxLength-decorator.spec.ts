import { Validate } from '../../../../utils/decorators/Validate/validate.decorator';
import { maxLength } from '../../../../utils/decorators/maxLength/maxLength.decorator';
import { LengthValidator } from '../../../../utils/validators/length/length.validator';

jest.mock('../../../../utils/decorators/Validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('maxLength decorator', () => {
  it('should call the Validate method with lengthValidator & "the value.length should be lower 10"', () => {
    const maxLengthDecorator = maxLength({ max: 10 });
    maxLengthDecorator;

    expect(Validate).toHaveBeenCalledWith(new LengthValidator(), {
      errorMsg: 'the value.length should be lower 11',
      options: {
        max: 10
      }
    });
  });
});
