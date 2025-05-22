import { useSortable } from "@dnd-kit/sortable";
import { useBuilderContext } from "../context/BuilderContext";
import { CSS } from "@dnd-kit/utilities";

function CanvasElement(props) {
  const { selectedId, setSelectedId } = useBuilderContext();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: props.id,
    });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e) => {
    // Prevent event bubbling and ensure clean selection
    e.stopPropagation();
    e.preventDefault();
    setSelectedId(props.id);
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={`p-2 border mb-2 cursor-pointer ${
        selectedId === props.id
          ? "border-blue-400 bg-blue-50"
          : "border-gray-200 hover:border-gray-400"
      } element relative`}
      onClick={handleClick}
    >
      <div
        {...listeners}
        {...attributes}
        className="absolute top-1 right-1 w-6 h-6 bg-gray-300 hover:bg-gray-400 cursor-move rounded flex items-center justify-center text-xs"
        title="Drag to reorder"
      >
        ⋮⋮
      </div>
      <div className="pr-8">{renderElement(props)}</div>
    </div>
  );
}

export default CanvasElement;

function renderElement(el) {
  const { props } = el;

  switch (el.type) {
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
            padding: props.padding,
          }}
        >
          {props.text}
        </button>
      );
    case "heading": {
      const HeadingTag = props.level || "h2";
      return (
        <HeadingTag style={{ color: props.color }}>{props.text}</HeadingTag>
      );
    }
    // case "form": {
    //   return (
    //     <form>
    //       {props.fields.map((el) => {
    //         return (
    //           <label className="mr-2" key={el.type}>
    //             {el.label}:
    //             <input
    //               type={el.type}
    //               placeholder={el.placeholder}
    //               className="border rounded-sm ml-2 p-0.5"
    //             />
    //           </label>
    //         );
    //       })}
    //       <button className="p-2 bg-blue-500 cursor-pointer text-white rounded-sm">{props.submitText}</button>
    //     </form>
    //   );
    // }
    case "container":
      return (
        <div
          style={{
            width: props.width,
            backgroundColor: props.backgroundColor,
            padding: props.padding,
            borderRadius: props.borderRadius,
          }}
        ></div>
      );
    default:
      return <div>Unknown element type: {el.type}</div>;
  }
}
