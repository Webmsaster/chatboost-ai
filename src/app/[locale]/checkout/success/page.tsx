import { redirect } from "next/navigation";
import Stripe from "stripe";
import SuccessContent from "./SuccessContent";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
  params: Promise<{ locale: string }>;
};

export default async function CheckoutSuccessPage({ searchParams, params }: Props) {
  const { session_id } = await searchParams;
  const { locale } = await params;

  if (!session_id) {
    redirect(`/${locale}`);
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  let plan = "";
  let amount = 0;

  if (secretKey) {
    try {
      const stripe = new Stripe(secretKey);
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (session.payment_status !== "paid") {
        redirect(`/${locale}`);
      }

      plan = session.metadata?.plan || "";
      amount = session.amount_total || 0;
    } catch {
      redirect(`/${locale}`);
    }
  }

  return <SuccessContent plan={plan} amount={amount} />;
}
