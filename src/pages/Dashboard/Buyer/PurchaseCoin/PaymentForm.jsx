import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {  useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useUserData from "../../../../hooks/useUserData";

const PaymentForm = ({ selectedPackage, onCancel }) => {
    // console.log(selectedPackage)
    const axiosSecure = useAxiosSecure();
    const [clientSecret,setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {user} = useAuth();
    const {userData,refetch: refetchUserData} = useUserData();

    useEffect(()=>{
        if(selectedPackage.price > 0){
            axiosSecure.post('/create-payment-intent',{price: selectedPackage.price})
            .then(res=>{
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
        }
    },[axiosSecure, selectedPackage.price])
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      setProcessing(true);
      setError(null);
  
      const card = elements.getElement(CardElement);
      
      if(card === null){
        return;
      }

      const {error,paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      })

      if(error){
        console.log('Payment Error',error);
        setError(error.message);
      }else{
        console.log('Payment method',paymentMethod);
        setError('');
      }
  
      try {
        // Create payment method
        const {paymentIntent,error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || 'anonymous',
              name: user?.displayName || 'anonymous',
            }
          }
        })
  
        if (confirmError) {
          setError(confirmError.message);
          setProcessing(false);
        }else{
          if (paymentIntent.status === 'succeeded') {
            // console.log(paymentIntent.id, 'TransId');
          
            const payment = {
              transactionId: paymentIntent.id, 
              price: selectedPackage.price,
              coin: selectedPackage.coins,
              email: user?.email,
              name: user?.displayName || 'anonymous',
              date: new Date().toISOString(), 
            };
          
            try {
              const paymentRes = await axiosSecure.post('/payments', payment);
              if (paymentRes.data.insertedId) {
                const totatCoin = {
                  availableCoin: userData.availableCoin + selectedPackage.coins,
                };
                // console.log(userData.availableCoin)
                // console.log(selectedPackage.coins);
                // console.log(totatCoin);
                const coinUpdateRes = await axiosSecure.patch(`/users?email=${user?.email}`, totatCoin);
                if (coinUpdateRes.data.modifiedCount > 0) {
                  message.success("Payment successful!");
                  refetchUserData();
                  navigate('/dashboard/payment-history')
                } else {
                  message.error("Failed to update coins.");
                }
              } else {
                message.error("Failed to save payment data.");
              }
            } catch (error) {
              console.error("Error:", error);
              message.error("Something went wrong. Please try again later.");
            }
          } else {
            message.error("Payment failed. Please try again.");
          }
          
        }
  
       
  
        setProcessing(false);
        onCancel(); 
      } catch (error) {
        console.log(error);
        setError("An error occurred during the payment process.");
        setProcessing(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <CardElement className="mb-4 p-2 border rounded-md" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-4 mt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500 hover:bg-blue-600 w-full"
            disabled={processing}
          >
            {processing ? "Processing..." : "Pay Now"}
          </Button>
          <Button
            type="default"
            className="w-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  PaymentForm.propTypes={
    selectedPackage: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

export default PaymentForm;