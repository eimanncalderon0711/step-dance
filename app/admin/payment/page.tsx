import { getPaymentOptions } from "@/actions/payment";
import PaymentClient from "@/app/admin/payment/PaymentClient";

export default async function PaymentPage() {
  const payments = await getPaymentOptions();

  return <PaymentClient payments={payments} />;
}