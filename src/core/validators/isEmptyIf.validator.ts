import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsEmptyIf(condition: (obj: any) => boolean, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEmptyIf',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [condition],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [condition] = args.constraints;
                    if (condition(args.object)) {
                        return value === '' || value === null || value === undefined;
                    }
                    return true;
                },
                defaultMessage(args: ValidationArguments) {
                    const [condition] = args.constraints;
                    if (!condition(args.object)) {
                        return '';
                    }
                    return `${args.property} should be empty`;
                },
            },
        });
    };
}