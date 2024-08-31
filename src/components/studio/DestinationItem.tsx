import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const DestinationItem = ({
    destination,
    onRemove,
  }: {
    destination: IDestination;
    onRemove: (id: number) => void;
  }) => (
    <div className="flex items-center justify-between bg-secondary p-2 rounded-md mb-2">
      <div className="flex items-center">
        {destination.icon && <destination.icon className="mr-2 h-5 w-5" />}
        <span>{destination.name}</span>
      </div>
      <Button variant="ghost" size="sm" onClick={() => onRemove(destination.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

export default DestinationItem;