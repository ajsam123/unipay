import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Button from "./Button";

// /**
//  * ActionModal
//  *
//  * Props:
//  * - trigger: optional custom button (default is ⋮)
//  * - actions: array of { label: string, onClick: function, color?: string }
//  */
const ActionModal = ({ trigger, actions = [], className }) => {
  return (
    <DropdownMenu className={`${className}`}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button
            variant="stroke"
            className="border-neutral-black-9"
            onClick={(e) => e.stopPropagation()} // prevent row click
          >
            ⋮
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={5}
        className="w-40 border-none"
      >
        {actions.map((action, idx) => (
          <DropdownMenuItem
            key={idx}
            className={action.color ? `text-${action.color}-600` : ""}
            onClick={(e) => {
              e.stopPropagation(); // prevent row click
              action.onClick();
            }}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionModal;
