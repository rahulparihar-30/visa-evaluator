import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const EvaluationForm = () => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const navigate = useNavigate();
  const [countries, setCountries] = useState({});
  const [visaTypes, setVisaTypes] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedVisaType, setSelectedVisaType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= FETCH COUNTRIES =================
  const getSupportedCountries = async () => {
    try {
      const res = await api.get("visa/supported-countries");
      setCountries(res.data || res);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    getSupportedCountries();
  }, []);

  // ================= HELPERS =================
  const formatDocLabel = (doc) =>
    doc
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // ================= HANDLERS =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;

    setSelectedCountry(country);
    setSelectedVisaType("");
    setDocuments([]);
    setUploadedFiles({});

    const visas = Object.keys(countries[country]?.visas || {});
    setVisaTypes(visas);
  };

  const handleVisaTypeChange = (e) => {
    const visaType = e.target.value;

    setSelectedVisaType(visaType);

    const docs =
      countries[selectedCountry]?.visas?.[visaType]?.requiredDocuments || [];

    setDocuments(docs);
    setUploadedFiles({});
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert(
        `${formatDocLabel(name)} exceeds 5MB.\nPlease upload a smaller file.`
      );
      e.target.value = ""; // reset input
      return;
    }

    setUploadedFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // const missingDocs = documents.filter((doc) => !uploadedFiles[doc]);
    // if (missingDocs.length > 0) {
    //   alert(`Missing documents: ${missingDocs.join(", ")}`);
    //   return;
    // }

    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("fullName", formData.name);
    payload.append("email", formData.email);
    payload.append("country", selectedCountry);
    payload.append("visaType", selectedVisaType);

    Object.entries(uploadedFiles).forEach(([key, file]) => {
      payload.append(key, file);
    });

    try {
      const response = await api.post("visa/evaluate", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Submission successful:", response);
      localStorage.setItem("userId", response.id);
      navigate(`/result/${response.id}`);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= UI =================
  return (
    <section className="flex h-screen">
      {/* LEFT */}
      <div className="w-1/2 sm:block hidden relative">
        <img
          src="/flying-9827070_1280.jpg"
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-gray-100 flex-col p-8">
        <h1 className="text-3xl font-bold mb-6">Fill your preferences</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-3/4 bg-white p-8 rounded shadow-md sm:overflow-y-auto max-h-fit"
        >
          <fieldset
            disabled={isSubmitting}
            className={isSubmitting ? "opacity-70" : ""}
          >
            {/* NAME */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <input
                name="name"
                type="text"
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                name="email"
                type="email"
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            {/* COUNTRY */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Country</label>
              <select
                onChange={handleCountryChange}
                className="shadow border rounded w-full py-2 px-3"
                required
              >
                <option value="">Select Country</option>
                {Object.keys(countries).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* VISA */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Visa Type</label>
              <select
                onChange={handleVisaTypeChange}
                className="shadow border rounded w-full py-2 px-3"
                disabled={!selectedCountry}
                required
              >
                <option value="">Select Visa</option>
                {visaTypes.map((visa) => (
                  <option key={visa} value={visa}>
                    {visa}
                  </option>
                ))}
              </select>
            </div>

            {/* DOCUMENTS */}
            {documents.map((doc) => (
              <div key={doc} className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  {formatDocLabel(doc)}
                </label>
                <input
                  type="file"
                  name={doc}
                  onChange={handleFileChange}
                  className="shadow border rounded w-full py-2 px-3"
                />
                <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
              </div>
            ))}
          </fieldset>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-full text-white font-bold py-2 rounded flex items-center justify-center gap-2
              ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EvaluationForm;
