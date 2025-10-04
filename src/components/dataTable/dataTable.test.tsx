import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable, Column } from './dataTable';

type Row = { id: number; value: string };

const columns: Column<Row>[] = [
  { key: 'value', title: 'Value', dataIndex: 'value', sortable: true },
];

describe('DataTable', () => {
  it('renders rows and columns', () => {
    render(<DataTable data={[{ id: 1, value: 'A' }]} columns={columns} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={[]} columns={columns} loading />);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText(/No data available/)).toBeInTheDocument();
  });
});
