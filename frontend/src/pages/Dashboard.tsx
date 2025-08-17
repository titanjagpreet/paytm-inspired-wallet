import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  User,
  LogOut, 
  Wallet, 
  Send, 
  History, 
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Mail,
  Settings,
  Menu,
  X
} from "lucide-react";

interface Transaction {
  type: 'sent' | 'received';
  user: string;
  name: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
  note?: string;
}

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [receiverUsername, setReceiverUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

    const authHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/account/balance`,
          authHeaders
        );
        setBalance(res.data.balance);
      } catch (err) {
        toast.error("Failed to fetch balance");
      }
    };
    
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/account/transactions`,
          authHeaders
        );
        setTransactions(res.data.transactions);
      } catch (err) {
        toast.error("Failed to fetch transactions");
      }
    };
    
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          authHeaders
        );
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        toast.error("Failed to fetch profile");
      }
    };
    
    const updateUsername = async () => {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/users/username`,
          { username },
          authHeaders
        );
        toast.success("Username updated successfully");
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Username update failed");
      }
    };
    
    const updateEmail = async () => {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/users/email`,
          { email },
          authHeaders
        );
        toast.success("Email updated successfully");
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Email update failed");
      }
    };
    
    const handleTransfer = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/account/transfer`,
          {
            receiverUsername,
            amount: Number(amount),
          },
          authHeaders
        );
        toast.success(res.data.message);
        fetchBalance();
        fetchTransactions();
        setReceiverUsername("");
        setAmount("");
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Transfer failed");
      }
    };    

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
    fetchProfile();
  }, []);

  // Calculate balance trend by working backwards from current balance
  const balanceData = (() => {
    if (transactions.length === 0) {
      return [{ name: new Date().toLocaleDateString(), balance: balance }];
    }

    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calculate balance at each transaction point
    const balanceHistory: { name: string; balance: number }[] = [];
    let runningBalance = balance;

    // Add current balance as the first point
    balanceHistory.push({ 
      name: new Date().toLocaleDateString(), 
      balance: runningBalance 
    });

    // Work backwards through transactions
    sortedTransactions.forEach((txn) => {
      // Reverse the transaction to get the balance before this transaction
      if (txn.type === 'sent') {
        runningBalance += txn.amount; // Add back what was sent
      } else {
        runningBalance -= txn.amount; // Subtract what was received
      }
      
      balanceHistory.push({ 
        name: new Date(txn.date).toLocaleDateString(), 
        balance: runningBalance 
      });
    });

    // Reverse to show chronological order (oldest to newest)
    return balanceHistory.reverse();
  })();

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      active: currentView === 'dashboard'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      active: currentView === 'profile'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="flex relative z-10">
        {/* Mobile Menu Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Modern Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card/50 backdrop-blur-lg border-r border-border min-h-screen p-6 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-end mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gradient">WalletX</h1>
            <p className="text-sm text-muted-foreground">Your financial hub</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentView(item.id as 'dashboard' | 'profile');
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.active
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              logout();
              // Close sidebar on mobile before logout
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Mobile Header with Menu Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">WalletX</span>
            </div>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {currentView === 'dashboard' && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {username}!</p>
                  </div>
                  <div className="hidden lg:flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Live balance</span>
                  </div>
                </div>

                {/* Balance Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card className="gradient-card border-0 shadow-xl hover-lift">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-muted-foreground text-sm font-medium">Current Balance</p>
                          <p className="text-3xl lg:text-4xl font-bold text-gradient mt-2">₹ {balance.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground mt-2">Available for transfers</p>
                        </div>
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <Wallet className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Transfer and Chart Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                  {/* Transfer Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Card className="gradient-card border-0 shadow-lg hover-lift">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Send className="w-5 h-5 text-primary" />
                          <span>Send Money</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="receiver">Receiver Username</Label>
                          <Input
                            id="receiver"
                            value={receiverUsername}
                            onChange={(e) => setReceiverUsername(e.target.value)}
                            placeholder="Enter username"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount (₹)</Label>
                          <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <Button 
                          onClick={handleTransfer} 
                          className="w-full gradient-primary text-white font-medium hover:shadow-lg transition-all duration-200"
                          disabled={!receiverUsername || !amount}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Money
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Balance Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Card className="gradient-card border-0 shadow-lg hover-lift">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          <span>Balance Trend</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={balanceData}>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis 
                              dataKey="name" 
                              className="text-xs text-muted-foreground"
                            />
                            <YAxis className="text-xs text-muted-foreground" />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                                boxShadow: 'var(--shadow-lg)'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="balance" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={3}
                              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Transaction History */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="gradient-card border-0 shadow-lg hover-lift">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <History className="w-5 h-5 text-primary" />
                        <span>Recent Transactions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-60 lg:max-h-80 overflow-y-auto">
                        {transactions.length === 0 ? (
                          <div className="text-center py-8">
                            <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No transactions yet</p>
                            <p className="text-sm text-muted-foreground">Your transaction history will appear here</p>
                          </div>
                        ) : (
                          transactions.map((txn) => (
                            <motion.div
                              key={`${txn.user}-${txn.date}-${txn.amount}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center justify-between p-3 lg:p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-all duration-200"
                            >
                              <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
                                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  txn.type === 'sent' 
                                    ? 'bg-destructive/10 text-destructive' 
                                    : 'bg-success/10 text-success'
                                }`}>
                                  {txn.type === 'sent' ? (
                                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
                                  ) : (
                                    <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-sm lg:text-base truncate">
                                    {txn.type === 'sent' ? "Sent to" : "Received from"} {txn.user}
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    {new Date(txn.date).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className={`font-semibold text-sm lg:text-base flex-shrink-0 ${
                                txn.type === 'sent' ? 'text-destructive' : 'text-success'
                              }`}>
                                {txn.type === 'sent' ? '-' : '+'}₹ {txn.amount.toLocaleString()}
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}

            {currentView === 'profile' && (
              <>
                {/* Profile Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Profile Settings</h1>
                    <p className="text-muted-foreground">Manage your account information</p>
                  </div>
                  <div className="hidden lg:flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Account settings</span>
                  </div>
                </div>

                {/* Profile Information Display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-2xl"
                >
                  <Card className="gradient-card border-0 shadow-xl hover-lift">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-primary" />
                        <span>Profile Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">First Name</Label>
                          <p className="text-lg font-semibold">{firstName}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">Last Name</Label>
                          <p className="text-lg font-semibold">{lastName}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Username</Label>
                        <p className="text-lg font-semibold">{username}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                        <p className="text-lg font-semibold">{email}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Profile Update Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="w-full max-w-2xl"
                >
                  <Card className="gradient-card border-0 shadow-xl hover-lift">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5 text-primary" />
                        <span>Update Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                            <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                            <Input
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <Button 
                            onClick={updateUsername} 
                            className="mt-2 gradient-primary text-white font-medium hover:shadow-lg transition-all duration-200"
                          >
                            Update Username
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <Button 
                            onClick={updateEmail} 
                            className="mt-2 gradient-primary text-white font-medium hover:shadow-lg transition-all duration-200"
                          >
                            Update Email
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}