import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Bell,
  AlertTriangle,
  Save,
  RefreshCw,
  Edit3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "../hooks/useProfile";

import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  const [otherUsers, setOtherUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    lowRisk: false,
    mediumRisk: true,
    highRisk: true,
    criticalRisk: true,
  });

  const [thresholds, setThresholds] = useState({
    displacement: "5.0",
    strain: "400",
    temperature: "30",
    moisture: "80",
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
    setIsEditing(false); // disable inputs after saving
  };

  return (
    <div className="p-6 space-y-6 relative min-h-screen bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            System Settings
          </h1>
          <p className="text-muted-foreground">
            Configure alerts, thresholds, and user preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={!isEditing}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="gradient-primary text-white"
            disabled={!isEditing}
          >
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

        {/* Profile Tab */}
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
                {["name", "email", "role", "phone"].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="text-foreground">
                      {field === "name"
                        ? "Full Name"
                        : field === "email"
                        ? "Email Address"
                        : field === "role"
                        ? "Job Role"
                        : "Phone Number"}
                    </Label>
                    <Input
                      id={field}
                      type={field === "email" ? "email" : "text"}
                      value={profile[field as keyof typeof profile]}
                      onChange={(e) =>
                        setProfile({ ...profile, [field]: e.target.value })
                      }
                      className="bg-background border-border focus:ring-2 focus:ring-primary focus:outline-none"
                      disabled={!isEditing}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bell className="h-5 w-5" />
                Alerts
              </CardTitle>
              <CardDescription>
                Enable or disable notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.keys(notifications).map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <Label className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <Switch
                    checked={notifications[key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [key]: checked })
                    }
                    disabled={!isEditing}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Thresholds Tab */}
        <TabsContent value="thresholds" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="h-5 w-5" />
                Thresholds
              </CardTitle>
              <CardDescription>
                Set thresholds for rockfall parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(thresholds).map((key) => (
                <div key={key} className="space-y-2">
                  <Label className="capitalize">{key}</Label>
                  <Input
                    value={thresholds[key as keyof typeof thresholds]}
                    onChange={(e) =>
                      setThresholds({ ...thresholds, [key]: e.target.value })
                    }
                    className="bg-background border-border focus:ring-2 focus:ring-primary focus:outline-none"
                    disabled={!isEditing}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab (placeholder) */}
        <TabsContent value="security" className="space-y-6">
          <Card className="gradient-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>
                Security settings (placeholders)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No editable fields yet</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Button fixed at bottom-right */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2"
        >
          <Edit3 className="h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Settings;
