import { useState } from "react";
import { useBuilderContext } from "../context/BuilderContext";
import { DEFAULT_PROPS, nanoid } from "../utils/helpers";

const TEMPLATES = [
  {
    id: "business",
    name: "Business Website",
    thumbnail: "/templates/business-thumb.jpg",
    sections: ["header", "hero", "features", "about", "contact", "footer"]
  },
  {
    id: "portfolio",
    name: "Portfolio",
    thumbnail: "/templates/portfolio-thumb.jpg",
    sections: ["header", "showcase", "skills", "testimonials", "contact", "footer"]
  },
  {
    id: "ecommerce",
    name: "Online Store",
    thumbnail: "/templates/ecommerce-thumb.jpg",
    sections: ["header", "featured-products", "categories", "sale", "newsletter", "footer"]
  }
];

function TemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { elements, setElements } = useBuilderContext();
  
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Here you would load the template structure
    // This is a simplified example - in a real app you'd likely fetch this data
    
    // Example of initializing canvas with template sections
    const templateSections = template.sections.map((section, index) => ({
      id: nanoid(),
      type: "container",
      position: { x: 20, y: 20 + (index * 100) },
      props: { 
        ...DEFAULT_PROPS.container,
        label: section.charAt(0).toUpperCase() + section.slice(1)
      }
    }));
    
    setElements(templateSections);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Choose a Template</h2>
      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map((template) => (
          <div 
            key={template.id}
            className={`p-2 border rounded cursor-pointer hover:border-blue-500 ${
              selectedTemplate?.id === template.id ? "border-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="h-24 bg-gray-200 mb-2"></div>
            <p className="font-medium text-center">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;