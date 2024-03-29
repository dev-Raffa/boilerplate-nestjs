import { HttpException } from '@nestjs/common';
import { isEmail } from '../../../../utils/decorators/isEmail/isEmail.decorator';
import { ValidatorPiPe } from '../../../../utils/decorators/validatorPipe/validator-pipe.decorator';
import { errorsException } from '../../../../utils/types/ErrorsException/errorsException.type';

describe('validatorPipe decorator', () => {
  class mockCreateDTO {
    name: string;
    @isEmail() email: string;

    constructor(args: { name: string; email: string }) {
      this.name = args.name;
      this.email = args.email;
    }

    getValidatorErrors() {}
  }

  class mockUpdateDTO {
    name?: string;
    @isEmail() email?: string;

    constructor(args: { name: string; email: string }) {
      this.name = args.name;
      this.email = args.email;
    }

    getValidatorErrors() {}
  }

  @ValidatorPiPe({
    createDTO: mockCreateDTO,
    updateDTO: mockUpdateDTO
  })
  class mockValidatorPipe {}

  const mockValidatorPipeInstance = new mockValidatorPipe();
  it('should have the transform and the getDTO methods', () => {
    expect(mockValidatorPipeInstance).toHaveProperty('transform');
    expect(mockValidatorPipeInstance).toHaveProperty('getDTO');
  });

  describe('transform method', () => {
    const value: Omit<mockCreateDTO, 'getValidatorErrors'> = {
      name: 'Luis',
      email: 'luis@empresa.com'
    };

    const metadata = {
      type: 'body',
      data: 'create',
      metatype: new (class mock {})()
    };

    it('should call new mockCreateDTO.getValidatorErrors() when the data value is create', async () => {
      const getErrorsSpy = jest.spyOn(
        mockCreateDTO.prototype,
        'getValidatorErrors'
      );

      //@ts-expect-error Property 'transform' does not exist on type 'mockValidatorPipe'.
      await mockValidatorPipeInstance.transform(value, metadata);

      expect(getErrorsSpy).toHaveBeenCalledTimes(1);
    });

    it('should call new mockCreateDTO.getValidatorErrors() when data value is update', async () => {
      metadata.data = 'update';
      const getErrorsSpy = jest.spyOn(
        mockUpdateDTO.prototype,
        'getValidatorErrors'
      );

      //@ts-expect-error Property 'transform' does not exist on type 'mockValidatorPipe'.
      await mockValidatorPipeInstance.transform(value, metadata);

      expect(getErrorsSpy).toHaveBeenCalledTimes(1);
    });

    it('should call new metadata.metatype() when the data value is undefined', async () => {
      const newMetadata = {
        type: 'body',
        data: 'undefined',
        metatype: mockCreateDTO
      };

      const getErrorsSpy = jest.spyOn(
        newMetadata.metatype.prototype,
        'getValidatorErrors'
      );
      //@ts-expect-error Property 'transform' does not exist on type 'mockValidatorPipe'.
      await mockValidatorPipeInstance.transform(value, metadata);

      expect(getErrorsSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw HTTP  exception when the email value is invalid', async () => {
      value.email = 'invalid';
      metadata.data = 'create';

      jest
        .spyOn(mockCreateDTO.prototype, 'getValidatorErrors')
        .mockImplementation(() => [
          {
            field: 'email',
            error:
              'the email should contain a valid format like "name@domain.com" and a valid domain'
          } as errorsException
        ]);

      try {
        //@ts-expect-error Property 'transform' does not exist on type 'mockValidatorPipe'.
        await mockValidatorPipeInstance.transform(value, metadata);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getResponse()).toMatchObject({
          message: expect.any(String),
          error: 'Bad Request',
          errors: [
            {
              field: 'email',
              error: expect.any(String)
            }
          ],
          statusCode: 400
        });
      }
    });
  });
});
