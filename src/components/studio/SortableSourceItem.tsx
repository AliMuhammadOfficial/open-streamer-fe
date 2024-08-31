import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableSourceItem = ({ source }: { source: { id: number; name: string; icon: React.ReactNode } }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: source.id });

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
        {source.icon}
        <span>{source.name}</span>
      </div>
    </div>
  );
};

export default SortableSourceItem;