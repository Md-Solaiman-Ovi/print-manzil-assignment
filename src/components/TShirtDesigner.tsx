import React, { useState, useRef } from "react";
import Draggable from "react-draggable";

const TShirtDesigner: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(100); // Initial size of the logo
  const tshirtRef = useRef<HTMLDivElement>(null);

  // Handle file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo resizing
  const handleLogoResize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoSize(parseInt(e.target.value, 10));
  };

  // Export final image
  const exportImage = async () => {
    if (tshirtRef.current) {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(tshirtRef.current);
      const link = document.createElement("a");
      link.download = "tshirt-design.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">T-Shirt Designer</h1>

      <div className="flex items-center gap-10">
        {/* Predefined T-Shirt Image */}
        <div
          ref={tshirtRef}
          className="bg-t-shirt relative flex h-96 w-80 items-center justify-center bg-cover"
        >
          {logo && (
            <Draggable bounds="parent">
              <div
                className="absolute"
                style={{
                  width: logoSize,
                  height: "auto",
                }}
              >
                <img src={logo} alt="Logo" className="h-auto w-full" />
              </div>
            </Draggable>
          )}
        </div>

        {/* Upload a logo and logo can be resized */}
        <div className="mt-4 space-y-2">
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
          <div className="flex items-center space-x-2">
            <label htmlFor="logoSize" className="text-sm">
              Logo Size:
            </label>
            <input
              id="logoSize"
              type="range"
              min="50"
              max="200"
              value={logoSize}
              onChange={handleLogoResize}
            />
          </div>

          {/* Download the final image */}
          <button
            onClick={exportImage}
            className="rounded bg-blue-500 px-4 py-2 text-white shadow"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default TShirtDesigner;
