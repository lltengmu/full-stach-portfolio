import { findOne } from '@/apis/student';
import { setupDetail } from '@/store/useStudenStore';
import Detail from '@/views/detail';
import Home from '@/views/Home';
import { redirect, RouteObject } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/student/detail/:uuid',
    loader: async ({ params }) => {
      const { data } = await findOne(params.uuid!);
      if (!Object.values(data).length) {
        return redirect('/');
      }
      setupDetail(data);
      return null;
    },
    element: <Detail />,
  },
] as RouteObject[];
