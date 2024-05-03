import { Validate } from '../../../../utils/decorators/Validate/validate.decorator';
import { isString } from '../../../../utils/decorators/isString/isString.decorator';
import { StringValidator } from '../../../../utils/validators/string/string.validator';

jest.mock('../../../../utils/decorators/Validate/validate.decorator', () => ({
  Validate: jest.fn()
}));

describe.skip('isString decorator', () => {
  it(`should call the Validate method with StringValidator, errorMsg with value equal "the text should contain fewer than 11 characters", maxLength value equal to 10 and nullable equal to false`, () => {
    const maxLengthDecorator = isString({ options: { maxLength: 10 } });
    maxLengthDecorator;

    expect(Validate).toHaveBeenCalledWith(new StringValidator(), {
      errorMsg: 'the text should contain fewer than 11 characters',
      nullable: false,
      options: {
        maxLength: 10
      }
    });
  });

  it(`should call the Validate method with StringValidator, errorMsg with value equal "the text should cointan more than 7 characters", minLength value equal to 8 and nullable equal to false`, () => {
    const maxLengthDecorator = isString({
      options: { minLength: 8 },
      nullable: false
    });
    maxLengthDecorator;

    expect(Validate).toHaveBeenCalledWith(new StringValidator(), {
      errorMsg: 'the text should contain more than 7 characters',
      nullable: false,
      options: {
        minLength: 8
      }
    });
  });

  it(`should call the Validate method with StringValidator, errorMsg with value equal "The text should contain more than 7 characters and fewer than 17 characters", minLength value equal to 8, maxLength value equal to 16 and nullable equal to true`, () => {
    const maxLengthDecorator = isString({
      options: { minLength: 8, maxLength: 16 },
      nullable: true
    });
    maxLengthDecorator;

    expect(Validate).toHaveBeenCalledWith(new StringValidator(), {
      errorMsg:
        'The text should contain more than 7 characters and fewer than 17 characters',
      nullable: true,
      options: {
        minLength: 8,
        maxLength: 16
      }
    });
  });
});
