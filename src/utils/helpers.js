export const AVAILABLE_ELEMENTS = [
  { id: "text", type: "text", label: "Text Block", icon: "📝" },
  { id: "image", type: "image", label: "Image", icon: "🖼️" },
  { id: "button", type: "button", label: "Button", icon: "🔘" },
  { id: "heading", type: "heading", label: "Heading", icon: "📋" },
  // { id: "form", type: "form", label: "Form", icon: "📋" },
  { id: "container", type: "container", label: "Container", icon: "📦" },
];

export const DEFAULT_PROPS = {
  text: { content: "Sample text content...", fontSize: "16px", color: "#333" },
  image: {
    src: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740",
    alt: "Sample image",
    width: "200px",
  },
  button: { text: "Click Me", backgroundColor: "#007bff", color: "white", padding: "5px" },
  heading: { text: "Sample Heading", level: "h2", color: "#333" },
  // form: {
  //   title: "Contact Form",
  //   fields: [
  //     { type: "text", label: "Name", placeholder: "Enter your name" },
  //     { type: "email", label: "Email", placeholder: "Enter your email" },
  //   ],
  //   submitText: "Submit",
  // },
  container: {
    width: "100%",
    backgroundColor: "#d7dbdb",
    padding: "20px",
    borderRadius: "5px",
  },
};

// Generate a unique ID
export function uniqueId() {
  return crypto.randomUUID();
}
