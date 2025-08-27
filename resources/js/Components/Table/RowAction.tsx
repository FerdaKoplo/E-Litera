import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

interface RowAction {
  label: string;
  href?: string;
  onClick?: (rowId: string | number) => void;
  confirmMessage?: string;
}

interface RowActionsProps {
  rowId: number | string;
  actions: RowAction[];
}

const RowActions: React.FC<RowActionsProps> = ({ rowId, actions }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<RowAction | null>(null);

  const handleConfirmClick = (action: RowAction) => {
    if (action.confirmMessage) {
      setPendingAction(action);
      setOpenDialog(true);
    } else {
      action.onClick?.(rowId);
    }
  };

  const handleDialogConfirm = () => {
    if (pendingAction) pendingAction.onClick?.(rowId);
    setOpenDialog(false);
    setPendingAction(null);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
    setPendingAction(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 py-1  text-lg "><BsThreeDots /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {actions.map((action, index) => (
            <DropdownMenuItem key={index}>
              {action.href ? (
                <Link href={action.href.replace(":id", String(rowId))}>
                  {action.label}
                </Link>
              ) : (
                <button onClick={() => handleConfirmClick(action)}>
                  {action.label}
                </button>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ShadCN Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{pendingAction?.confirmMessage}</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleDialogCancel}>
              Cancel
            </Button>
            <Button onClick={handleDialogConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RowActions;
