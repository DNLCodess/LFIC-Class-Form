'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Users, Calendar, BookOpen, MessageCircle } from 'lucide-react';

export default function ConfirmationPage({ userData, paymentData }) {
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_GROUP_LINK || 'https://t.me/your_group_link';

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto text-center"
    >
      {/* Success Header */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gradient mb-4">
          Welcome Aboard! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Your payment has been confirmed successfully
        </p>
        <p className="text-gray-500">
          Welcome to Lanky First Ideal Creativity Graphic Design Class
        </p>
      </motion.div>

      {/* Payment Details */}
      <motion.div variants={itemVariants} className="card p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Confirmation</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div>
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">
              {paymentData.transactionId}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Amount Paid</p>
            <p className="font-bold text-2xl text-emerald-600">₦3,000</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment Status</p>
            <div className="flex items-center mt-1">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-green-600 font-medium">Successful</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment Date</p>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Telegram Access */}
      <motion.div variants={itemVariants} className="card p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <div className="flex items-center justify-center mb-6">
          <MessageCircle className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-semibold text-blue-800">Join Our Telegram Group</h2>
        </div>
        
        <p className="text-blue-700 mb-6 leading-relaxed">
          Your exclusive access to the Graphic Design Class community is ready! 
          Click the button below to join our Telegram group where you'll receive:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
          <div className="flex items-center">
            <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-blue-800">Daily design lessons</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-blue-800">Peer collaboration</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-blue-800">Live sessions schedule</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-blue-800">Assignment feedback</span>
          </div>
        </div>
        
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="w-5 h-5 mr-3" />
          Join Telegram Group Now
        </a>
      </motion.div>

      {/* Course Information */}
      <motion.div variants={itemVariants} className="card p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Information</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-semibold mb-2">Duration</h3>
            <p className="text-gray-600">8 weeks comprehensive training</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Curriculum</h3>
            <p className="text-gray-600">From basics to advanced techniques</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Interactive learning environment</p>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div variants={itemVariants} className="card p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">What's Next?</h2>
        
        <div className="space-y-4 text-left">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center mr-4 mt-1">
              <span className="text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Join the Telegram Group</h3>
              <p className="text-gray-600">Click the link above to access our community</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mr-4 mt-1">
              <span className="text-sm font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Introduce Yourself</h3>
              <p className="text-gray-600">Share your background and design goals with the group</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 mt-1">
              <span className="text-sm font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Start Learning</h3>
              <p className="text-gray-600">Begin your graphic design journey with our first lesson</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 font-medium text-center">
            📧 Check your email for additional course materials and welcome information
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}