import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is WalletX safe and secure?",
    answer: "Absolutely. WalletX uses bank-grade security with 256-bit SSL encryption, multi-factor authentication, and real-time fraud monitoring. Your money and data are protected by the same security standards used by major banks."
  },
  {
    question: "How fast are the transfers?",
    answer: "Transfers within WalletX are instant and happen in real-time. Bank transfers and UPI payments typically complete within seconds, while international transfers may take 1-2 business days depending on the destination."
  },
  {
    question: "What are the fees for using WalletX?",
    answer: "WalletX offers competitive pricing with no hidden fees. Basic transfers are free, while premium features like international transfers have transparent, upfront pricing. Check our pricing page for detailed information."
  },
  {
    question: "Can I use WalletX for business transactions?",
    answer: "Yes! WalletX supports both personal and business accounts. Business users get additional features like bulk payments, invoice management, and detailed analytics. Contact our business team for more information."
  },
  {
    question: "How do I add money to my wallet?",
    answer: "You can add money to your WalletX account through multiple methods: UPI, net banking, debit/credit cards, and bank transfers. All top-ups are instant and secure with no additional charges for most payment methods."
  },
  {
    question: "Is there a limit on transactions?",
    answer: "WalletX has reasonable limits to ensure security. New users start with basic limits that can be increased through verification. Verified users enjoy higher transaction limits suitable for most personal and business needs."
  },
  {
    question: "What if I face any issues?",
    answer: "Our 24/7 customer support team is always ready to help. You can reach us through in-app chat, email, or phone. We also have a comprehensive help center with guides and tutorials for common questions."
  },
  {
    question: "Can I use WalletX internationally?",
    answer: "Yes, WalletX supports international transfers to over 100 countries. You can send money abroad at competitive exchange rates with transparent fees. Some features may vary by country due to local regulations."
  }
];

export function FAQ() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about WalletX
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-card rounded-lg border border-border hover:shadow-md transition-shadow px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@walletx.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                Visit Help Center
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}