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
  isRequired?: boolean;
  placeholder?: string;
  HtmlType: React.HTMLInputTypeAttribute;
}

export const FieldFactory = ({
  form,
  name,
  isRequired = true,
  placeholder = name,
  HtmlType,
}: Props) => {
  const removeError = useValidationError((s) => s.removeError);
  return (
    <form.Field
      name={name}
      children={(field) => (
        <React.Fragment>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor={name} className='capitalize'>
              {isRequired && <span className="text-red-500">*</span>}
              {name}:
            </label>
            <input
              id={name}
              type={HtmlType}
              className="w-full border rounded-md outline-none p-2"
              placeholder={placeholder}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onFocus={() => removeError(name)}
            />
            <FormValidationError errors={field.state.meta.errors} name={name} />
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
    <div className="text-red-500 text-xs px-2 py-1 rounded-sm flex items-center gap-1">
      <Info /> {validateErrors[name] || errors.join('')}
    </div>
  );
}
