const PDFDocument = require("pdfkit");

const generateCertificate = async (res, certificate, mode = "preview") => {
  const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 0 });

  // Headers for PDF response
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    mode === "download"
      ? `attachment; filename=Cert_${certificate.certificateId}.pdf`
      : `inline; filename=Cert_${certificate.certificateId}.pdf`
  );

  doc.pipe(res);

  const pageWidth = 842;
  const pageHeight = 595;
  const centerX = pageWidth / 2;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  /* ================= BORDERS ================= */
  doc
    .rect(20, 20, pageWidth - 40, pageHeight - 40)
    .lineWidth(4)
    .stroke("#0B3C5D"); // navy border

  doc
    .rect(32, 32, pageWidth - 64, pageHeight - 64)
    .lineWidth(1)
    .stroke("#B8860B"); // gold inner accent

  /* ================= HEADER ================= */
  let y = 70;

  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor("#0B3C5D")
    .text("AMDOX TECHNOLOGIES PRIVATE LIMITED", 0, y, {
      align: "center",
      lineGap: 5,
    });

  y += 28;
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#64748B")
    .text("ISO 9001:2015 CERTIFIED ORGANIZATION", {
      align: "center",
      lineGap: 50,
    });

  /* ================= TITLE ================= */
  y += 55;
  doc
    .font("Times-Bold")
    .fontSize(38)
    .fillColor("#1E293B")
    .text("CERTIFICATE OF INTERNSHIP", {
      align: "center",
      lineGap: 25,
    });

  /* ================= INTRO ================= */
  y += 45;
  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("#475569")
    .text("This is to certify that", {
      align: "center",
      lineGap: 8,
    });

  /* ================= STUDENT NAME ================= */
  y += 26;
  doc
    .font("Helvetica-Bold")
    .fontSize(30)
    .fillColor("#0B3C5D")
    .text(certificate.studentName.toUpperCase(), {
      align: "center",
      lineGap: 0,
    });

  /* ================= DOMAIN INFO ================= */
  y += 38;
  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("#475569")
    .text("has successfully completed their professional internship in", {
      align: "center",
      lineGap: 8,
    });

  y += 26;
  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor("#B8860B") // elegant gold
    .text(certificate.internshipDomain.toUpperCase(), {
      align: "center",
      lineGap: 6,
    });

  /* ================= DATES ================= */
  y += 32;
  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#334155")
    .text(
      `From ${formatDate(certificate.startDate)} to ${formatDate(
        certificate.endDate
      )}`,
      { align: "center", lineGap: 0 }
    );

  /* ================= SIGNATURES ================= */
  const sigY = pageHeight - 120;
  const sigWidth = 200;
  const spacing = 60;

  // Left signature
  const leftX = centerX - sigWidth - spacing;
  doc
    .strokeColor("#CBD5E1")
    .lineWidth(1)
    .moveTo(leftX, sigY)
    .lineTo(leftX + sigWidth, sigY)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#0B3C5D")
    .text("Avery Davis", leftX, sigY + 12, {
      width: sigWidth,
      align: "center",
    });

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#64748B")
    .text("Managing Director", leftX, sigY + 28, {
      width: sigWidth,
      align: "center",
    });

  // Right signature
  const rightX = centerX + spacing;
  doc
    .strokeColor("#CBD5E1")
    .lineWidth(1)
    .moveTo(rightX, sigY)
    .lineTo(rightX + sigWidth, sigY)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#0B3C5D")
    .text("Reese Miller", rightX, sigY + 12, {
      width: sigWidth,
      align: "center",
    });

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#64748B")
    .text("Human Resources", rightX, sigY + 28, {
      width: sigWidth,
      align: "center",
    });

  /* ================= FOOTER ================= */
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#94A3B8")
    .text(
      `Certificate ID: ${certificate.certificateId}  |  Issued on: ${formatDate(
        certificate.issuedAt
      )}`,
      0,
      pageHeight - 50,
      { align: "center" }
    );

  doc.end();
};

module.exports = generateCertificate;
