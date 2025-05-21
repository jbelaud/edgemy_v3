'use client'

interface ExportButtonProps {
  waitlist: {
    email: string;
    lastName: string;
    firstName: string;
    createdAt: Date;
  }[];
}

export function ExportButton({ waitlist }: ExportButtonProps) {
  const handleExport = () => {
    const csvHeader = 'Email,Nom,Prénom,Date\n';
    const csvData = waitlist.map(entry => {
      return `${entry.email},"${entry.lastName || ''}","${entry.firstName || ''}","${entry.createdAt}"`;
    }).join('\n');
    
    const csvContent = csvHeader + csvData;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `waitlist_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Exporter en CSV
    </button>
  );
} 