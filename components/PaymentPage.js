"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {
  CreditCard,
  Shield,
  CheckCircle,
  User,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function PaymentPage({ userData, onComplete, setIsLoading }) {
  const [paymentConfig, setPaymentConfig] = useState(null);
  const [error, setError] = useState(null);

  // Function to sanitize customer data
  const sanitizeCustomerData = (data) => {
    return {
      email: data.email || "",
      phone_number: data.phone || "",
      name: `${data.firstname || ""} ${data.surname || ""}`.trim(),
      id: data.id ? data.id.toString().replace(/\./g, "_") : undefined,
    };
  };

  useEffect(() => {
    // Initialize Flutterwave configuration with sanitized data
    const config = {
      public_key:
        process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ||
        "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
      tx_ref: Date.now().toString(),
      amount: 3000,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: sanitizeCustomerData(userData),
      customizations: {
        title: "Lanky First Ideal Creativity",
        description: "Graphic Design Class Payment",
        logo: "https://your-logo-url.com/logo.png",
      },
      meta: {
        __disableProblematicEventTracking: true,
      },
    };
    setPaymentConfig(config);
  }, [userData]);

  const handleFlutterPayment = useFlutterwave(paymentConfig || {});

  const storeUserData = async (data) => {
    try {
      const response = await fetch("/api/store-user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to store user data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error storing user data:", error);
      throw error;
    }
  };

  const handlePayment = () => {
    setError(null);

    if (!paymentConfig) {
      setError("Payment configuration is missing. Please try again.");
      return;
    }

    if (!navigator.onLine) {
      setError(
        "No internet connection. Please check your network and try again."
      );
      return;
    }

    handleFlutterPayment({
      callback: async (response) => {
        closePaymentModal();

        // Sanitize the response data
        const sanitizedResponse = {
          ...response,
          customer: response.customer
            ? sanitizeCustomerData(response.customer)
            : undefined,
        };

        // Handle both "successful" and "completed" statuses
        if (
          sanitizedResponse.status === "successful" ||
          sanitizedResponse.status === "completed"
        ) {
          setIsLoading(true);
          toast.success("Payment successful! Processing...");

          try {
            await storeUserData({
              ...userData,
              paymentReference: sanitizedResponse.tx_ref,
              paymentStatus: "completed",
              paymentDate: new Date().toISOString(),
              transactionId: sanitizedResponse.transaction_id,
            });

            toast.success("Registration confirmed!");
            onComplete({
              transactionId: sanitizedResponse.transaction_id,
              reference: sanitizedResponse.tx_ref,
              status: sanitizedResponse.status,
            });
          } catch (error) {
            console.error("Error storing user data:", error);
            toast.error(
              "Payment successful but registration failed. Please contact support."
            );
          } finally {
            setIsLoading(false);
          }
        } else {
          const message = `Payment not completed. Status: ${sanitizedResponse.status}`;
          setError(message);
          toast.error(message);
        }
      },
      onClose: () => {
        toast("Payment was not completed", { icon: "ℹ️" });
      },
      onError: (error) => {
        console.error("Flutterwave error:", error);
        setError(`Payment error: ${error.message}`);
        toast.error(`Payment error: ${error.message}`);
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-2xl flex items-center justify-center">
          <CreditCard className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gradient mb-4">
          Complete Your Payment
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Secure your spot in the graphic design class
        </p>
        <p className="text-gray-500">
          Final step to join our Telegram community
        </p>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          variants={itemVariants}
          className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start"
        >
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800">Payment Error</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Summary */}
        <motion.div variants={itemVariants} className="card p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-emerald-500" />
            Registration Summary
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">
                  {userData.firstname} {userData.middlename} {userData.surname}
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-orange-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Course Fee</span>
              <span className="text-xl font-bold text-gray-800">₦3,000</span>
            </div>
            <p className="text-sm text-gray-500">
              One-time payment • No hidden fees
            </p>
          </div>
        </motion.div>

        {/* Payment Options */}
        <motion.div variants={itemVariants} className="card p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <CreditCard className="w-6 h-6 mr-3 text-orange-500" />
            Payment Options
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-8 bg-blue-600 rounded mr-4 flex items-center justify-center">
                <span className="text-white text-xs font-bold">CARD</span>
              </div>
              <div>
                <p className="font-medium">Debit/Credit Card</p>
                <p className="text-sm text-gray-500">Visa, Mastercard, Verve</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-8 bg-green-600 rounded mr-4 flex items-center justify-center">
                <span className="text-white text-xs font-bold">USSD</span>
              </div>
              <div>
                <p className="font-medium">Bank Transfer (USSD)</p>
                <p className="text-sm text-gray-500">All Nigerian banks</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-8 bg-purple-600 rounded mr-4 flex items-center justify-center">
                <span className="text-white text-xs font-bold">MOBILE</span>
              </div>
              <div>
                <p className="font-medium">Mobile Money</p>
                <p className="text-sm text-gray-500">
                  MTN, Airtel, Glo, 9mobile
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium text-blue-800">Secure Payment</span>
            </div>
            <p className="text-sm text-blue-700">
              Your payment is processed securely by Flutterwave. We don't store
              your card details.
            </p>
          </div>

          <button
            onClick={handlePayment}
            className="w-full btn-primary text-lg"
            disabled={!paymentConfig}
          >
            Pay ₦3,000 Now
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By clicking "Pay Now", you agree to our terms and conditions
          </p>
        </motion.div>
      </div>

      {/* What Happens Next */}
      <motion.div variants={itemVariants} className="card p-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          What happens after payment?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold mb-2">Payment Confirmed</h3>
            <p className="text-sm text-gray-600">
              Your registration is instantly activated
            </p>
          </div>

          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Email Confirmation</h3>
            <p className="text-sm text-gray-600">Receive confirmation</p>
          </div>

          <div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Join Telegram</h3>
            <p className="text-sm text-gray-600">
              Get instant access to the class group
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
