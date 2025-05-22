import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useBuilderContext } from "../context/BuilderContext";

function CanvasElement({ element }) {
  const { selectElement } = useBuilderContext();
  const { id, type, position, props } = element;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `canvas-${id}`,
    data: { isCanvasElement: true, elementId: id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  const handleElementClick = () => {
    selectElement(id);
  };

  const renderElement = () => {
    switch (type) {
      case "text":
        return (
          <p style={{ fontSize: props.fontSize, color: props.color }}>
            {props.content}
          </p>
        );
      case "image":
        return (
          <img src={props.src} alt={props.alt} style={{ width: props.width }} />
        );
      case "button":
        return (
          <button
            style={{
              backgroundColor: props.backgroundColor,
              color: props.color,
            }}
            className="px-4 py-2 rounded"
          >
            {props.text}
          </button>
        );
      case "heading": {
        const HeadingTag = props.level;
        return (
          <HeadingTag style={{ color: props.color }}>{props.text}</HeadingTag>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleElementClick}
      className="absolute p-2 border-2 border-transparent hover:border-blue-500 min-w-24"
      {...attributes}
      {...listeners}
    >
      {renderElement()}
    </div>
  );
}

export default CanvasElement;
