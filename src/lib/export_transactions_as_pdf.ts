import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function downloadGroupedTransactionsAsPDF(transactions: transactionType[], filename = 'grouped-transactions.pdf') {
   const doc = new jsPDF();

   const grouped = groupBy(transactions, 'userId');

   const userIds = Object.keys(grouped);

   userIds.forEach((userId, index) => {
      const userTransactions = grouped[userId];
      const username = userTransactions[0].username;

      if (index > 0) doc.addPage();

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Transactions for ${username}`, 14, 15);

      const tableData = userTransactions.map(tx => [
         tx.amount,
         tx.blockchain,
         tx.type,
         tx.status,
         tx.walletAddress || '-',
         tx.description || '-',
         new Date(tx.createdAt).toLocaleString(),
      ]);

      autoTable(doc, {
         startY: 20,
         head: [[
            'Amount',
            'Blockchain',
            'Type',
            'Status',
            'Wallet Address',
            'Description',
            'Created At',
         ]],
         body: tableData,
         styles: { fontSize: 8 },
         headStyles: { fillColor: [52, 152, 219] },
      });
   });

   doc.save(filename);
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
   return arr.reduce((acc, item) => {
      const groupKey = item[key] as string;
      acc[groupKey] = acc[groupKey] || [];
      acc[groupKey].push(item);
      return acc;
   }, {} as Record<string, T[]>);
}


const downloadFile = (data: any, fileName: string = "Transaction.json") => {
   const jsonStr = JSON.stringify(data, null, 2); // pretty-print with indentation
   const blob = new Blob([jsonStr], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   return url
}