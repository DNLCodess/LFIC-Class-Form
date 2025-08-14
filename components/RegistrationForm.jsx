"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Laptop,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

export default function RegistrationForm({ onComplete, setIsLoading }) {
  const [attestationChecked, setAttestationChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
  } = useForm();

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.surname) newErrors.surname = "Surname is required";
    if (!data.firstname) newErrors.firstname = "First name is required";
    if (!data.email) newErrors.email = "Email is required";
    if (!data.phone) newErrors.phone = "Phone number is required";
    if (!data.dob) newErrors.dob = "Date of birth is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.address) newErrors.address = "Address is required";
    if (!attestationChecked)
      newErrors.attestation = "You must agree to the attestation";

    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      data.phone &&
      !/^\+?[0-9]{10,15}$/.test(data.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    return newErrors;
  };

  const onSubmit = async (data) => {
    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate form processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const formData = {
        ...data,
        attestationAccepted: attestationChecked,
        submissionDate: new Date().toISOString(),
      };

      onComplete(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: "There was an error submitting your form. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
        <div className="mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-2xl flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="LFIC Logo"
            width={96} // adjust logo width here
            height={96} // adjust logo height here
            className="rounded-xl object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-gradient mb-4">
          Lanky First Ideal Creativity
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Graphic Design Class Registration
        </p>
        <p className="text-gray-500">
          Join our comprehensive Telegram-based graphic design course
        </p>
      </motion.div>

      {/* Registration Form */}
      <motion.div variants={itemVariants} className="card p-8 md:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="w-6 h-6 mr-3 text-emerald-500" />
              Personal Information
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surname *
                </label>
                <input
                  {...register("surname")}
                  type="text"
                  className={`form-field ${
                    errors.surname ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your surname"
                />
                {errors.surname && (
                  <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  {...register("middlename")}
                  type="text"
                  className="form-field"
                  placeholder="Enter your middle name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  {...register("firstname")}
                  type="text"
                  className={`form-field ${
                    errors.firstname ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstname}
                  </p>
                )}
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                  Date of Birth *
                </label>
                <input
                  {...register("dob")}
                  type="date"
                  className={`form-field ${errors.dob ? "border-red-500" : ""}`}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  {...register("gender")}
                  className={`form-field ${
                    errors.gender ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Mail className="w-6 h-6 mr-3 text-orange-500" />
              Contact Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-orange-500" />
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={`form-field ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-orange-500" />
                  Phone Number *
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  className={`form-field ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="+234 xxx xxx xxxx"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                Address *
              </label>
              <textarea
                {...register("address")}
                rows={3}
                className={`form-field resize-none ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="Enter your full address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </motion.div>
          </div>

          {/* Technical Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Laptop className="w-6 h-6 mr-3 text-emerald-500" />
              Technical Information
            </h2>

            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you have computing knowledge? *
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("computingKnowledge")}
                      type="radio"
                      value="yes"
                      className="w-4 h-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("computingKnowledge")}
                      type="radio"
                      value="no"
                      className="w-4 h-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you have a Computer/Laptop? *
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("hasComputer")}
                      type="radio"
                      value="yes"
                      className="w-4 h-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("hasComputer")}
                      type="radio"
                      value="no"
                      className="w-4 h-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Smartphone className="w-4 h-4 mr-2 text-emerald-500" />
                  Will you be using phone for the class? *
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("usingPhone")}
                      type="radio"
                      value="yes"
                      className="w-4 h-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("usingPhone")}
                      type="radio"
                      value="no"
                      className="w-4 h-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Attestation */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-50 p-6 rounded-xl border-l-4 border-emerald-500"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Attestation
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              I hereby confirm that all details provided above are correct and I
              promise to comply with the rules and regulations set to guide me
              throughout my learning process.
            </p>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="attestation"
                checked={attestationChecked}
                onChange={(e) => setAttestationChecked(e.target.checked)}
                className="w-5 h-5 text-emerald-500 border-2 border-gray-300 rounded focus:ring-emerald-500 mt-1"
              />
              <label
                htmlFor="attestation"
                className="text-gray-700 cursor-pointer"
              >
                I agree to the above attestation and terms *
              </label>
            </div>
            {errors.attestation && (
              <p className="text-red-500 text-sm mt-2">{errors.attestation}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="text-center pt-6">
            {errors.submit && (
              <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
            )}
            <button
              type="submit"
              className="btn-primary text-lg"
              disabled={!attestationChecked}
            >
              Proceed to Payment
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Course Fee: ₦3,000 • Secure Payment via Flutterwave
            </p>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}
