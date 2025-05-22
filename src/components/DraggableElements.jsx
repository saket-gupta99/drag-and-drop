import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function DraggableElements({ id, label, icon }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 my-2 border border-gray-300 rounded-md"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default DraggableElements;
