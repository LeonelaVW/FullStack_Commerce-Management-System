import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { UserCog2, UserX2, UsersRound } from "lucide-react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ManagerDetailsComponent = () => {
  const { id } = useParams();
  const [manager, setManager] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagerDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/managers/${id}`);
        setManager(result.data);
      } catch (error) {
        console.error("Error fetching manager details:", error);
      }
    };

    fetchManagerDetails();
  }, [id]);

  /*    const onCancel = () => {
    navigate(-2);
  }; */

  return (
    <div>
      <Table>
        <TableCaption>Información de los gerentes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>E-Mail</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{manager.id}</TableCell>
            <TableCell>{manager.firstName}</TableCell>
            <TableCell>{manager.lastName}</TableCell>
            <TableCell>{manager.emailId}</TableCell>
            <TableCell>
              <Link
                to={`/${manager.id}/update`}
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2"
              >
                <UserCog2 className="mr-2" />
                Editar
              </Link>

              <Link
                to={`/${manager.id}/delete`}
                onClick={``}
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
              >
                <UserX2 className="mr-2" />
                Eliminar
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagerDetailsComponent;
