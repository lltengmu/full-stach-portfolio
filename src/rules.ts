import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function Exists(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Exists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [tableName, fieldName] = (args.constraints[0] as string).split(':')

          const data = await (prisma[tableName] as any).findFirst({
            where: {
              [fieldName]: value,
            },
          })
          return data ? true : false
        },
      },
    })
  }
}

export function Same(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Same',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          // console.log(args);
          const target = args.object[args.constraints[0]]
          console.log(target)

          if (args.property === args.constraints[0]) throw new Error('Cannot be compared with the same property')
          // if (!target) throw new Error('target property not found')

          return target === value ? true : false
        },
      },
    })
  }
}

export function Unique(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [tableName, fieldName] = (args.constraints[0] as string).split(':')
          const data = await (prisma[tableName] as any).findUnique({
            where: {
              [fieldName]: value,
            },
          })

          return !data ? true : false
        },
      },
    })
  }
}
