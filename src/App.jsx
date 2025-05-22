import Canvas from "./components/Canvas";
import PropertiesForm from "./components/PropertiesForm";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex">
      <main
        className={`flex flex-col sm:grid sm:grid-cols-[16rem_1fr_20rem] gap-6 sm:h-screen w-full`}
      >
        <Sidebar />
        <Canvas />
        <PropertiesForm />
      </main>
    </div>
  );
}

export default App;
