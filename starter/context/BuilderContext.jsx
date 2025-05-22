import { createContext, useContext, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { DEFAULT_PROPS } from "../utils/helpers";
import { nanoid } from "../utils/helpers";

// Create the context
const BuilderContext = createContext();

export default function BuilderProvider({ children }) {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);

  // Add a new element to the canvas
  const addElement = (type) => {
    const newElement = {
      id: nanoid(),
      type,
      position: { x: 10, y: 10 }, // Default position
      props: { ...DEFAULT_PROPS[type] }
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  // Update element position
  const updateElementPosition = (id, position) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, position } : el))
    );
  };

  // Update element properties
  const updateElementProps = (id, newProps) => {
    setElements(
      elements.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            props: { ...el.props, ...newProps }
          };
        }
        return el;
      })
    );

    // Also update the selected element if it's the one being modified
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({
        ...selectedElement,
        props: { ...selectedElement.props, ...newProps }
      });
    }
  };

  // Remove an element
  const removeElement = (id) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  // Select an element for editing
  const selectElement = (id) => {
    if (!id) {
      setSelectedElement(null);
      return;
    }

    const element = elements.find((el) => el.id === id);
    if (element) {
      setSelectedElement(element);
    }
  };

  // Handle drag start
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    
    // If it's a canvas element being dragged, get its initial position
    if (typeof active.id === 'string' && active.id.startsWith('canvas-')) {
      const elementId = active.data.current?.elementId;
      const element = elements.find(el => el.id === elementId);
      if (element) {
        setInitialPosition(element.position);
      }
    }
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { over, active } = event;
    
    // If it's a sidebar element being dragged to the canvas
    if (over && over.id === 'canvas' && active.data.current?.type && !active.id.toString().startsWith('canvas-')) {
      const type = active.data.current.type;
      
      // Get the mouse position relative to the canvas
      const canvasElement = document.querySelector('[data-droppable-id="canvas"]');
      const rect = canvasElement?.getBoundingClientRect();
      
      if (rect) {
        const x = event.activatorEvent.clientX - rect.left;
        const y = event.activatorEvent.clientY - rect.top;
        
        // Add the new element at the drop position
        const newElement = {
          id: nanoid(),
          type,
          position: { x, y },
          props: { ...DEFAULT_PROPS[type] }
        };
        
        setElements([...elements, newElement]);
        setSelectedElement(newElement);
      }
    }
    
    // If it's a canvas element being repositioned
    else if (active.data.current?.isCanvasElement) {
      const elementId = active.data.current.elementId;
      const element = elements.find(el => el.id === elementId);
      
      if (element && initialPosition) {
        const deltaX = event.delta.x;
        const deltaY = event.delta.y;
        
        updateElementPosition(elementId, {
          x: initialPosition.x + deltaX,
          y: initialPosition.y + deltaY
        });
      }
    }
    
    setActiveId(null);
    setInitialPosition(null);
  };

  return (
    <BuilderContext.Provider
      value={{
        elements,
        selectedElement,
        addElement,
        updateElementPosition,
        updateElementProps,
        removeElement,
        selectElement
      }}
    >
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DndContext>
    </BuilderContext.Provider>
  );
}

export function useBuilderContext() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error(
      "useBuilderContext can only be used in descendants of BuilderProvider"
    );
  }
  return context;
}
