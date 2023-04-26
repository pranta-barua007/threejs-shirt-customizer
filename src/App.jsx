import Canvas from "./canvas";
import Customizer from "./pages/Customizer";

function App() {
  return (
    <div className="app transition-all ease-in">
      <Canvas />
      <Customizer />
    </div>
  );
}

export default App;
