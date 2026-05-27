import { BookingData } from '@/components/BookingForm';
import Button from '@/components/Button';
import { Card, CardAction } from '@/components/ui/card';
import { CheckCircle2, Download, Printer } from 'lucide-react';
import React, { Dispatch } from 'react'

interface ConfirmationModalProps {
    form: BookingData;
    setSubmitted: Dispatch<React.SetStateAction<boolean>>;
    setForm: React.Dispatch<React.SetStateAction<BookingData>>;
}

const ConfirmationModal = ({ form, setForm, setSubmitted }: ConfirmationModalProps) => {
  
  const handleDownloadReceipt = () => {
    // Create a hidden div with the receipt content
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Booking Receipt - ${form.referenceNumber}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f9fafb;
          }
          .receipt {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: #f97316;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 30px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #111827;
          }
          .reference {
            background: #f3f4f6;
            padding: 12px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 16px;
            text-align: center;
            margin-bottom: 20px;
          }
          .details {
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
            padding: 20px 0;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
          }
          .detail-label {
            font-weight: 600;
            color: #4b5563;
          }
          .detail-value {
            color: #111827;
          }
          .footer {
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          .button {
            text-align: center;
            margin-top: 20px;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h2>Step Dance Studio</h2>
            <p>Booking Confirmation</p>
          </div>
          <div class="content">
            <div class="title">✓ Booking Confirmed!</div>
            <div class="reference">
              Reference: ${form.referenceNumber}
            </div>
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Full Name:</span>
                <span class="detail-value">${form.fullName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${form.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${form.phone}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Schedule ID:</span>
                <span class="detail-value">${form.scheduleId || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Booking Date:</span>
                <span class="detail-value">${new Date().toLocaleString()}</span>
              </div>
            </div>
            <div class="footer">
              <p>Thank you for choosing Step Dance Studio!</p>
              <p>Please present this receipt at the studio.</p>
            </div>
          </div>
        </div>
        <div class="no-print button">
          <button onclick="window.print()" style="background: #f97316; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; margin: 10px;">
            🖨️ Print Receipt
          </button>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-receipt-${form.referenceNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintReceipt = () => {
    // Open print window with receipt content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print your receipt');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Booking Receipt - ${form.referenceNumber}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          .receipt {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: #f97316;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 30px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #111827;
          }
          .reference {
            background: #f3f4f6;
            padding: 12px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 16px;
            text-align: center;
            margin-bottom: 20px;
          }
          .details {
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
            padding: 20px 0;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
          }
          .detail-label {
            font-weight: 600;
            color: #4b5563;
          }
          .detail-value {
            color: #111827;
          }
          .footer {
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h2>Step Dance Studio</h2>
            <p>Booking Confirmation</p>
          </div>
          <div class="content">
            <div class="title">✓ Booking Confirmed!</div>
            <div class="reference">
              Reference: ${form.referenceNumber}
            </div>
            <div class="details">
              <div class="detail-row">
                <span class="detail-label">Full Name:</span>
                <span class="detail-value">${form.fullName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${form.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${form.phone}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Schedule ID:</span>
                <span class="detail-value">${form.scheduleId || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Booking Date:</span>
                <span class="detail-value">${new Date().toLocaleString()}</span>
              </div>
            </div>
            <div class="footer">
              <p>Thank you for choosing Step Dance Studio!</p>
              <p>Please present this receipt at the studio.</p>
            </div>
          </div>
        </div>
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <CardAction className="max-w-lg mx-auto shadow-lg border-0 bg-white rounded-sm p-4">
      <div className="pt-10 pb-10 text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Booking Confirmed!
        </h2>
        <p className="text-muted-foreground">
          Thank you,{" "}
          <span className="font-semibold text-foreground">
            {form.fullName}
          </span>
          . Your session is booked 
        </p>
        <p className="text-sm text-muted-foreground">
          Reference #:{" "}
          <span className="font-mono font-semibold text-foreground">
            {form.referenceNumber}
          </span>
        </p>
        
        {/* Action Buttons for Receipt */}
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={handleDownloadReceipt}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
          <button
            onClick={handlePrintReceipt}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Receipt
          </button>
        </div>

        <Button
          onClick={() => {
            setSubmitted(false);
            setForm({
              fullName: "",
              email: "",
              phone: "",
              userId: null,
              scheduleId: null,
              referenceNumber: '',
              proofOfPaymentUrl: '',
            });
          }}
          className="mt-4"
        >
          Book Another Session
        </Button>
      </div>
    </CardAction>
  )
}

export default ConfirmationModal