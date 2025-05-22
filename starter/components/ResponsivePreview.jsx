import { useState } from "react";
import { useBuilderContext } from "../context/BuilderContext";

function ResponsivePreview() {
  const [viewport, setViewport] = useState("desktop");
  const { elements } = useBuilderContext();

  const viewportStyles = {
    desktop: { width: "100%", maxWidth: "1200px" },
    tablet: { width: "768px", border: "10px solid #333", borderRadius: "20px" },
    mobile: { width: "375px", border: "16px solid #333", borderRadius: "36px" }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center gap-4 mb-4">
        <button 
          onClick={() => setViewport("desktop")}
          className={`px-3 py-1 rounded ${viewport === "desktop" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Desktop
        </button>
        <button 
          onClick={() => setViewport("tablet")}
          className={`px-3 py-1 rounded ${viewport === "tablet" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Tablet
        </button>
        <button 
          onClick={() => setViewport("mobile")}
          className={`px-3 py-1 rounded ${viewport === "mobile" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Mobile
        </button>
      </div>
      
      <div className="flex justify-center">
        <div 
          style={viewportStyles[viewport]}
          className="min-h-64 bg-white shadow transition-all duration-300"
        >
          <div className="relative" style={{ height: "500px" }}>
            {elements.map((element) => (
              <div
                key={element.id}
                style={{
                  position: "absolute",
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                }}
              >
                {/* Render element content here - same logic as in CanvasElement */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResponsivePreview;