import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const exportTransactionsPDF = (transactions, linkId) => {
  const doc = new jsPDF();

  // ========================
  // FILTER BY LINK
  // ========================

  const filteredTransactions = transactions.filter(
    (tx) => tx.linkId === linkId,
  );

  // ========================
  // HEADER
  // ========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("UNIPAY", 14, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Transaction Report - ${linkId}`, 14, 28);

  doc.line(14, 32, 196, 32);

  // ========================
  // META DATA
  // ========================

  const totalRevenue = filteredTransactions.reduce(
    (sum, tx) => sum + tx.amountPaid,
    0,
  );

  let y = 40;

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, y);
  y += 6;

  doc.text(`Total Transactions: ${filteredTransactions.length}`, 14, y);
  y += 6;

  doc.text(`Total Revenue: ₦${totalRevenue.toLocaleString()}`, 14, y);

  y += 10;

  // ========================
  // TABLE
  // ========================

  autoTable(doc, {
    startY: y,
    head: [["Full Name", "Matric No", "Amount Paid", "Status", "Date Paid"]],
    body: filteredTransactions.map((tx) => [
      tx.fullName,
      tx.matricNo,
      `₦${tx.amountPaid.toLocaleString()}`,
      tx.status,
      new Date(tx.datePaid).toLocaleDateString(),
    ]),
    styles: {
      fontSize: 8,
    },
    headStyles: {
      fillColor: [33, 150, 243],
    },
  });

  // ========================
  // FOOTER (PAGE NUMBERS)
  // ========================

  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, 180, 290);
  }

  doc.save(`transactions-${linkId}.pdf`);
};
