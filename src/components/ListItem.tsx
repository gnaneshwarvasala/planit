import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ListItemProps {
  id: string;
  index: number;
  text: string;
  isCollected: boolean;
  isLocked: boolean;
  onToggleCollected: (id: string) => void;
  onDelete: (id: string) => void;
}

const ListItem = ({ 
  id, 
  index, 
  text, 
  isCollected, 
  isLocked,
  onToggleCollected, 
  onDelete 
}: ListItemProps) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isLocked}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group relative flex items-center gap-2 rounded-lg border p-4 shadow-sm transition-all duration-300",
            "hover:border-blue-200 hover:shadow-md",
            isCollected && "border-green-200 bg-green-50/80 scale-[0.98]",
            !isLocked && "cursor-grab active:cursor-grabbing"
          )}
          onClick={() => !isLocked && onToggleCollected(id)}
        >
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-300",
              isCollected ? "border-green-500 bg-green-500 scale-110" : "border-gray-300 hover:border-gray-400",
              !isLocked && "cursor-pointer"
            )}
          >
            {isCollected && <Check className="h-4 w-4 text-white animate-scale-in" />}
          </div>
          <span
            className={cn(
              "flex-1 text-lg transition-all duration-300",
              isCollected && "text-gray-500 line-through"
            )}
          >
            {text}
          </span>
          {!isLocked && (
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;