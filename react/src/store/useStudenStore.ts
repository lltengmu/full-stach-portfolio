import { findAll } from '@/apis/student';
import { create } from 'zustand';

interface StudentState {
  students: Partial<Student>[];
  filter: string;
  computed: Partial<Student>[];
  detail: Partial<Student>;
}

export const useStudentStore = create<StudentState>(() => ({
  filter: '',
  students: [],
  computed: [],
  detail: {},
}));

export const inital = async () => {
  try {
    const students = await findAll();
    useStudentStore.setState({ students });
    useStudentStore.setState({ computed: students });
  } catch (error) {}
};

export const setupFilter = (value: string) => {
  useStudentStore.setState({ filter: value });
};

export const setupComputed = (value: string, data: Partial<Student>[]) => {
  useStudentStore.setState({
    computed: data.filter((i) => i.name?.includes(value)),
  });
};

export const setupDetail = (info: Student) => {
  useStudentStore.setState({ detail: { ...info } });
};
