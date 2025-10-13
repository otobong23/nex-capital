// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { CheckCircle, Star, ArrowRight } from "lucide-react";
// import DashboardLayout from "@/components/DashboardLayout";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const Plans = () => {
//   const { t } = useTranslation();
  
//   const plans = [
//     {
//       id: 1,
//       name: "Starter Plan",
//       price: 500,
//       duration: "30 days",
//       profit: "5-8%",
//       features: [
//         "Basic trading tools",
//         "Email support",
//         "Monthly market reports",
//         "Risk management guide"
//       ],
//       popular: false,
//       description: "Perfect for beginners starting their trading journey"
//     },
//     {
//       id: 2,
//       name: "Basic Plan",
//       price: 1000,
//       duration: "30 days",
//       profit: "8-12%",
//       features: [
//         "Advanced trading tools",
//         "Priority support",
//         "Weekly market analysis",
//         "Portfolio optimization",
//         "Mobile trading app"
//       ],
//       popular: false,
//       description: "Ideal for traders with some experience"
//     },
//     {
//       id: 3,
//       name: "Professional Plan",
//       price: 5000,
//       duration: "30 days",
//       profit: "12-18%",
//       features: [
//         "Professional trading suite",
//         "24/7 dedicated support",
//         "Daily market insights",
//         "Advanced analytics",
//         "Personal trading advisor",
//         "API access"
//       ],
//       popular: true,
//       description: "For serious traders seeking maximum performance"
//     },
//     {
//       id: 4,
//       name: "Elite Plan",
//       price: 10000,
//       duration: "30 days",
//       profit: "18-25%",
//       features: [
//         "Elite trading platform",
//         "VIP support line",
//         "Real-time market data",
//         "Custom trading strategies",
//         "Dedicated account manager",
//         "Exclusive market research",
//         "Advanced risk management"
//       ],
//       popular: false,
//       description: "Premium features for elite traders"
//     },
//     {
//       id: 5,
//       name: "Institutional Plan",
//       price: 200000,
//       duration: "30 days",
//       profit: "25-35%",
//       features: [
//         "Institutional-grade platform",
//         "White-glove service",
//         "Custom integration",
//         "Institutional pricing",
//         "Dedicated trading desk",
//         "Regulatory compliance",
//         "Multi-asset trading",
//         "Unlimited API calls"
//       ],
//       popular: false,
//       description: "Enterprise-level solutions for institutional clients"
//     }
//   ];

//   const currentPlan = plans[1]; // Simulate user having Basic Plan

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Header */}
//          <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-white">{t('dashboard.plans.title')}</h1>
//             <p className="text-gray-400">{t('dashboard.plans.subtitle')}</p>
//           </div>
//           <div className="flex gap-3">
//              <Button asChild variant="outline">
//               <Link to="/dashboard/deposit">
//                 <ArrowRight className="w-4 h-4 mr-2" />
//                 {t('dashboard.home.deposit')}
//               </Link>
//             </Button>
//              <Button asChild variant="outline">
//               <Link to="/dashboard/withdrawal">
//                 <ArrowRight className="w-4 h-4 mr-2" />
//                 {t('dashboard.home.withdraw')}
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* Current Plan */}
//         <Card className="glass border-primary/30">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-white flex items-center gap-2">
//                 <Star className="w-5 h-5 text-primary" />
//                 {t('dashboard.plans.currentPlan')}
//               </CardTitle>
//               <Badge className="bg-primary/20 text-primary">{t('dashboard.plans.active')}</Badge>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <div>
//                  <h3 className="text-xl font-bold text-white">{currentPlan.name}</h3>
//                 <p className="text-gray-400">{currentPlan.description}</p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   {t('dashboard.plans.totalReturn')}: <span className="text-green-500 font-medium">{currentPlan.profit}</span> • 
//                   {t('dashboard.plans.duration')}: <span className="text-primary font-medium">{currentPlan.duration}</span>
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-2xl font-bold text-white">${currentPlan.price.toLocaleString()}</p>
//                 <p className="text-sm text-gray-400">{t('dashboard.plans.investmentAmount')}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Available Plans */}
//          <div>
//           <h2 className="text-2xl font-bold text-white mb-6">{t('dashboard.plans.title')}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {plans.map((plan, index) => (
//               <motion.div
//                 key={plan.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <Card className={`glass border-white/10 h-full ${plan.popular ? 'border-primary/50 relative' : ''}`}>
//                   {plan.popular && (
//                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
//                        <Badge className="bg-primary text-white">{t('dashboard.plans.mostPopular')}</Badge>
//                      </div>
//                   )}
                  
//                   <CardHeader>
//                     <CardTitle className="text-white">{plan.name}</CardTitle>
//                     <div className="text-3xl font-bold text-white">
//                       ${plan.price.toLocaleString()}
//                     </div>
//                     <p className="text-gray-400">{plan.description}</p>
//                   </CardHeader>
                  
//                   <CardContent className="space-y-4">
//                      <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400">{t('dashboard.plans.totalReturn')}:</span>
//                         <span className="text-green-500 font-medium">{plan.profit}</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-400">{t('dashboard.plans.duration')}:</span>
//                         <span className="text-primary font-medium">{plan.duration}</span>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-3">
//                       {plan.features.map((feature, idx) => (
//                         <div key={idx} className="flex items-center gap-2">
//                           <CheckCircle className="w-4 h-4 text-green-500" />
//                           <span className="text-sm text-gray-300">{feature}</span>
//                         </div>
//                       ))}
//                     </div>
                    
