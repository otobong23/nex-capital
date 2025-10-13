import { motion } from "framer-motion";
import { ArrowRight, Command, TrendingUp, Users, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import TradingViewWidget from "@/components/TradingViewWidget";
import MarketOverviewWidget from "@/components/MarketOverviewWidget";
import CryptoTickerWidget from "@/components/CryptoTickerWidget";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20"
      >
        {/* Background */}
        <div
          className="absolute inset-0 -z-10 bg-[#0A0A0A] overflow-hidden"
        />
        {/* Enhanced Background with Image and Overlays */}
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/crypto.webp")',
          }}
        />

        {/* Light Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient Overlay for Enhanced Visual Appeal */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />

        {/* Subtle Pattern Overlay for Texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
              `
          }}
        />

        {/* add login and signup button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="md:flex items-center gap-3 z-20 hidden mb-5"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Button
              onClick={() => navigate('/login', { replace: false })}
              variant="ghost"
              size="sm"
              className="relative px-6 py-2 text-white hover:text-black transition-all duration-300 border border-white/20 hover:border-white/40 rounded-full backdrop-blur-sm hover:bg-white/90"
            >
              <span className="relative z-10 font-medium">
                {t('auth.login.login')}
              </span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <Button
              onClick={() => navigate('/signup', { replace: false })}
              size="sm"
              className="relative px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-all duration-300 border border-transparent"
            >
              <span className="relative z-10">
                {t('auth.signup.signIn')}
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Mobile Auth Buttons - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="md:hidden flex gap-2 z-20 mb-5"
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="relative group flex-1"
          >
            <Button
              onClick={() => navigate('/login', { replace: false })}
              variant="ghost"
              className="w-full h-12 text-white hover:text-black transition-all duration-300 border border-white/20 hover:border-white/40 rounded-xl backdrop-blur-sm hover:bg-white/90 font-medium"
            >
              {t('auth.login.login')}
            </Button>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            className="relative group flex-1"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-70 group-active:opacity-100 transition duration-300"></div>
            <Button
              onClick={() => navigate('/signup', { replace: false })}
              className="relative w-full h-12 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 border border-transparent"
            >
              <span className="relative z-10">
                {t('auth.signup.signIn')}
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
        >
          <span className="text-sm font-medium">
            <Command className="w-4 h-4 inline-block mr-2" />
            {t('hero.badge')}
          </span>
        </motion.div>

        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
            <span className="text-gray-200">
              <TextGenerateEffect words={t('hero.title')} />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words={t('hero.titleHighlight')} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mx-auto max-w-5xl mt-20"
        >
          <div className="glass rounded-xl overflow-hidden">
            <img
              src="/lovable-uploads/c32c6788-5e4a-4fee-afee-604b03113c7f.png"
              alt="CryptoTrade Dashboard"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Crypto Ticker */}
      <div className="bg-black border-y border-white/10">
        <CryptoTickerWidget />
      </div>

      {/* Trading View Widgets Section */}
      <section className="container px-4 py-20 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Market Data</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with real-time cryptocurrencies and charts powered by TradingView
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Bitcoin Chart</h3>
            <TradingViewWidget symbol="BINANCE:BTCUSDT" height="400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Ethereum Chart</h3>
            <TradingViewWidget symbol="BINANCE:ETHUSDT" height="400" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Market Overview</h3>
          <MarketOverviewWidget height="600" />
        </motion.div>
      </section>

      {/* Enhanced Trust & Partnership Section with Images */}
      <section className="container px-4 py-20 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who trust our platform for their cryptocurrency trading needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* First Image with Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/shake1.jpg"
                alt="Professional Trading Partnership"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Secure Partnerships</h3>
                  </div>
                  <p className="text-sm text-gray-200">
                    Building lasting relationships with institutional clients through transparency and trust
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Advanced Analytics</h3>
                  <p className="text-gray-400 text-sm">Real-time market insights</p>
                </div>
              </div>
              <p className="text-gray-300">
                Our sophisticated algorithms provide deep market analysis and predictive insights to help you make informed trading decisions.
              </p>
            </div>

            <div className="glass rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Enterprise Security</h3>
                  <p className="text-gray-400 text-sm">Bank-grade protection</p>
                </div>
              </div>
              <p className="text-gray-300">
                Multi-layer security protocols and cold storage solutions ensure your assets are protected with institutional-grade security.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content First, then Second Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8 lg:order-1"
          >
            <div className="glass rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Expert Support</h3>
                  <p className="text-gray-400 text-sm">24/7 professional assistance</p>
                </div>
              </div>
              <p className="text-gray-300">
                Our dedicated team of crypto experts and financial advisors are available around the clock to support your trading journey.
              </p>
            </div>

            <div className="glass rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Proven Results</h3>
                  <p className="text-gray-400 text-sm">Track record of success</p>
                </div>
              </div>
              <p className="text-gray-300">
                Join successful traders who have achieved consistent returns using our advanced trading tools and market intelligence.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative lg:order-2"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/shake2.jpg"
                alt="Professional Business Meeting"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Global Network</h3>
                  </div>
                  <p className="text-sm text-gray-200">
                    Connect with a worldwide community of traders and financial professionals
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section */}
      <div id="features" className="bg-black">
        <FeaturesSection />
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-black">
        <PricingSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-black">
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <section className="container px-4 py-20 relative bg-black">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('hero.cta')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <Button size="lg" onClick={() => navigate('/login', { replace: false })} className="button-gradient">
            {t('nav.startTrading')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Index;