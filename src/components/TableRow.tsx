import React, { FC, ReactElement } from 'react';

interface TableRowProps {
  children: ReactElement | ReactElement[];
}
export const TableRow: FC<TableRowProps> = ({ children }) => {
  return <tr className=' border-4 odd:bg-green-300 even:text-black p-4 rounded-lg'>{children}</tr>;
};

interface TableDataProps {
  children: ReactElement | ReactElement[] | string | number;
}
export const TableData: FC<TableDataProps> = ({ children }) => {
  return <td className='whitespace-nowrap px-8 py-4'>{children}</td>;
};
