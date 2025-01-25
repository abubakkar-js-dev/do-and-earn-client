import { useState } from "react";
import { Input, Select, Button, Form, message } from "antd";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUserData from "../../../../hooks/useUserData";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const Withdrawals = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const axiosSecure = useAxiosSecure();
  const [form] = Form.useForm();

  const [withdrawCoins, setWithdrawCoins] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const handleCoinChange = (value) => {
    // Calculate withdrawal amount in dollars
    setWithdrawCoins(value);
    setWithdrawAmount(value / 20);
  };

  const handleSubmit = async (values) => {
    const withdrawalData = {
      worker_email: user?.email,
      worker_name: userData.name,
      withdrawal_coin: withdrawCoins,
      withdrawal_amount: withdrawAmount,
      payment_system: values.paymentSystem,
    //   account_number: values.accountNumber,
      withdraw_date: moment().toISOString(),
      status: "pending",
    };

    try {
      const response = await axiosSecure.post("/withdrawals", withdrawalData);
      if (response.data.insertedId) {
        form.resetFields();
        message.success("Withdrawal request submitted successfully!");
      } else {
        message.error("Failed to submit withdrawal request.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while processing your request.");
    }
  };

  // check sufficientcoins
  const hasSufficientCoins = userData.availableCoin >= 200;

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <Helmet>
              <title>Withdrawals | Worker | Dashboard | Do&Earn</title>
            </Helmet>
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Withdrawals</h2>

      {/* User Earnings */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">User Total Earnings</h2>
        <p className="text-lg">
          <strong>Available Coins:</strong> {userData.availableCoin}
        </p>
        <p className="text-lg">
          <strong>Equivalent Dollars:</strong> $
          {(userData.availableCoin / 20).toFixed(2)}
        </p>
      </div>

      {/* Withdrawal Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Withdrawal Form</h2>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Coins to Withdraw */}
          <Form.Item
            label="Coins to Withdraw"
            name="coinsToWithdraw"
            rules={[
              {
                required: true,
                message: "Please enter the number of coins to withdraw!",
              },
              {
                validator: (_, value) =>
                  value > userData.availableCoin
                    ? Promise.reject("Cannot exceed available coins!")
                    : Promise.resolve(),
              },
            ]}
          >
            <Input
              type="number"
              min={0}
              max={userData.availableCoin}
              onChange={(e) => handleCoinChange(Number(e.target.value))}
            />
          </Form.Item>

          {/* Withdrawal Amount */}
          <Form.Item label="Withdrawal Amount ($)">
            <Input value={withdrawAmount.toFixed(2)} disabled />
          </Form.Item>

          {/* Payment System */}
          <Form.Item
            label="Select Payment System"
            name="paymentSystem"
            rules={[
              { required: true, message: "Please select a payment system!" },
            ]}
          >
            <Select placeholder="Choose a payment method">
              <Select.Option value="Bkash">Bkash</Select.Option>
              <Select.Option value="Rocket">Rocket</Select.Option>
              <Select.Option value="Nagad">Nagad</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
            </Select>
          </Form.Item>

          {/* Account Number */}
          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[
              {
                required: true,
                message: "Please provide your account number!",
              },
            ]}
          >
            <Input placeholder="Enter your account number" />
          </Form.Item>

          {/* Submit Button */}
          {hasSufficientCoins ? (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!hasSufficientCoins}
              >
                Submit Withdrawal
              </Button>
            </Form.Item>
          ) : (
            <p className="text-red-500 font-semibold text-lg">
              Insufficient coins for withdrawal
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Withdrawals;
