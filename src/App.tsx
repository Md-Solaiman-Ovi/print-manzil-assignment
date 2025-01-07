import React, { useState } from "react";
import "./App.css";
import CustomTable from "./components/CustomTable";
import TShirtDesigner from "./components/TShirtDesigner";

const App: React.FC = () => {
  const [showComponent, setShowComponent] = useState("customTable");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div>
        <div className="flex items-center justify-center gap-4 py-10">
          <button
            className={`rounded bg-blue-500 px-4 py-2 text-white shadow ${showComponent == "customTable" ? "bg-gray-700 text-white" : "bg-blue-500 text-white"}`}
            onClick={() => setShowComponent("customTable")}
          >
            Custom Table
          </button>
          <button
            className={`rounded bg-blue-500 px-4 py-2 text-white shadow ${showComponent == "tshirtDesign" ? "bg-gray-700 text-white" : "bg-blue-500 text-white"}`}
            onClick={() => setShowComponent("tshirtDesign")}
          >
            T-shirt Designer
          </button>
        </div>

        <div>
          {showComponent === "customTable" && <CustomTable />}
          {showComponent === "tshirtDesign" && <TShirtDesigner />}
        </div>
      </div>
    </div>
  );
};

export default App;
