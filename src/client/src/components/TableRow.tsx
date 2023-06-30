export interface Cell {
  value: string;
  label: string;
}

interface TableRowProps {
  cells: Cell[];
}

export function TableRow({ cells }: TableRowProps) {
  return (
    <tr>
      {cells.map((cell) => (
        <td className='p-2'>{cell.value}</td>
      ))}
    </tr>
  );
}
