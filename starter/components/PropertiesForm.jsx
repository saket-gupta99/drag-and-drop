import { useBuilderContext } from "../context/BuilderContext";

function PropertiesForm() {
  const { selectedElement, updateElementProps } = useBuilderContext();

  if (!selectedElement) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Properties</h2>
        <p className="text-gray-500">Select an element to edit its properties</p>
      </div>
    );
  }

  const handleChange = (propName, value) => {
    updateElementProps(selectedElement.id, { [propName]: value });
  };

  const renderPropertiesForm = () => {
    const { type, props } = selectedElement;

    switch (type) {
      case "text":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                value={props.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Font Size</label>
              <input
                type="text"
                value={props.fontSize}
                onChange={(e) => handleChange("fontSize", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="color"
                value={props.color}
                onChange={(e) => handleChange("color", e.target.value)}
                className="w-full p-2 border rounded h-10"
              />
            </div>
          </>
        );
      case "image":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                value={props.src}
                onChange={(e) => handleChange("src", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={props.alt}
                onChange={(e) => handleChange("alt", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Width</label>
              <input
                type="text"
                value={props.width}
                onChange={(e) => handleChange("width", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        );
      case "button":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <input
                type="text"
                value={props.text}
                onChange={(e) => handleChange("text", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Background Color</label>
              <input
                type="color"
                value={props.backgroundColor}
                onChange={(e) => handleChange("backgroundColor", e.target.value)}
                className="w-full p-2 border rounded h-10"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Text Color</label>
              <input
                type="color"
                value={props.color}
                onChange={(e) => handleChange("color", e.target.value)}
                className="w-full p-2 border rounded h-10"
              />
            </div>
          </>
        );
      case "heading":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Heading Text</label>
              <input
                type="text"
                value={props.text}
                onChange={(e) => handleChange("text", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Heading Level</label>
              <select
                value={props.level}
                onChange={(e) => handleChange("level", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="color"
                value={props.color}
                onChange={(e) => handleChange("color", e.target.value)}
                className="w-full p-2 border rounded h-10"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Properties</h2>
      <h3 className="font-medium text-gray-700 mb-3">
        {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}
      </h3>
      {renderPropertiesForm()}
      <div className="mt-4">
        <button
          onClick={() => selectElement(null)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PropertiesForm;