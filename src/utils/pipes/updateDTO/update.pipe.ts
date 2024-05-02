import { Inject } from '@nestjs/common';
import { ValidateDTOPipe } from '../../builders/pipes/validatedto/validateDto.pipe';

export class UpdateDTOPipe extends ValidateDTOPipe {
  constructor(@Inject('UPDATE_DTO') private readonly updateDTO) {
    super(updateDTO);
  }
}
