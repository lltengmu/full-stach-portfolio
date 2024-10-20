import { setupVisiable } from '@/store/useGlobalStore';
import { inital } from '@/store/useStudenStore';
import { FormApi, ReactFormApi, Validator } from '@tanstack/react-form';
import { message } from 'antd';

const strategy = {
  create: (
    action: 'create' | 'update',
    form: FormApi<any, Validator<any, any>> & ReactFormApi<any, any>,
  ) => {
    setupVisiable(false);
    message.success(`${action} successfully!`);
    form.reset();
    inital();
  },
  update: (
    action: 'create' | 'update',
  ) => {
    message.success(`${action} successfully!`);
  },
};

export const context = (
  action: 'create' | 'update',
  form: FormApi<any, Validator<any, any>> & ReactFormApi<any, any>,
) => {
  return strategy[action].call(this, action, form);
};
