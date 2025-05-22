import { useDroppable } from "@dnd-kit/core";
import { useBuilderContext } from "../context/BuilderContext.jsx";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CanvasElement from "./CanvasElement.jsx";

function Canvas() {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const { elements } = useBuilderContext();

  return (
    <div
      ref={setNodeRef}
      className="shadow-xl p-4 my-3 border-2 border-dashed border-gray-400 rounded-md"
    >
      <h3 className="text-xl font-semibold">Website Canvas</h3>
      <p className="text-slate-500">You can change the position of elements on canvas by using ⋮⋮</p>
      <hr className="text-slate-400 my-5" />
      <SortableContext strategy={verticalListSortingStrategy} items={elements}>
        {elements.map((el) => {
          return <CanvasElement key={el.id} {...el} />;
        })}
      </SortableContext>
    </div>
  );
}

export default Canvas;
