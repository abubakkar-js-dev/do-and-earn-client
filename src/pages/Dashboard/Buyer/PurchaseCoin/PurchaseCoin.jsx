import { useState } from "react";
import { Card, Button, } from "antd"; 
import { FaCoins } from "react-icons/fa"; 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_publish_key);

const coinPackages = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleBuyNowClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleCancel = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <Helmet>
        <title>Purchase Coin | Buyer | Dashboard | Do&Earn</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Purchase Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinPackages.map((pkg, index) => (
          <Card
            key={index}
            className="shadow-md border rounded-lg hover:shadow-xl transition duration-300"
            title={
              <div className="flex items-center justify-center gap-2">
                <FaCoins className="text-yellow-500 text-2xl" />
                <span className="text-xl font-semibold">{pkg.coins} Coins</span>
              </div>
            }
          >
            <div className="text-center mb-4">
              <p className="text-lg">
                <span className="font-bold">${pkg.price}</span> USD
              </p>
            </div>
            <Button
              type="primary"
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={() => handleBuyNowClick(pkg)}
            >
              Buy Now
            </Button>
          </Card>
        ))}
      </div>

      {/* Payment Form */}
      {selectedPackage && (
        <div className="mt-6 w-full max-w-md p-4 border shadow-md rounded-md bg-white">
          <h2 className="text-xl font-bold text-center mb-4">
            Payment for {selectedPackage.coins} Coins - ${selectedPackage.price}
          </h2>
          <Elements stripe={stripePromise}>
            <PaymentForm
              selectedPackage={selectedPackage}
              onCancel={handleCancel}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};


export default PurchaseCoin;
