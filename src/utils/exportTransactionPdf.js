import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const exportTransactionsPDF = (transactions, linkId) => {
  console.log(transactions);
  console.log(linkId);
  const doc = new jsPDF();

  const primaryBlue = [33, 96, 197];

  // =========================
  // FILTER DATA
  // =========================
  const filtered = transactions.filter((tx) => tx.link_id === linkId);
  console.log(filtered);

  // const transactionTitle =
  //   transactions.find((tx) => tx.link === linkId)?.transaction_title ||
  //   "Transactions";
  const totalRevenue = filtered.reduce(
    (sum, tx) => sum + (Number(tx.amount_paid) || 0),
    0,
  );

  // =========================
  // FONT (HELVETICA)
  // =========================
  doc.setFont("helvetica", "normal");

  // =========================
  // HEADER
  // =========================
  doc.setFontSize(18);
  doc.setTextColor(...primaryBlue);
  doc.text("UniPay", 14, 20);

  // blue dot branding
  doc.setFillColor(...primaryBlue);
  doc.circle(41, 17, 1.2, "F");

  // generated date (right side)
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 130, 20);

  // tagline
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text("Campus Payments Reimagined", 14, 26);

  // divider
  doc.setDrawColor(220);
  doc.line(14, 30, 196, 30);

  // =========================
  // TITLE
  // =========================
  doc.setFontSize(13);
  doc.setTextColor(30);
  doc.text("Transaction Report", 14, 40);

  // =========================
  // SUMMARY
  // =========================
  let y = 47;

  doc.setFontSize(10);
  doc.setTextColor(60);

  doc.text(`Total Transactions: ${filtered.length}`, 14, y);
  y += 6;

  // Revenue (blue highlight)
  doc.setTextColor(...primaryBlue);
  doc.text(`Total Revenue: NGN ${totalRevenue.toLocaleString("en-NG")}`, 14, y);

  y += 10;

  // reset color
  doc.setTextColor(60);

  // =========================
  // TABLE
  // =========================
  autoTable(doc, {
    startY: y,
    head: [["Customer", "Matric No", "Amount", "Status", "Date"]],
    body: filtered.map((tx) => [
      `${tx.first_name} ${tx.last_name}`,
      tx.matric_number,
      `NGN ${Number(tx.amount_paid || 0).toLocaleString("en-NG")}`,
      tx.status,
      new Date(tx.paid_at).toLocaleDateString(),
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: [40, 40, 40],
      font: "helvetica",
    },

    headStyles: {
      fillColor: primaryBlue,
      textColor: 255,
      fontStyle: "bold",
      font: "helvetica",
    },

    alternateRowStyles: {
      fillColor: [248, 250, 255],
    },

    tableLineColor: [220, 230, 245],
    tableLineWidth: 0.2,

    margin: { left: 14, right: 14 },
  });

  // =========================
  // FOOTER
  // =========================
  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    doc.setFontSize(9);
    doc.setTextColor(150);

    doc.text(`Page ${i} of ${pageCount}`, 180, 290);

    doc.setTextColor(...primaryBlue);
    doc.text("UniPay • Secure Campus Payments", 14, 290);
  }

  // =========================
  // SAVE
  // =========================
  doc.save(`unipay-transactions-${linkId}.pdf`);
};
