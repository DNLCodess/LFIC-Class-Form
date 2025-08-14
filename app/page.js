"use client";

import ConfirmationPage from "../components/ConfirmationPage";
import LoadingSpinner from "../components/LoadingSpinner";
import PaymentPage from "../components/PaymentPage";
import RegistrationForm from "../components/RegistrationForm";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState("registration");
  const [userData, setUserData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrationComplete = (data) => {
    setUserData(data);
    setCurrentStep("payment");
  };

  const handlePaymentComplete = (data) => {
    setPaymentData(data);
    setCurrentStep("confirmation");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "registration":
        return (
          <RegistrationForm
            onComplete={handleRegistrationComplete}
            setIsLoading={setIsLoading}
          />
        );
      case "payment":
        return (
          <PaymentPage
            userData={userData}
            onComplete={handlePaymentComplete}
            setIsLoading={setIsLoading}
          />
        );
      case "confirmation":
        return (
          <ConfirmationPage userData={userData} paymentData={paymentData} />
        );
      default:
        return <RegistrationForm onComplete={handleRegistrationComplete} />;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {renderCurrentStep()}
      </motion.div>
    </div>
  );
}
