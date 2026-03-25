import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getDb } from "@/db/client";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secretKey);
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sql = getDb();

    try {
      const customerEmail = session.customer_details?.email || session.customer_email || "";
      const customerName = session.customer_details?.name || "";
      const plan = session.metadata?.plan || "unknown";
      const amount = session.amount_total || 0;

      await sql`
        INSERT INTO orders (stripe_session_id, stripe_payment_intent, plan, amount, currency, status, customer_email, customer_name)
        VALUES (${session.id}, ${typeof session.payment_intent === "string" ? session.payment_intent : ""}, ${plan}, ${amount}, ${session.currency || "eur"}, 'completed', ${customerEmail}, ${customerName})
        ON CONFLICT (stripe_session_id) DO NOTHING
      `;

      if (customerEmail) {
        await sql`
          INSERT INTO customers (email, name, stripe_customer_id)
          VALUES (${customerEmail}, ${customerName}, ${typeof session.customer === "string" ? session.customer : ""})
          ON CONFLICT (email) DO UPDATE SET
            name = COALESCE(NULLIF(EXCLUDED.name, ''), customers.name),
            stripe_customer_id = COALESCE(NULLIF(EXCLUDED.stripe_customer_id, ''), customers.stripe_customer_id)
        `;

        try {
          await sendOrderConfirmation({ email: customerEmail, plan, amount });
        } catch (emailErr) {
          console.error("Failed to send order confirmation email:", emailErr);
        }
      }
    } catch (dbErr) {
      console.error("Failed to save order to database:", dbErr);
    }
  }

  return NextResponse.json({ received: true });
}
