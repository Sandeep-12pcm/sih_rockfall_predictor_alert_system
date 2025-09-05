import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Mail, 
  MessageSquare, 
  Shield, 
  User,
  AlertTriangle,
  Save,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "../supabaseClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.smith@minesite.com",
    role: "Safety Engineer", 
    phone: "+1-555-0123"
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile  = async() => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !sessionData.session) return navigate("/signin", { replace: true });

            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("id, name, email, number, role")
                .eq("id", sessionData.session.user.id)
                .single();

            if (userError) return navigate("/signin", { replace: true });

            setProfile(userData);
      fetchProfile();
  }},[navigate])

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    lowRisk: false,
    mediumRisk: true,
    highRisk: true,
    criticalRisk: true
  });

  const [thresholds, setThresholds] = useState({
    displacement: "5.0",
    strain: "400",
    temperature: "30",
    moisture: "80"
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure alerts, thresholds, and user preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button size="sm" onClick={handleSave} className="gradient-primary text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5" />
                User Profile
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-foreground">Job Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="bg-background border-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bell className="h-5 w-5" />
                Alert Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive safety alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <Label className="text-foreground font-medium">Email Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, emailAlerts: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <Label className="text-foreground font-medium">SMS Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, smsAlerts: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      <Label className="text-foreground font-medium">Push Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Browser and device notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, pushNotifications: checked})
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Alert Severity Levels</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-safe" />
                      <span className="text-foreground">Low Risk Alerts</span>
                    </div>
                    <Switch
                      checked={notifications.lowRisk}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, lowRisk: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-caution" />
                      <span className="text-foreground">Medium Risk Alerts</span>
                    </div>
                    <Switch
                      checked={notifications.mediumRisk}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, mediumRisk: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-warning" />
                      <span className="text-foreground">High Risk Alerts</span>
                    </div>
                    <Switch
                      checked={notifications.highRisk}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, highRisk: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-status-danger" />
                      <span className="text-foreground">Critical Risk Alerts</span>
                    </div>
                    <Switch
                      checked={notifications.criticalRisk}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, criticalRisk: checked})
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5" />
                Alert Thresholds
              </CardTitle>
              <CardDescription>
                Configure sensor thresholds that trigger safety alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="displacement" className="text-foreground">
                    Displacement Threshold (mm)
                  </Label>
                  <Input
                    id="displacement"
                    type="number"
                    value={thresholds.displacement}
                    onChange={(e) => setThresholds({...thresholds, displacement: e.target.value})}
                    className="bg-background border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Alert when displacement exceeds this value
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strain" className="text-foreground">
                    Strain Threshold (µε)
                  </Label>
                  <Input
                    id="strain"
                    type="number"
                    value={thresholds.strain}
                    onChange={(e) => setThresholds({...thresholds, strain: e.target.value})}
                    className="bg-background border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Alert when strain exceeds this value
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature" className="text-foreground">
                    Temperature Threshold (°C)
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    value={thresholds.temperature}
                    onChange={(e) => setThresholds({...thresholds, temperature: e.target.value})}
                    className="bg-background border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Alert when temperature exceeds this value
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moisture" className="text-foreground">
                    Moisture Threshold (%)
                  </Label>
                  <Input
                    id="moisture"
                    type="number"
                    value={thresholds.moisture}
                    onChange={(e) => setThresholds({...thresholds, moisture: e.target.value})}
                    className="bg-background border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Alert when soil moisture exceeds this value
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button className="w-full md:w-auto" variant="outline">
                  Change Password
                </Button>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground font-medium">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Recent Activity</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Last login: Today at 08:30 AM</div>
                  <div>Previous login: Yesterday at 07:45 AM</div>
                  <div>Password changed: 30 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;