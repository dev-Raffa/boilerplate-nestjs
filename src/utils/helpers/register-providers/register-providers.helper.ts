import { Provider, Type } from '@nestjs/common';
import { DataSource } from 'typeorm';

export type registerProvidersOptions = {
  entity: Type<any>;
  service: Type<any>;
};

type registerProvidersOptionsWithOthers = registerProvidersOptions & {
  others?: Provider[];
};

type registerProvidersOptionsWithDTOS = registerProvidersOptions & {
  DTOS: {
    create: Type;
    update: Type;
  };
};

type registerProvidersOptionsWithDTOSAndOthers =
  registerProvidersOptionsWithDTOS & registerProvidersOptionsWithOthers;

type registerProvidersBaseOptions = {
  entity: Type<any>;
  service: Type<any>;
  DTOS?: {
    create: Type;
    update: Type;
  };
  others?: Provider[];
};

export function registerProviders(options: registerProvidersOptions);
export function registerProviders(options: registerProvidersOptionsWithOthers);
export function registerProviders(options: registerProvidersOptionsWithDTOS);
export function registerProviders(
  options: registerProvidersOptionsWithDTOSAndOthers
);
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

  options.DTOS &&
    (baseProviders = [
      ...baseProviders,
      { provide: 'CREATE_DTO', useValue: options.DTOS.create },
      { provide: 'UPDATE_DTO', useValue: options.DTOS.update }
    ]);

  return options.others
    ? [...baseProviders, ...options.others]
    : [...baseProviders];
}
