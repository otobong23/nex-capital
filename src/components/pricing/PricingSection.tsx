// import { motion } from "framer-motion";
// import { Check } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { CardSpotlight } from "./CardSpotlight";
// import { useNavigate } from "react-router-dom";

// const PricingTier = ({
//   name,
//   price,
//   description,
//   features,
//   isPopular,
// }: {
//   name: string;
//   price: string;
//   description: string;
//   features: string[];
//   isPopular?: boolean;
// }) => {
//   const navigate = useNavigate()
//   return (
//   <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
//     <div className="relative h-full p-6 flex flex-col">
//       {isPopular && (
//         <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
//           Most Popular
//         </span>
//       )}
//       <h3 className="text-xl font-medium mb-2">{name}</h3>
//       <div className="mb-4">
//         <span className="text-4xl font-bold">{price}</span>
//         {price !== "Custom" && <span className="text-gray-400">/month</span>}
//       </div>
//       <p className="text-gray-400 mb-6">{description}</p>
//       <ul className="space-y-3 mb-8 flex-grow">
//         {features.map((feature, index) => (
//           <li key={index} className="flex items-center gap-2">
//             <Check className="w-5 h-5 text-primary" />
//             <span className="text-sm text-gray-300">{feature}</span>
//           </li>
//         ))}
//       </ul>
//       <Button onClick={() => navigate('/dashboard', { replace: false })} className="button-gradient w-full">
//         Start Trading
//       </Button>
//     </div>
//   </CardSpotlight>
// )}

// export const PricingSection = () => {
//   return (
//     <section className="container px-4 py-24">
//       <div className="max-w-2xl mx-auto text-center mb-12">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-5xl md:text-6xl font-normal mb-6"
//         >
//           Choose Your{" "}
//           <span className="text-gradient font-medium">Trading Plan</span>
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1, duration: 0.5 }}
//           className="text-lg text-gray-400"
//         >
//           Select the perfect trading plan with advanced features and competitive fees
//         </motion.p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
//         <PricingTier
//           name="Starter Plan"
//           price="$500"
//           description="Begin your trading journey with our starter package"
//           features={[
//             "Basic trading tools",
//             "Market analysis",
//             "Email support",
//             "Mobile app access"
//           ]}
//         />
//         <PricingTier
//           name="Growth Plan"
//           price="$1,000"
//           description="Enhanced features for growing traders"
//           features={[
//             "Advanced charting",
//             "Risk management tools",
//             "Priority support",
//             "API access",
//             "Trading signals"
//           ]}
//         />
//         <PricingTier
//           name="Pro Plan"
//           price="$5,000"
//           description="Professional trading with premium features"
//           features={[
//             "Professional tools",
//             "Advanced analytics",
//             "Dedicated support",
//             "Custom indicators",
//             "Portfolio management",
//             "Live market data"
//           ]}
//           isPopular
//         />
//         <PricingTier
//           name="Elite Plan"
//           price="$10,000"
//           description="Elite trading experience with exclusive tools"
//           features={[
//             "Elite trading suite",
//             "Personal advisor",
//             "VIP support",
//             "Custom strategies",
//             "Advanced automation",
//             "Institutional tools"
//           ]}
//         />
//         <PricingTier
//           name="Premier Plan"
//           price="$200,000"
//           description="Ultimate trading package for high-volume traders"
//           features={[
//             "Unlimited trading volume",
//             "White-glove service",
//             "24/7 dedicated support",
//             "Custom infrastructure",
//             "Institutional pricing",
//             "Direct market access"
//           ]}
//         />
//       </div>
//     </section>
//   );
// };

import { motion } from "framer-motion";
import { Check, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";
import { useNavigate } from "react-router-dom";

const PricingTier = ({
  name,
  price,
  returnRate,
  description,
  features,
  isPopular,
  withdrawalInfo,
}: {
  name: string;
  price: string;
  returnRate: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  withdrawalInfo: string;
}) => {
  const navigate = useNavigate()
  return (
    <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
      <div className="relative h-full p-6 flex flex-col">
        {isPopular && (
          <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
            Most Popular
          </span>
        )}

        {/* Return Rate Display */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-4xl font-bold">{returnRate}</div>
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>

        <h3 className="text-xl font-medium mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-2xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-gray-400"> minimum</span>}
        </div>

        <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-300">{withdrawalInfo}</p>
        </div>

        <p className="text-gray-400 mb-6 text-sm">{description}</p>

        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button onClick={() => navigate('/dashboard', { replace: false })} className="button-gradient w-full">
          Start Investing
        </Button>
      </div>
    </CardSpotlight>
  )
}

export const PricingSection = () => {
  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Choose Your{" "}
          <span className="text-gradient font-medium">Investment Plan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400"
        >
          Invest regularly and get crypto returns with instant withdrawal options
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <PricingTier
          name="Starter Plan"
          price="$150"
          returnRate="50%"
          description="Perfect for beginners looking to start their crypto investment journey"
          withdrawalInfo="Instant Withdrawal • Min $150 - $999"
          features={[
            "50% returns after 24 hours",
            "Instant withdrawal processing",
            "Email support included",
            "Mobile app access",
            "Basic portfolio tracking"
          ]}
        />

        <PricingTier
          name="Growth Plan"
          price="$1,000"
          returnRate="100%"
          description="Double your investment with our growth-focused plan"
          withdrawalInfo="Instant Withdrawal • Min $1000 - $4999"
          features={[
            "100% returns after 24 hours",
            "Priority withdrawal processing",
            "Dedicated support channel",
            "Advanced portfolio analytics",
            "Market insights & reports"
          ]}
        />

        <PricingTier
          name="Pro Plan"
          price="$50,000"
          returnRate="200%"
          description="Professional-grade investment plan for serious investors"
          withdrawalInfo="Instant Withdrawal • Min $50,000 - $200,000"
          features={[
            "200% returns after 24 hours",
            "Instant withdrawal guarantee",
            "Personal account manager",
            "VIP customer support",
            "Custom investment strategies",
            "Real-time market data"
          ]}
          isPopular
        />

        <PricingTier
          name="Elite Plan"
          price="$200,000"
          returnRate="300%"
          description="Elite investment experience with maximum returns"
          withdrawalInfo="Instant Withdrawal • Min $200,000 - $999,000"
          features={[
            "300% returns after 24 hours",
            "Lightning-fast withdrawals",
            "Dedicated elite support team",
            "Exclusive investment opportunities",
            "Advanced risk management",
            "Direct institutional access"
          ]}
        />

        <PricingTier
          name="Premier Plan"
          price="$1,000,000"
          returnRate="500%"
          description="Ultimate investment package for high-net-worth individuals"
          withdrawalInfo="Instant Withdrawal • $1M+ investments"
          features={[
            "500% returns after 24 hours",
            "White-glove service",
            "24/7 dedicated support",
            "Custom infrastructure",
            "Institutional-grade security",
            "Unlimited withdrawal amounts"
          ]}
        />

        <PricingTier
          name="Premier Plan"
          price="$10,000,000"
          returnRate="1000%"
          description="Coming soon high-net-worth individuals"
          withdrawalInfo="Instant Withdrawal • $1M+ investments"
          features={[
            "Coming Soon",
          ]}
        />
      </div>
    </section>
  );
};