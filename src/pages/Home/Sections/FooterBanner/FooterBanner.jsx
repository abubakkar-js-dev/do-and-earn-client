import { motion } from 'framer-motion';
import footerBanner from '../../../../assets/images/footerBanner.webp'

const FooterBanner = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ 
          backgroundImage: `url(${footerBanner})`
        }}
      />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Left Content */}
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white text-3xl md:text-4xl font-bold mb-4"
            >
              Earn Extra Income Today
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-300 text-lg max-w-xl"
            >
              Complete simple tasks and get paid instantly. Join thousands of users making money in their spare time.
            </motion.p>
          </div>
          

        </div>
        
        {/* Stats Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-700"
        >
          <div className="text-center">
            <p className="text-white font-bold text-2xl md:text-3xl">10,000+</p>
            <p className="text-gray-400 text-sm md:text-base">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-2xl md:text-3xl">$250,000+</p>
            <p className="text-gray-400 text-sm md:text-base">Paid Out</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-2xl md:text-3xl">4.8/5</p>
            <p className="text-gray-400 text-sm md:text-base">User Rating</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FooterBanner;