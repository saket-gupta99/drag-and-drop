import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function DraggableElements({ id, type, label, icon }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ 
      id, 
      data: { type } 
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 p-3 bg-gray-50 rounded-md cursor-move hover:bg-gray-100"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default DraggableElements;