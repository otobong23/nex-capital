import { motion } from "framer-motion";
import { Shield, Zap, Server, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      <div className="container px-4 pt-32 pb-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('about.whoWeAre.description')}
          </p>
        </motion.section>

        {/* Who We Are */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('about.whoWeAre.title')}</h2>
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">{t('about.whoWeAre.subtitle')}</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('about.whoWeAre.description')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* About Trade Phere */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('about.aboutTradePhere.title')}</h2>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400 text-center">{t('about.aboutTradePhere.subtitle')}</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('about.aboutTradePhere.description')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('about.reliability.title')}</h2>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400 text-center">{t('about.reliability.subtitle')}</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t('about.reliability.description')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Legal */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t('about.legal.title')}</h2>
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">{t('about.legal.subtitle')}</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {t('about.legal.description')}
              </p>
              <Button 
                asChild
                size="lg" 
                className="button-gradient"
              >
                <a href="/lovable-uploads/4e593699-b74e-41e1-a5cd-65e0314b31f9.png" target="_blank" rel="noopener noreferrer">
                  {t('about.legal.viewCertificate')}
                </a>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.income.title')}</h2>
            <h3 className="text-2xl font-semibold text-blue-400">{t('about.income.subtitle')}</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4">{t('about.income.feature1.title')}</h4>
              <p className="text-gray-300">
                {t('about.income.feature1.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4">{t('about.income.feature2.title')}</h4>
              <p className="text-gray-300">
                {t('about.income.feature2.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4">{t('about.income.feature3.title')}</h4>
              <p className="text-gray-300">
                {t('about.income.feature3.description')}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('about.faq.title')}</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border border-white/10 rounded-lg bg-black/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('about.faq.question1.title')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-0 pb-4">
                    {t('about.faq.question1.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-white/10 rounded-lg bg-black/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('about.faq.question2.title')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-0 pb-4">
                    {t('about.faq.question2.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-white/10 rounded-lg bg-black/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('about.faq.question3.title')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-0 pb-4">
                    {t('about.faq.question3.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-white/10 rounded-lg bg-black/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('about.faq.question4.title')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-0 pb-4">
                    {t('about.faq.question4.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border border-white/10 rounded-lg bg-black/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('about.faq.question5.title')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-0 pb-4">
                    {t('about.faq.question5.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border border-white/10 rounded-lg bg-black/20 px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">{t('about.faq.question6.title')}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-0 pb-4">
                    {t('about.faq.question6.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default About;