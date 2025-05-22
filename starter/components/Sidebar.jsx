import { AVAILABLE_ELEMENTS } from "../utils/helpers";
import DraggableElements from "./DraggableElements";

function Sidebar() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Elements</h2>
      <div className="space-y-2">
        {AVAILABLE_ELEMENTS.map((el) => (
          <DraggableElements 
            key={el.id} 
            id={el.id} 
            type={el.type} 
            label={el.label} 
            icon={el.icon} 
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;