
import { Inter } from 'next/font/google'
import * as React from "react";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {EditIcon} from "../styles/icons/EditIcon";
import {DeleteIcon} from "../styles/icons/DeleteIcon";
import {EyeIcon} from "../styles/icons/EyeIcon";
import {columns, users} from "../data/data";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const renderCell = React.useCallback((user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{radius: "lg", src: user.avatar}}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg cursor-pointer text-danger active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);

    const [data, setData] = React.useState([]);

    const getCodes = () => {
      fetch('/api/hello')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data)
        });
    
    }

    React.useEffect(() => {
      getCodes();
    })


    return (
      <main
        className={`flex min-h-screen dark flex-col items-center justify-between ${inter.className}`}
      >
        <div class="grid grid-cols-3 w-full">
          <div class="">
            asd
          </div>
          <div class="col-span-2">
            <div class="px-3 py-3">
              <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={data}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
      </main>
    )
}
