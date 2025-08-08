import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Smartphone, 
  History, 
  CreditCard, 
  Users,
  Lock,
  TrendingUp 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Send money instantly to anyone, anywhere. Lightning-fast transactions that complete in seconds, not minutes.",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your money is protected with military-grade encryption and multi-layer security protocols.",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Beautiful, intuitive interface designed for mobile. Manage your money on the go with ease.",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    icon: History,
    title: "Transaction History",
    description: "Complete transaction history with powerful search and filtering. Track every rupee with detailed insights.",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: CreditCard,
    title: "Easy Top-ups",
    description: "Add money instantly from any bank account, UPI, or card. Multiple payment methods for your convenience.",
    gradient: "from-indigo-400 to-purple-500"
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Get insights into your spending patterns with intelligent analytics and personalized recommendations.",
    gradient: "from-rose-400 to-red-500"
  }
];

export function Features() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-muted/30">
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
            Everything you need for{" "}
            <span className="text-gradient">modern payments</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            WalletX combines the best of traditional banking with cutting-edge fintech innovation
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full gradient-card border-0 hover-lift hover:shadow-xl transition-all duration-300 group-hover:shadow-glow">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium bg-success/10 text-success border border-success/20">
            <Lock className="w-4 h-4 mr-2" />
            Trusted by 50,000+ users • 99.9% uptime
          </div>
        </motion.div>
      </div>
    </section>
  );
}