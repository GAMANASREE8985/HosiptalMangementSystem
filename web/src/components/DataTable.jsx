import React from 'react';
export default function DataTable({ columns, rows }) {
  return (
    <table className="table">
      <thead>
        <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r,i) => (
          <tr key={r._id || i}>
            {columns.map(c => <td key={c.key}>{c.render ? c.render(r[c.key], r) : (r[c.key] ?? '')}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
