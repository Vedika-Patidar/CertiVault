const Certificate = require("../models/Certificate");
const xlsx = require("xlsx");
const generateCertificate = require("../utils/generateCertificate");

// Admin uploads Excel
exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (!data.length) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    const certificates = data.map((row, index) => {
      if (
        !row.CertificateID ||
        !row.StudentName ||
        !row.Email ||
        !row.InternshipDomain ||
        !row.StartDate ||
        !row.EndDate
      ) {
        throw new Error(`Missing fields in row ${index + 2}`);
      }

      return {
        certificateId: row.CertificateID.toString().trim(),
        studentName: row.StudentName.toString().trim(),
        email: row.Email.toString().trim(),
        internshipDomain: row.InternshipDomain.toString().trim(),
        startDate: new Date(row.StartDate),
        endDate: new Date(row.EndDate),
        issuedAt: row.IssuedAt ? new Date(row.IssuedAt) : new Date(),
      };
    });

    const result = await Certificate.insertMany(certificates, {
      ordered: false,
    });

    res.status(201).json({
      message: "Certificates uploaded successfully",
      inserted: result.length,
    });
  } catch (error) {
    console.error("UPLOAD ERROR 👉", error.message);

    res.status(400).json({
      message: error.message || "Error uploading certificates",
    });
  }
};



// Get certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId });
    if (!certificate) {
      return res
        .status(404)
        .json({ verified: false, message: "Certificate not found" });
    }

    res.status(200).json({
      verified: true,
      message: "Certificate verified successfully",
      data: certificate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Download certificate PDF
exports.downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId });
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // generateCertificate should send PDF to res
    await generateCertificate(res, certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating certificate" });
  }
};



// Get all certificates (Admin)
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error("FETCH CERTIFICATES ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
};
