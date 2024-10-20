import DefaultLayout from '@/layouts/default';
import { setupVisiable, useGlobalStore } from '@/store/useGlobalStore';
import {
  inital,
  setupComputed,
  setupFilter,
  useStudentStore,
} from '@/store/useStudenStore';
import { PeoplePlus, Search } from '@icon-park/react';
import { Drawer, Table } from 'antd';
import { useEffect } from 'react';
import { columns } from './columns';
import StudentForm from '@/components/form';

function Home() {
  const students = useStudentStore((state) => state.students);
  const data = useStudentStore((state) => state.computed);
  const filter = useStudentStore((state) => state.filter);
  const isVisiable = useGlobalStore((s) => s.drawerVisiable);

  useEffect(() => {
    inital();
  }, []);

  useEffect(() => {
    setupComputed(filter, students);
  }, [filter]);
  return (
    <DefaultLayout>
      <section>
        <h1 className="text-[32px] font-bold">Student list page</h1>
        <p className="text-gray-500 text-sm">
          Welcome to the student information query page, you can edit student
          information here
        </p>
      </section>
      <section>
        <div className="p-2 border-b flex justify-between">
          <h2 className="text-[20px] font-medium">Students Table</h2>
          <div className="flex items-center gap-2">
            <div className="min-w-[100px] h-10 rounded-lg border shadow-md p-2 flex justify-center items-center gap-2">
              <Search theme="outline" size="24" fill="#333" />
              <input
                className="outline-none h-full"
                type="text"
                onInput={(event) =>
                  setupFilter((event.target as HTMLInputElement).value)
                }
              />
            </div>
            <div
              className="min-w-10 h-10 rounded-lg border shadow-md p-2 flex justify-center items-center gap-2 cursor-pointer"
              onClick={() => setupVisiable(true)}
            >
              <PeoplePlus theme="outline" size="24" fill="#333" />
            </div>
          </div>
        </div>
        <Table
          rowKey={(record) => record.uuid!}
          columns={columns as any}
          dataSource={data}
        />
      </section>
      <Drawer
        title="Add New Student"
        placement="right"
        closable={false}
        onClose={() => setupVisiable(false)}
        open={isVisiable}
        width={500}
      >
        <StudentForm action="create" />
      </Drawer>
    </DefaultLayout>
  );
}

export default Home;
