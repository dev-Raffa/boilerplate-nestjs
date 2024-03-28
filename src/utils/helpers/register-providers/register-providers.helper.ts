import { Provider, Type } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

export type registerProvidersOptions = {
  entity: EntityTarget<ObjectLiteral>;
  service: Type<any>;
  others?: Provider[];
};

export const registerProviders = (
  options: registerProvidersOptions
): Provider[] => {
  const baseProviders: Provider[] = [
    {
      provide: 'REPOSITORY',
      useFactory: (datasource: DataSource) =>
        datasource.getRepository(options.entity),
      inject: ['DATA_SOURCE']
    },
    {
      provide: 'SERVICE',
      useClass: options.service
    }
  ];
  return options.others
    ? [...baseProviders, ...options.others]
    : [...baseProviders];
};
