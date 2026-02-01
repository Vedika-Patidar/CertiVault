const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const upload = require("../middlewares/upload");

const {
  uploadExcel,
  getCertificateById,
  downloadCertificate,
  getAllCertificates
} = require("../controllers/certificateController");

// Admin Excel Upload
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  upload.single("file"),
  uploadExcel
);


// Get all certificates (Admin table)
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllCertificates
);

// User: Get Certificate by ID
router.get("/:certificateId", authMiddleware, getCertificateById);

// User: Download Certificate PDF
router.get("/download/:certificateId", authMiddleware, downloadCertificate);

module.exports = router;
