import { useEffect, useState } from "react";
import { useBuilderContext } from "../context/BuilderContext";

function PropertiesForm() {
  const { selectedId, updateElement, elements, removeElement } =
    useBuilderContext();
  const selectedElement = elements.find((el) => el.id === selectedId);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedElement) setFormData(selectedElement.props);
  }, [selectedElement]);

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    updateElement(selectedElement.id, { [name]: value });
  }

  if (!selectedElement)
    return (
      <h3 className="p-4 shadow-xl font-semibold text-lg">
        Select an Element to edit
      </h3>
    );

  return (
    <div className="shadow-xl p-4 ">
      <h3 className="font-semibold text-lg mb-4">
        Edit {selectedElement.type}
      </h3>
      {Object.entries(formData).map(([key, value]) => {
        return (
          <div key={key}>
            <label className="block text-gray-700 mb-1">
              {key}
              <input
                className="border w-full p-1 text-black"
                value={value}
                onChange={handleChange}
                name={key}
              />
            </label>
          </div>
        );
      })}
      <button
        className="p-2 bg-blue-500 rounded-sm mt-3 text-white cursor-pointer"
        onClick={() => removeElement(selectedElement.id)}
      >
        Remove {selectedElement.type}
      </button>
    </div>
  );
}

export default PropertiesForm;
