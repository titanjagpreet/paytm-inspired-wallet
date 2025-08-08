import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Plus, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account in under 2 minutes with just your phone number and basic details. No lengthy paperwork required.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: "02", 
    icon: Plus,
    title: "Add Money",
    description: "Top up your wallet instantly using UPI, bank transfer, or cards. Multiple payment methods for your convenience.",
    color: "from-green-500 to-emerald-500"
  },
  {
    step: "03",
    icon: Send,
    title: "Send Money",
    description: "Transfer money to anyone instantly. Use phone numbers, UPI IDs, or scan QR codes for lightning-fast payments.",
    color: "from-purple-500 to-pink-500"
  }
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Get started in{" "}
            <span className="text-gradient">3 simple steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of users who trust WalletX for their daily transactions
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center space-x-8">
              <div className="w-48 h-0.5 bg-gradient-to-r from-blue-500 to-green-500"></div>
              <div className="w-48 h-0.5 bg-gradient-to-r from-green-500 to-purple-500"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="relative"
              >
                <Card className="text-center gradient-card border-0 hover-lift transition-all duration-300 group">
                  <CardContent className="p-8">
                    {/* Step number */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-lg shadow-lg`}>
                        {step.step}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-6">
                      <div className="inline-flex p-4 rounded-2xl bg-muted/50 group-hover:bg-primary/10 transition-colors">
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 p-6 bg-success/10 rounded-2xl border border-success/20">
            <CheckCircle className="w-8 h-8 text-success" />
            <div className="text-left">
              <div className="font-semibold text-success">Ready in minutes</div>
              <div className="text-sm text-muted-foreground">Start using WalletX immediately after verification</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}