import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PLANS: Record<string, { name: string; priceInCents: number }> = {
  starter: { name: "ChatBoost AI – Starter Setup", priceInCents: 39900 },
  pro: { name: "ChatBoost AI – Pro Setup", priceInCents: 79900 },
  premium: { name: "ChatBoost AI – Premium Setup", priceInCents: 149900 },
};

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secretKey);

  try {
    const body = await request.json();
    const { plan, locale } = body as { plan: string; locale: string };

    const planConfig = PLANS[plan];
    if (!planConfig) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const loc = locale === "en" ? "en" : "de";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: planConfig.name,
              description:
                loc === "de"
                  ? `Einmalige Setup-Gebühr für das ${plan.charAt(0).toUpperCase() + plan.slice(1)}-Paket`
                  : `One-time setup fee for the ${plan.charAt(0).toUpperCase() + plan.slice(1)} package`,
            },
            unit_amount: planConfig.priceInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/${loc}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/${loc}/checkout/cancel`,
      locale: loc === "de" ? "de" : "en",
      metadata: {
        plan,
        locale: loc,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
