import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableSourceItem = ({ source }: { source: ISource | IDestination | null }) => {
  if (!source) {
    return null;
  }
  const { attributes, listeners, setNodeRef, transform, transition } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSortable({ id: source.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card p-3 rounded-md mb-2 cursor-move"
    >
      <div className="flex items-center">
        <source.icon className="w-6 h-6 mr-2" />
        <span>{source.name}</span>
      </div>
    </div>
  );
};

export default SortableSourceItem;
