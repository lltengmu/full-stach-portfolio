import StudentForm from '@/components/form';
import DefaultLayout from '@/layouts/default';
import { useStudentStore } from '@/store/useStudenStore';
import { Back } from '@icon-park/react';
import { Link } from 'react-router-dom';

function Detail() {
  const data = useStudentStore((s) => s.detail);
  return (
    <DefaultLayout>
      <section className="flex items-center gap-2">
        <Link
          to="/"
          className="w-16 h-16 border rounded-xl flex justify-center items-center cursor-pointer hover:shadow-md"
        >
          <Back theme="outline" size="24" fill="#333" />
        </Link>
        <div>
          <h1 className="text-[32px] font-bold">Edit Student Information</h1>
          <p className="text-gray-500 text-sm">
            Welcome to the student information edit page, Edit student
            information here.
          </p>
        </div>
      </section>
      <StudentForm action="update" formData={{ ...data }} />
    </DefaultLayout>
  );
}

export default Detail;
