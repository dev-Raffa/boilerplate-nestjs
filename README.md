# Boilerplate Nestjs  with Deploy on Vercel 
  This boilerplate is an initial structure for Nestjs projects.

### Resources
 -  Deployment on Vercel: settings for deploying on Vercel.
 -  TypeORM: used for dealING with database layer.
 -  Husky:  used to ensure more consitent commits.
 -  BaseService and BaseController: used to provide CRUD operations for the application contexts.
 -  registerProviders: a helper function that registers your service and repository in your context module.

 
### Installation
1. Clone this repository
2. Execute npm install to install dependencies
3. Configure environment variables in .env

### Use
 - #### configure your database:
    ``` typescript 
    infra/database/provider/database.provider.ts

      export const databaseProvider: Provider[] = [
        {
          provide: 'DATA_SOURCE',
          useFactory: async () => {
            const dataSource = new DataSource({
              type: 'postgres', /* database type */
              host: process.env.DB_HOST,
              port: Number(process.env.DB_PORT),
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              entities: [/* your entities */],
              synchronize: true
            });
            return dataSource.initialize();
          }
        }
      ];
    ```
 
 - #### use BaseService and BaseController:
    You can extend the classes BaseService and BaseController to provide basic CRUD operations for your application contexts and accelerate your development, as follows:

    ```typescript 
    @Injectable()
    export class lessonService extends BaseService<ILesson> {}
    ```

    You can also change any CRUD operation to adapt it to your business rules, as in the following example:

    ```typescript
    @Injectable()
    export class UserService extends BaseService<IUser> implements IUserService {  
      async add(args: Omit<IUser, 'id'>): Promise<IUser> {  
        const verific = await this.repository.findOneBy({ email: args.email });
        if (verific) {
          throw new ConflictException('this email is already in use');
        }
        args.password = await crypt.hash(args.password,Number(process.env.CRYPT_SALT));
        return await this.repository.save(args).catch(() => {
          throw new InternalServerErrorException();
        });
      }
    }
      ```

- ### register providers:
  
  ```typescript
   @Module({
      imports: [DatabaseModule],
      providers: registerProviders(userEntity, UserService),
      controllers: [UserController]
    })
    export class UserModule {}
  ```