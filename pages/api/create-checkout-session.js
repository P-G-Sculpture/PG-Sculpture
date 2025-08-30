import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
import products from "../../data/products.json";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(400).json({ error: "Produit introuvable" });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: product.name, description: product.description },
          unit_amount: Math.round(product.priceEUR * 100),
        },
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur création session" });
  }
}