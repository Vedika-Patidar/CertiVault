// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContext";

// const UserDashboard = () => {
//   const [certificateId, setCertificateId] = useState("");
//   const [certificate, setCertificate] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const {user, logout} = useAuth()

//   const navigate = useNavigate();

//   const userName = localStorage.getItem("userName") || "User";

//   const handleSearch = async () => {
//     if (!certificateId) {
//       setError("Please enter Certificate ID");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setCertificate(null);

//       const res = await api.get(`/certificates/${certificateId}`);
//       setCertificate(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Certificate not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const res = await api.get(`/certificates/download/${certificateId}`, {
//         responseType: "blob",
//       });

//       const file = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(file);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `Certificate_${certificateId}.pdf`;
//       document.body.appendChild(link);
//       link.click();

//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch {
//       alert("Failed to download certificate");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const getNameFromEmail = (email) => {
//     if (!email) return "User";

//     const namePart = email.split("@")[0]; // vedika.patidar
//     return namePart
//       .split(".")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };


//   return (
//     <div className="min-h-screen bg-[#0f172a] text-zinc-100">
//       {/* Header */}
//       <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-8">
//         <h1 className="text-lg font-semibold">CertiVAULT</h1>

//         <div className="flex items-center gap-4 text-sm">
//           <span className="text-zinc-300 text-lg font-semibold"> {user?.name || "User"}</span>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg transition cursor-pointer"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Content */}
//       <div className="flex justify-center px-4 py-10">
//         <div className="w-full max-w-3xl space-y-8">
//           {/* Search Card */}
//           <div className="bg-[#080c18] border border-zinc-800 rounded-xl p-6">
//             <p className="text-zinc-400 text-sm mb-3">
//               Enter your Certificate ID
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <input
//                 type="text"
//                 placeholder="CERT-XXXX-2024"
//                 value={certificateId}
//                 onChange={(e) => setCertificateId(e.target.value)}
//                 className="flex-1 bg-zinc-900 border border-zinc-800
//                            px-4 py-2 rounded-lg text-sm
//                            focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />

//               <button
//                 onClick={handleSearch}
//                 disabled={loading}
//                 className="bg-blue-600 hover:bg-blue-700
//                            px-6 py-2 rounded-lg
//                            text-sm font-medium transition
//                            disabled:opacity-50 cursor-pointer"
//               >
//                 {loading ? "Searching..." : "Search"}
//               </button>
//             </div>

//             {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
//           </div>

//           {/* Empty State */}
//           {!certificate && !loading && !error && (
//             <div className="text-center text-zinc-400 py-16">
//               <p className="text-lg font-medium">Verify Your Certificate</p>
//               <p className="text-sm mt-2">
//                 Enter your Certificate ID above to view and download your
//                 certificate
//               </p>
//             </div>
//           )}

//           {/* Certificate Preview */}
//           {certificate && (
//             <div className="bg-[#080c18] border border-zinc-800 rounded-xl p-6 space-y-4">
//               <h2 className="text-lg font-semibold text-green-400">
//                 Certificate Verified ✅
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-zinc-400">Student Name</p>
//                   <p className="font-medium">{certificate.studentName}</p>
//                 </div>

//                 <div>
//                   <p className="text-zinc-400">Certificate ID</p>
//                   <p className="font-medium">{certificate.certificateId}</p>
//                 </div>

//                 <div>
//                   <p className="text-zinc-400">Email</p>
//                   <p className="font-medium">{certificate.email}</p>
//                 </div>

//                 <div>
//                   <p className="text-zinc-400">Internship Domain</p>
//                   <p className="font-medium">{certificate.internshipDomain}</p>
//                 </div>

//                 <div>
//                   <p className="text-zinc-400">Duration</p>
//                   <p className="font-medium">
//                     {new Date(certificate.startDate).toLocaleDateString()} –{" "}
//                     {new Date(certificate.endDate).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <button
//                   onClick={handleDownload}
//                   className="bg-green-600 hover:bg-green-700
//                              px-6 py-2 rounded-lg
//                              text-sm font-medium transition cursor-pointer"
//                 >
//                   Download Certificate (PDF)
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null); // 👈 for view modal

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* SEARCH CERTIFICATE */
  const handleSearch = async () => {
    if (!certificateId) {
      setError("Please enter Certificate ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCertificate(null);

      const res = await api.get(`/certificates/${certificateId}`);
      setCertificate(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Certificate not found");
    } finally {
      setLoading(false);
    }
  };

  /* VIEW CERTIFICATE (MODAL) */
  const handleView = async () => {
    try {
      const res = await api.get(`/certificates/download/${certificateId}`, {
        responseType: "blob",
      });

      const file = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(file);

      setPdfUrl(url);
    } catch {
      alert("Failed to load certificate");
    }
  };

  /* DOWNLOAD CERTIFICATE */
  const handleDownload = async () => {
    try {
      const res = await api.get(`/certificates/download/${certificateId}`, {
        responseType: "blob",
      });

      const file = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificate_${certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download certificate");
    }
  };

  /* CLOSE VIEWER */
  const handleCloseViewer = () => {
    window.URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
  };

  /* LOGOUT */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-zinc-100">
      {/* HEADER */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-8">
        <h1 className="text-lg font-semibold">Certificate Verification</h1>

        <div className="flex items-center gap-4">
          <span className="text-zinc-300 font-medium">
            {user?.name || "User"}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg text-sm transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-8">
          {/* SEARCH */}
          <div className="bg-[#080c18] border border-zinc-800 rounded-xl p-6">
            <p className="text-zinc-400 text-sm mb-3">
              Enter your Certificate ID
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="CERT-XXXX-2024"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800
                           px-4 py-2 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700
                           px-6 py-2 rounded-lg
                           text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </div>

          {/* EMPTY STATE */}
          {!certificate && !loading && !error && (
            <div className="text-center text-zinc-400 py-16">
              <p className="text-lg font-medium">Verify Your Certificate</p>
              <p className="text-sm mt-2">
                Search using your Certificate ID to view or download it
              </p>
            </div>
          )}

          {/* CERTIFICATE DETAILS */}
          {certificate && (
            <div className="bg-[#080c18] border border-zinc-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-green-400">
                Certificate Verified ✅
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-zinc-400">Student Name</p>
                  <p className="font-medium">{certificate.studentName}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Certificate ID</p>
                  <p className="font-medium">{certificate.certificateId}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Email</p>
                  <p className="font-medium">{certificate.email}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Internship Domain</p>
                  <p className="font-medium">{certificate.internshipDomain}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Duration</p>
                  <p className="font-medium">
                    {new Date(certificate.startDate).toLocaleDateString()} –{" "}
                    {new Date(certificate.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleView}
                  className="bg-indigo-600 hover:bg-indigo-700
                             px-6 py-2 rounded-lg
                             text-sm font-medium transition"
                >
                  View Certificate
                </button>

                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700
                             px-6 py-2 rounded-lg
                             text-sm font-medium transition"
                >
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PDF VIEW MODAL */}
      {pdfUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
          <div className="h-14 flex items-center justify-between px-6 bg-[#080c18] border-b border-zinc-800">
            <h2 className="text-sm font-medium text-zinc-200">
              Certificate Preview
            </h2>

            <button
              onClick={handleCloseViewer}
              className="text-zinc-400 hover:text-white text-xl transition"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 bg-black">
            <iframe
              src={pdfUrl}
              title="Certificate PDF"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
