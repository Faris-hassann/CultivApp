import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';

import 'datatables.net';
import 'datatables.net-responsive';

window.$ = $;
window.jQuery = $;

const DataTable = ({ columns = [], data = [], actions = {}, customRender = {} }) => {
  const tableRef = useRef();
  const extendedColumns = [...columns, 'Action'];

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
      destroy: true,
    });

    return () => {
      table.destroy();
    };
  }, [data, columns]);

  return (
    <div className="table-container">
      <table ref={tableRef} className="display nowrap" style={{ width: '100%' }}>
        <thead>
          <tr>
            {extendedColumns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {customRender[col]
                    ? customRender[col](row[col], row)
                    : row[col]}
                </td>
              ))}
              <td>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={() => actions.onEdit && actions.onEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View">
                  <IconButton
                    color="info"
                    onClick={() => actions.onView && actions.onView(row)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => actions.onDelete && actions.onDelete(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
