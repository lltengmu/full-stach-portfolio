import {
  FormApi,
  ReactFormApi,
  ValidationError,
  Validator,
} from '@tanstack/react-form';
import React from 'react';
import { Info } from '@icon-park/react';
import { useValidationError } from '@/store/useValidationErrors';

interface Props {
  form: FormApi<any, Validator<any, any>> & ReactFormApi<any, any>;
  name: string;
  types: string[];
  isRequired?: boolean;
}

export const RadioFieldFactory = ({
  form,
  name,
  types,
  isRequired = true,
}: Props) => {
  return (
    <form.Field
      name={name}
      children={(field) => (
        <React.Fragment>
          <div className="w-full flex items-center gap-4">
            <div className="capitalize">
              {isRequired && <span className="text-red-500">*</span>}
              {name}:
            </div>
            <div className="flex items-center gap-1">
              {types.map((i, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <label htmlFor={`${name}-${index + 1}`}>{i}</label>
                  <input
                    type="radio"
                    name={name}
                    checked={field.state.value == i}
                    value={i}
                    onChange={(event) =>
                      field.handleChange(
                        (event.target as HTMLInputElement).value,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    />
  );
};

type ValidateErrorProps = {
  errors: ValidationError[];
  name: string;
};

export function FormValidationError({ errors, name }: ValidateErrorProps) {
  const validateErrors = useValidationError((s) => s.errors);

  if (errors.length === 0 && !validateErrors[name]) return null;
  return (
    <div className="border text-red-500 text-xs px-2 py-1 rounded-sm flex items-center gap-1">
      <Info /> {validateErrors[name] || errors.join('')}
    </div>
  );
}
