import products from "../data/products.json";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {

  const handleBuy = async (product) => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });
    const { url } = await res.json();
    window.location = url;
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">P.G Sculpture</h1>
        <div className="mt-4 md:mt-0">Contact: 07 81 63 25 41 — <a href="mailto:wilstonguir@gmail.com" className="text-blue-600">wilstonguir@gmail.com</a></div>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6">Nos sculptures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border rounded-lg overflow-hidden shadow-lg">
              <img src={p.image} alt={p.name} className="w-full h-56 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-gray-600 my-2">{p.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <strong>{p.priceEUR}€</strong>
                  <button onClick={() => handleBuy(p)} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Acheter</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">À propos</h2>
        <p>Bienvenue chez <strong>P.G Sculpture</strong> ! Atelier familial où chaque sculpture en bois est unique, faite à la main par mon papi. Loups, corbeaux, requins et bien plus.</p>
      </section>
    </main>
  );
}
