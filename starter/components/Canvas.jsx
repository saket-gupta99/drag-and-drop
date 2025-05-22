import { useDroppable } from "@dnd-kit/core";
import { useBuilderContext } from "../context/BuilderContext";
import CanvasElement from "./CanvasElement";

function Canvas() {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const { elements } = useBuilderContext();

  return (
    <div 
      ref={setNodeRef} 
      className="h-full bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300"
    >
      <h2 className="text-xl font-bold mb-4">Website Canvas</h2>
      <div className="relative min-h-64">
        {elements.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Drag elements here to build your website
          </div>
        ) : (
          elements.map((element) => (
            <CanvasElement 
              key={element.id} 
              element={element} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Canvas;
