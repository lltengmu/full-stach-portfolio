import Header from '@/components/Header';
import React from 'react';

const DefaultLayout = React.forwardRef<HTMLDivElement, any>(
  ({ children }, ref) => {
    return (
      <div ref={ref}>
        <Header />
        <main className="container pt-[35px] flex flex-col gap-10">
          {children}
        </main>
      </div>
    );
  },
);

export default DefaultLayout;
