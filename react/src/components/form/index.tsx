import { upsert } from '@/apis/student';
import { FieldFactory } from '@/components/form/fieldFactory';
import { RadioFieldFactory } from '@/components/form/RadioFieldFactory';
import { HttpStatus } from '@/enum/HttpStatus';
import { useValidationError } from '@/store/useValidationErrors';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button } from 'antd';
import * as _ from 'lodash';
import { FormEventHandler } from 'react';
import { z } from 'zod';
import { context } from './helper';

type Props = { action: 'create' | 'update'; formData?: any };

const validateSchema = z.object({});
//默认表单数据
const defaultData = {
  name: '',
  age: '',
  email: '',
  address: '',
  gender: 'BOY',
  studentId: '',
};

export default function StudentForm({ action, formData = defaultData }: Props) {
  //获取设置错误信息的action
  const setError = useValidationError((s) => s.setError);
  //初始化表单
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: formData,
    validators: { onChange: validateSchema },
    onSubmit: async ({ value }) => {
      //如果是更新数据，往请求体中添加uuid
      if (action == 'update') Object.assign(value, { uuid: formData.uuid });
      //数据提交
      await upsert(value).then(
        () => context(action, form),
        //显示错误信息
        (error) => {
          if ((error.response.status = HttpStatus.UNPROCESSABLE_ENTITY)) {
            Object.entries(error.response.data.errors).forEach(
              ([key, value]) => {
                setError(key, (value as string[]).join(''));
              },
            );
          }
        },
      );
    },
  });

  //防止频繁点击
  const handleSubmit: FormEventHandler = _.debounce(() => {
    form.handleSubmit();
  }, 500);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(e);
      }}
    >
      <section className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <FieldFactory form={form} name="name" HtmlType="text" />
          <FieldFactory form={form} HtmlType="number" name="age" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FieldFactory form={form} HtmlType="text" name="email" />
          <FieldFactory form={form} HtmlType="number" name="studentId" />
        </div>
        <RadioFieldFactory form={form} name="gender" types={['BOY', 'GIRL']} />
        <FieldFactory form={form} HtmlType="text" name="address" />
        <div>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </section>
    </form>
  );
}
