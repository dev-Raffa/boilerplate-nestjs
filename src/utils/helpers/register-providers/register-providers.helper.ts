import { Provider, Type } from '@nestjs/common';
import { DataSource } from 'typeorm';

type registerProvidersBaseOptions = {
  entity: Type<any>;
  service: Type<any>;
  DTOS?: {
    create: Type;
    update: Type;
  };
  others?: Provider[];
};

export function registerProviders(options: {
  entity: Type<any>;
  service: Type<any>;
}): Provider[];

export function registerProviders(options: {
  entity: Type<any>;
  service: Type<any>;
  DTOS: {
    create: Type<any>;
    update: Type<any>;
  };
}): Provider[];

export function registerProviders(options: {
  entity: Type<any>;
  service: Type<any>;
  others: Provider[];
}): Provider[];

export function registerProviders(options: {
  entity: Type<any>;
  service: Type<any>;
  DTOS: {
    create: Type<any>;
    update: Type<any>;
  };
  others: Provider[];
}): Provider[];

export function registerProviders(
  options: registerProvidersBaseOptions
): Provider[] {
  let baseProviders: Provider[] = [
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

  options.DTOS
    ? (baseProviders = [
        ...baseProviders,
        { provide: 'CREATE_DTO', useValue: options.DTOS.create },
        { provide: 'UPDATE_DTO', useValue: options.DTOS.update }
      ])
    : (baseProviders = [
        ...baseProviders,
        { provide: 'CREATE_DTO', useValue: undefined },
        { provide: 'UPDATE_DTO', useValue: undefined }
      ]);

  return options.others
    ? [...baseProviders, ...options.others]
    : [...baseProviders];
}
