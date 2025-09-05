import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "../supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.user?.email}`,
      });
      navigate("/dashboard"); // 👈 redirect after login
    }
  } catch (err: any) {
    toast({
      title: "Unexpected Error",
      description: err.message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">RockSafe AI</h1>
          <p className="text-muted-foreground mt-1">Mining Safety Monitoring System</p>
        </div>

        <Card className="gradient-surface border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-foreground">Secure Access</CardTitle>
            <CardDescription>
              Enter your credentials to access the monitoring dashboard
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="engineer@minesite.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-border text-foreground pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full gradient-primary text-white font-medium hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Access Dashboard"}
              </Button>
              
              <div className="text-center">
                <Button variant="link" className="text-primary hover:text-primary/80 text-sm">
                  Forgot Password?
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center mt-6 text-xs text-muted-foreground">
          Emergency Contact: +1-800-MINE-911
        </div>
      </div>
    </div>
  );
};

export default Login;