import { AVAILABLE_ELEMENTS } from "../utils/helpers";
import DraggableElements from "./DraggableElements";

function Sidebar() {
  return (
    <div className="p-4 shadow-xl">
      <h3 className="text-xl font-semibold">Elements</h3>
      <p className="text-slate-500">Drag elements to canvas</p>
      <hr className="text-slate-400 my-5" />
      {AVAILABLE_ELEMENTS.map((el) => (
        <DraggableElements key={el.id} {...el} />
      ))}
    </div>
  );
}

export default Sidebar;
