// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// const AdminDashboard = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [certificates, setCertificates] = useState([]);

//   // Fetch certificates
//   const fetchCertificates = async () => {
//     try {
//       const res = await api.get("/certificates");
//       setCertificates(res.data.data);
//     } catch (error) {
//       console.error("Fetch error", error);
//     }
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setMessage("");
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select an Excel (.xlsx) file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await api.post("/certificates/upload", formData);
//       setMessage(res.data.message || "Excel uploaded successfully");
//       setFile(null);
//       fetchCertificates(); // 🔥 refresh table
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-8">
//       <div className="max-w-6xl mx-auto space-y-10">
//         {/* Upload Section */}
//         <div className="bg-white rounded-xl shadow p-8">
//           <h1 className="text-2xl font-bold text-slate-800 mb-6">
//             Admin Dashboard
//           </h1>

//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
//             <p className="text-slate-600 mb-4">
//               Upload Internship Certificate Excel File
//             </p>

//             <input
//               type="file"
//               accept=".xlsx"
//               id="excelUpload"
//               onChange={handleFileChange}
//               className="hidden"
//             />

//             <label
//               htmlFor="excelUpload"
//               className="cursor-pointer bg-slate-200 hover:bg-slate-300
//                          text-slate-700 px-6 py-2 rounded-lg transition"
//             >
//               Choose Excel File
//             </label>

//             {file && (
//               <p className="mt-3 text-sm text-slate-700">
//                 Selected: <b>{file.name}</b>
//               </p>
//             )}

//             <div className="mt-6">
//               <button
//                 onClick={handleUpload}
//                 disabled={loading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white
//                            px-8 py-2 rounded-lg transition disabled:opacity-60"
//               >
//                 {loading ? "Uploading..." : "Upload Excel"}
//               </button>
//             </div>

//             {message && (
//               <p className="mt-4 text-sm text-slate-700">{message}</p>
//             )}
//           </div>
//         </div>

//         {/* Certificates Table */}
//         <div className="bg-white rounded-xl shadow p-8">
//           <h2 className="text-xl font-semibold text-slate-800 mb-4">
//             Uploaded Certificates
//           </h2>

//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-slate-100 text-left text-sm text-slate-600">
//                   <th className="p-3">Certificate ID</th>
//                   <th className="p-3">Student Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">Domain</th>
//                   <th className="p-3">Duration</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {certificates.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="p-4 text-center text-slate-500">
//                       No certificates uploaded yet
//                     </td>
//                   </tr>
//                 ) : (
//                   certificates.map((cert) => (
//                     <tr
//                       key={cert._id}
//                       className="border-t text-sm hover:bg-slate-50"
//                     >
//                       <td className="p-3">{cert.certificateId}</td>
//                       <td className="p-3">{cert.studentName}</td>
//                       <td className="p-3">{cert.email}</td>
//                       <td className="p-3">{cert.internshipDomain}</td>
//                       <td className="p-3">
//                         {new Date(cert.startDate).toLocaleDateString()} –{" "}
//                         {new Date(cert.endDate).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const fetchCertificates = async () => {
    try {
      const res = await api.get("/certificates");
      setCertificates(res.data.data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an Excel (.xlsx) file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/certificates/upload", formData);
      setMessage(res.data.message);
      setFile(null);
      fetchCertificates();
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-zinc-100 flex">
      {/* Sidebar (Desktop) */}

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-8">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">Admin</span>

            <button
              onClick={handleLogout}
              className="bg-red-600/10 hover:bg-red-600/20
                 text-red-400 px-4 py-1.5 rounded-lg
                 text-sm transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <section className="p-4 md:p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#080c18] border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-400 text-sm">Total Certificates</p>
              <p className="text-3xl font-bold mt-2">{certificates.length}</p>
            </div>

            <div className="bg-[#080c18] border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-400 text-sm">Latest Upload</p>
              <p className="mt-2 text-sm">
                {certificates[0]?.studentName || "—"}
              </p>
            </div>
          </div>

          {/* Upload */}
          <div className="bg-[#080c18] border border-zinc-800 rounded-xl p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-4">
              Upload Certificate Excel
            </h2>

            <input
              type="file"
              accept=".xlsx"
              id="excelUpload"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />

            <label
              htmlFor="excelUpload"
              className="inline-block bg-zinc-800 hover:bg-zinc-700
                         px-6 py-2 rounded-lg cursor-pointer transition"
            >
              Choose File
            </label>

            {file && (
              <p className="mt-3 text-sm text-zinc-400">
                Selected: <span className="text-zinc-200">{file.name}</span>
              </p>
            )}

            <div className="mt-6">
              <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white
                           px-8 py-2 rounded-lg disabled:opacity-50 transition cursor-pointer"
              >
                {loading ? "Uploading..." : "Upload Excel"}
              </button>
            </div>

            {message && <p className="mt-4 text-sm text-zinc-400">{message}</p>}
          </div>

          {/* Table */}
          <div className="bg-[#080c18] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              Uploaded Certificates
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full text-sm">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-800">
                    <th className="p-3 text-left">Certificate ID</th>
                    <th className="p-3 text-left">Student</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Domain</th>
                    <th className="p-3 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => (
                    <tr
                      key={cert._id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/50"
                    >
                      <td className="p-3">{cert.certificateId}</td>
                      <td className="p-3">{cert.studentName}</td>
                      <td className="p-3">{cert.email}</td>
                      <td className="p-3">{cert.internshipDomain}</td>
                      <td className="p-3">
                        {new Date(cert.startDate).toLocaleDateString()} –{" "}
                        {new Date(cert.endDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
