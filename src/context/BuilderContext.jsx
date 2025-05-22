import { DndContext } from "@dnd-kit/core";
import { createContext, useContext, useState } from "react";
import { DEFAULT_PROPS, uniqueId } from "../utils/helpers";
import { arrayMove } from "@dnd-kit/sortable";

const BuilderContext = createContext();

export default function BuilderProvider({ children }) {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addElements = (type) => {
    const newElement = {
      id: uniqueId(),
      type,
      props: DEFAULT_PROPS[type] || {},
    };

    setElements((el) => [...el, newElement]);
  };

  const updateElement = (id, newProps) => {
    setElements((els) => {
      return els.map((el) =>
        el.id === id ? { ...el, props: { ...el.props, ...newProps } } : el
      );
    });
  };

  const removeElement = (id) => {
    setElements((els) => els.filter((el) => el.id !== id));
  };

  const getElementPos = (id) => {
    return elements.findIndex((el) => el.id === id);
  };

  const handleDragEnd = (e) => {
    const { over, active } = e;
    if (!over) return;

    const isFromSidebar = !elements.some(el => el.id === active.id);

    if (over.id === "canvas" && isFromSidebar) {
      addElements(active.id);
      return;
    }

    if (!isFromSidebar && over.id !== active.id) {
      const oldIndex = getElementPos(active.id);
      const newIndex = getElementPos(over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      setElements(els => arrayMove(els, oldIndex, newIndex))
    }
  };

  return (
    <BuilderContext.Provider
      value={{
        elements,
        addElements,
        updateElement,
        selectedId,
        setSelectedId,
        removeElement,
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>
    </BuilderContext.Provider>
  );
}

export function useBuilderContext() {
  const context = useContext(BuilderContext);
  if (!context) throw new Error("Cannot use outside Builder Provider");

  return context;
}