//                      <Button 
//                       className={`w-full ${plan.popular ? 'button-gradient' : ''}`}
//                       variant={plan.popular ? 'default' : 'outline'}
//                       disabled={currentPlan.id === plan.id}
//                     >
//                       {currentPlan.id === plan.id ? t('dashboard.plans.currentPlan') : t('dashboard.plans.selectPlan')}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Plans;


import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Plans = () => {
  const { t } = useTranslation();
  
  const plans = [
    {
      id: 1,
      name: "Starter Plan",
      price: 150,
      maxPrice: 999,
      duration: "24 hours",
      returnRate: "50%",
      features: [
        "50% returns after 24 hours",
        "Instant withdrawal processing",
        "Email support included",
        "Mobile app access",
        "Basic portfolio tracking"
      ],
      popular: false,
      description: "Perfect for beginners looking to start their crypto investment journey",
      withdrawalInfo: "Instant Withdrawal • Min $150 - $999"
    },
    {
      id: 2,
      name: "Growth Plan",
      price: 1000,
      maxPrice: 4999,
      duration: "24 hours",
      returnRate: "100%",
      features: [
        "100% returns after 24 hours",
        "Priority withdrawal processing",
        "Dedicated support channel",
        "Advanced portfolio analytics",
        "Market insights & reports"
      ],
      popular: false,
      description: "Double your investment with our growth-focused plan",
      withdrawalInfo: "Instant Withdrawal • Min $1,000 - $4,999"
    },
    {
      id: 3,
      name: "Pro Plan",
      price: 50000,
      maxPrice: 200000,
      duration: "24 hours",
      returnRate: "200%",
      features: [
        "200% returns after 24 hours",
        "Instant withdrawal guarantee",
        "Personal account manager",
        "VIP customer support",
        "Custom investment strategies",
        "Real-time market data"
      ],
      popular: true,
      description: "Professional-grade investment plan for serious investors",
      withdrawalInfo: "Instant Withdrawal • Min $50,000 - $200,000"
    },
    {
      id: 4,
      name: "Elite Plan",
      price: 200000,
      maxPrice: 999000,
      duration: "24 hours",
      returnRate: "300%",
      features: [
        "300% returns after 24 hours",
        "Lightning-fast withdrawals",
        "Dedicated elite support team",
        "Exclusive investment opportunities",
        "Advanced risk management",
        "Direct institutional access"
      ],
      popular: false,
      description: "Elite investment experience with maximum returns",
      withdrawalInfo: "Instant Withdrawal • Min $200,000 - $999,000"
    },
    {
      id: 5,
      name: "Premier Plan",
      price: 1000000,
      maxPrice: null,
      duration: "24 hours",
      returnRate: "500%",
      features: [
        "500% returns after 24 hours",
        "White-glove service",
        "24/7 dedicated support",
        "Custom infrastructure",
        "Institutional-grade security",
        "Unlimited withdrawal amounts"
      ],
      popular: false,
      description: "Ultimate investment package for high-net-worth individuals",
      withdrawalInfo: "Instant Withdrawal • $1M+ investments"
    }
  ];

  const currentPlan = plans[0]; // Simulate user having Growth Plan

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('dashboard.plans.title')}</h1>
            <p className="text-gray-400">Choose your investment plan and start earning returns</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/dashboard/deposit">
                <ArrowRight className="w-4 h-4 mr-2" />
                {t('dashboard.home.deposit')}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/withdrawal">
                <ArrowRight className="w-4 h-4 mr-2" />
                {t('dashboard.home.withdraw')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Current Plan */}
        {/* <Card className="glass border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                {t('dashboard.plans.currentPlan')}
              </CardTitle>
              <Badge className="bg-primary/20 text-primary">{t('dashboard.plans.active')}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl font-bold text-white">{currentPlan.returnRate}</div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">{currentPlan.name}</h3>
                <p className="text-gray-400 mb-2">{currentPlan.description}</p>
                
                <div className="bg-gray-800/50 rounded-lg p-3 mb-3 max-w-md">
                  <p className="text-sm text-gray-300">{currentPlan.withdrawalInfo}</p>
                </div>
                
                <p className="text-sm text-gray-400">
                  Return Rate: <span className="text-green-500 font-medium">{currentPlan.returnRate}</span> • 
                  Duration: <span className="text-primary font-medium">{currentPlan.duration}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">${currentPlan.price.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Current Investment</p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Available Investment Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`glass border-white/10 h-full ${plan.popular ? 'border-primary/50 relative' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-white">{t('dashboard.plans.mostPopular')}</Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    {/* Return Rate Display */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-4xl font-bold text-white">{plan.returnRate}</div>
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <div className="text-2xl font-bold text-white">
                      ${plan.price.toLocaleString()}
                      {plan.maxPrice && <span className="text-gray-400 text-sm font-normal"> minimum</span>}
                    </div>
                    
                    {/* Withdrawal Info Box */}
                    <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-300">{plan.withdrawalInfo}</p>
                    </div>
                    
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Return Rate:</span>
                        <span className="text-green-500 font-medium">{plan.returnRate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-primary font-medium">{plan.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Range:</span>
                        <span className="text-blue-400 font-medium">
                          ${plan.price.toLocaleString()}{plan.maxPrice ? ` - $${plan.maxPrice.toLocaleString()}` : '+'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'button-gradient' : ''} ${currentPlan.id === plan.id ? 'opacity-50' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      disabled={currentPlan.id === plan.id}
                    >
                      {currentPlan.id === plan.id ? 'Current Plan' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investment Info Section */}
        <Card className="glass border-blue-500/30 bg-gradient-to-r from-blue-500/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Investment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">How It Works</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Choose your investment plan
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Make your deposit
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Earn returns after 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Withdraw instantly
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Benefits</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Guaranteed returns in 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Instant withdrawal processing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    No hidden fees
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    24/7 customer support
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Plans;