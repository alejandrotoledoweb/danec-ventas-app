import { useState, useRef } from "react";

import SignatureCanvas from "react-signature-canvas";
import "./App.css";

interface FormData {
  sellerCode: string;
  clientCode: string;
  marca: string;
  activity: string;
  description: string;
  image: string | ArrayBuffer | null;
  signature: string | null;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    sellerCode: "",
    clientCode: "",
    marca: "",
    activity: "",
    description: "",
    image: "",
    signature: null,
  });
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  const saveSignature = () => {
    if (sigCanvasRef.current) {
      setSignatureData(sigCanvasRef.current.toDataURL());
    }
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setSignatureData(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newSubmission = {
      ...formData,
      signature: signatureData,
      image: imagePreview,
    };
    setSubmissions([...submissions, newSubmission]);

    // Clear the form and previews
    setFormData({
      sellerCode: "",
      clientCode: "",
      marca: "",
      activity: "",
      description: "",
      image: "",
      signature: null,
    });
    setImagePreview(null);
    setSignatureData(null);
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file.name });
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form
        className="bg-white p-6 rounded shadow-lg max-w-full mx-auto my-1"
        onSubmit={handleSubmit}
      >
        <h2 className="bg-white p-6 rounded shadow-lg max-w-full mx-auto my-1 text-black text-lg font-bold">
          Actas de Entrega
        </h2>
        <h1 className="text-xl font-bold mb-1">Actas de Entrega:</h1>

        {/* Seller Code */}
        <label
          htmlFor="sellerCode"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Código de vendedor:
        </label>
        <select
          id="sellerCode"
          className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={formData.sellerCode}
          onChange={(e) =>
            setFormData({ ...formData, sellerCode: e.target.value })
          }
        >
          <option value="338200">DF - 338200</option>
          <option value="337654">JP - 337654</option>
          <option value="994332">FN - 994332</option>
        </select>

        {/* Client Code */}
        <label
          htmlFor="clientCode"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Código de cliente:
        </label>
        <select
          id="clientCode"
          className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={formData.sellerCode}
          onChange={(e) =>
            setFormData({ ...formData, clientCode: e.target.value })
          }
        >
          <option value="3343222">C1 - 3343222</option>
          <option value="7856654">C2 - 7856654</option>
          <option value="0909494">C3 - 0909494</option>
        </select>

        {/* Brand */}
        <label
          htmlFor="marca"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Marca:
        </label>
        <select
          id="marca"
          className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={formData.sellerCode}
          onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
        >
          <option value="Marca1">Marca-1</option>
          <option value="Marca2">Marca-2</option>
          <option value="Marca3">Marca-3</option>
        </select>

        {/* Activity */}
        <label
          htmlFor="activity"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Actividad:
        </label>
        <select
          id="activity"
          className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={formData.sellerCode}
          onChange={(e) =>
            setFormData({ ...formData, activity: e.target.value })
          }
        >
          <option value="Marca1">Actividad-1</option>
          <option value="Marca2">Actividad-2</option>
          <option value="Marca3">Actividad-3</option>
        </select>

        {/* Description */}
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Descripción:
        </label>
        <textarea
          id="description"
          className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Descripción sobre el producto"
        />

        {/* Image Upload */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUpload"
          >
            Agregar Foto
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview as string}
                alt="Preview"
                className="object-fit w-32 h-auto"
              />
            </div>
          )}
        </div>

        {/* Signature Drawing */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Agregar Firma
          </label>
          <SignatureCanvas
            ref={sigCanvasRef}
            penColor="black"
            canvasProps={{
              className: "bg-gray-200 rounded border border-gray-300 mx-auto",
              width: 325,
              height: 200,
            }}
          />
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={saveSignature}
            >
              Guardar Firma
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={clearSignature}
            >
              Limpiar
            </button>
          </div>
          {signatureData && (
            <div className="mt-4">
              <img src={signatureData} alt="Signature preview" />
            </div>
          )}
        </div>

        {/* Form Submission */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Aceptar
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Render the list of submissions */}
      <div className="max-w-lg mx-auto my-10">
        <h2 className="text-lg font-bold mb-4">Submissions:</h2>
        <ul className="bg-gray-100 p-4 rounded text-black text-left">
          {submissions.map((submission, index) => (
            <li key={index} className="mb-2 p-2 border-b border-gray-300">
              <span className="block font-bold text-lg">
                Venta: {index + 1}
              </span>
              Código del vendedor: {submission.sellerCode},<br /> Código del
              cliente: {submission.clientCode}, <br /> Marca: {submission.marca}
              , <br />
              Actividad: {submission.activity}
              {submission.image && (
                <div className="flex justify-center">
                  <img
                    src={submission.image as string}
                    alt="Uploaded"
                    className="w-32 h-auto"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
