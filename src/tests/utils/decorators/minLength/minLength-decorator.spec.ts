import { Validate } from '../../../../utils/decorators/Validate/validate.decorator';
import { minLength } from '../../../../utils/decorators/minLength/minLength.decorator';
import { LengthValidator } from '../../../../utils/validators/length/length.validator';

jest.mock('../../../../utils/decorators/Validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe('minLength decorator', () => {
  it('should call the Validate method with lengthValidator & "the value.length should be greater 4"', () => {
    const minLengthDecorator = minLength({ min: 5 });
    minLengthDecorator;

    expect(Validate).toHaveBeenCalledWith(new LengthValidator(), {
      errorMsg: 'the value.length should be greater 4',
      options: {
        min: 5
      }
    });
  });
});
