"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
 
import { columns, BillboardColumn } from "./columns";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [billboards, setBillboards] = useState([]);

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/1d07bb89-09fd-4531-a155-2cef4de0fd3b/billboards"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const billboardsData = await response.json();
        setBillboards(billboardsData);
      } catch (error) {
        console.error("Error fetching billboards:", error);
      }
    };

    fetchBillboards();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Campañas (${data.length})`} /* Billboards */
          description="Administra las campañas de tu tienda"/* Manage billboards for your store */
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Crear {/* Add New */}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />

    </>
  );
};
