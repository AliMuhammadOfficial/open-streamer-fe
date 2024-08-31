import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableSourceItem from "./SortableSourceItem";

const SceneEditor = ({
  sources,
  sceneSources,
  setSceneSources,
}: {
  sources: any[];
  sceneSources: { id: number; name: string; icon: React.ReactNode }[];
  setSceneSources: any;
}) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSceneSources((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id);
        const newIndex = items.findIndex((item: any) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;

    if (
      over &&
      over.id === "droppable" &&
      !sceneSources.find((item) => item.id === active.id)
    ) {
      const newSource = sources.find((source) => source.id === active.id);
      if (newSource) {
        setSceneSources((prevSources: any) => [...prevSources, newSource]);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Available Sources</h4>
          <SortableContext
            items={sources}
            strategy={verticalListSortingStrategy}
          >
            {sources.map((source) =>
              source && source.id ? (
                <SortableSourceItem key={source.id} source={source} />
              ) : null
            )}
          </SortableContext>
        </div>
        <div
          className="bg-secondary p-4 rounded-lg min-h-[200px]"
          id="droppable"
        >
          <h4 className="font-semibold mb-2">Current Scene</h4>
          <SortableContext
            items={sceneSources}
            strategy={verticalListSortingStrategy}
          >
            {sceneSources.map((source) =>
              source && source.id ? (
                <SortableSourceItem key={source.id} source={source} />
              ) : null
            )}
          </SortableContext>
          {sceneSources.length === 0 && (
            <p className="text-muted-foreground">Drag sources here</p>
          )}
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <SortableSourceItem source={sources.find((s) => s.id === activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SceneEditor;
