import { Card, Button } from "antd";
import { FaCoins } from "react-icons/fa";

const coinPackages = [
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
  { coins: 10, price: 1 },
];

const PurchaseCoin = () => {
  const handlePurchase = (coins, price) => {
    // Redirect to payment page or handle purchase click
    console.log(`Redirecting to payment for ${coins} coins at $${price}`);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Purchase Coins
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coinPackages.map((pkg, index) => (
          <Card
            key={index}
            className="shadow-md border rounded-lg hover:shadow-xl transition duration-300"
            title={
              <div className="flex items-center justify-center gap-2">
                <FaCoins className="text-yellow-500 text-2xl" />
                <span className="text-xl font-semibold">
                  {pkg.coins} Coins
                </span>
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
              onClick={() => handlePurchase(pkg.coins, pkg.price)}
            >
              Buy Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
