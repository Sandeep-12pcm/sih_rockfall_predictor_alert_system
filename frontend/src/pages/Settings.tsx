// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";
// import { 
//   Bell, 
//   Mail, 
//   MessageSquare, 
//   Shield, 
//   User,
//   AlertTriangle,
//   Save,
//   RefreshCw,
//   LogOut
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

// const Settings = () => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     role: "", 
//     phone: ""
//   });
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchProfile  = async() => {
//       const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
//       if (sessionError || !sessionData.session) {
//         console.error("No active session found:", sessionError);
//         return navigate("/login", { replace: true });
//       }

//       const { data: userData, error: userError } = await supabase
//         .from("users")
//         .select("id, name, email, number, role")
//         .eq("id", sessionData.session.user.id)
//         .single();

//       if (userError) return navigate("/login", { replace: true });

//       setProfile(userData);
//     };

//     fetchProfile();
//   }, [navigate]);

//   const [notifications, setNotifications] = useState({
//     emailAlerts: true,
//     smsAlerts: true,
//     pushNotifications: true,
//     lowRisk: false,
//     mediumRisk: true,
//     highRisk: true,
//     criticalRisk: true
//   });

//   const [thresholds, setThresholds] = useState({
//     displacement: "5.0",
//     strain: "400",
//     temperature: "30",
//     moisture: "80"
//   });

//   const handleSave = () => {
//     toast({
//       title: "Settings Saved",
//       description: "Your preferences have been updated successfully.",
//     });
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     toast({
//       title: "Logged Out",
//       description: "You have been signed out successfully.",
//     });
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
//           <p className="text-muted-foreground">Configure alerts, thresholds, and user preferences</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm">
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Reset to Defaults
//           </Button>
//           <Button size="sm" onClick={handleSave} className="gradient-primary text-white">
//             <Save className="h-4 w-4 mr-2" />
//             Save Changes
//           </Button>
//           <Button 
//             size="sm" 
//             variant="destructive" 
//             onClick={handleLogout}
//           >
//             <LogOut className="h-4 w-4 mr-2" />
//             Logout
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="profile" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//           <TabsTrigger value="alerts">Alerts</TabsTrigger>
//           <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
//           <TabsTrigger value="security">Security</TabsTrigger>
//         </TabsList>

//         {/* Profile Tab */}
//         <TabsContent value="profile" className="space-y-6">
//           <Card className="gradient-surface border-border">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-foreground">
//                 <User className="h-5 w-5" />
//                 User Profile
//               </CardTitle>
//               <CardDescription>
//                 Update your personal information and contact details
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-foreground">Full Name</Label>
//                   <Input
//                     id="name"
//                     value={profile.name}
//                     onChange={(e) => setProfile({...profile, name: e.target.value})}
//                     className="bg-background border-border"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-foreground">Email Address</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={profile.email}
//                     onChange={(e) => setProfile({...profile, email: e.target.value})}
//                     className="bg-background border-border"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="role" className="text-foreground">Job Role</Label>
//                   <Input
//                     id="role"
//                     value={profile.role}
//                     onChange={(e) => setProfile({...profile, role: e.target.value})}
//                     className="bg-background border-border"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     value={profile.phone}
//                     onChange={(e) => setProfile({...profile, phone: e.target.value})}
//                     className="bg-background border-border"
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Alerts Tab */}
//         <TabsContent value="alerts" className="space-y-6">
//           {/* ... (same as your code for alerts) ... */}
//         </TabsContent>

//         {/* Thresholds Tab */}
//         <TabsContent value="thresholds" className="space-y-6">
//           {/* ... (same as your code for thresholds) ... */}
//         </TabsContent>

//         {/* Security Tab */}
//         <TabsContent value="security" className="space-y-6">
//           {/* ... (same as your code for security) ... */}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Settings;

// first change

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User,
  RefreshCw,
  Save,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    role: "", 
    phone: ""
  });
  const [otherUsers, setOtherUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile  = async() => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error("No active session found:", sessionError);
        return navigate("/login", { replace: true });
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, name, email, number, role")
        .eq("id", sessionData.session.user.id)
        .single();

      if (userError) return navigate("/login", { replace: true });

      setProfile({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.number
      });
    };

    fetchProfile();
  }, [navigate]);

  // Fetch other users when alerts tab is opened
  useEffect(() => {
    const fetchOtherUsers = async () => {
      if (activeTab !== "alerts" || !profile.id) return;

      const { data, error } = await supabase
        .from("users")
        .select("id, name ,number")
        .neq("id", profile.id);

      if (error) {
        console.error("Error fetching other users:", error);
        return;
      }

      setOtherUsers(data);
    };

    fetchOtherUsers();
  }, [activeTab, profile.id]);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been signed out successfully.",
    });
    navigate("/login", { replace: true });
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
          <Button 
            size="sm" 
            variant="destructive" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6" onValueChange={setActiveTab}>
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

        {/* Alerts Tab */}
       <TabsContent value="alerts" className="space-y-6">
  <Card className="gradient-surface border-border">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-foreground">
         Workers 
      </CardTitle>
      <CardDescription>
        Workers info
      </CardDescription>
    </CardHeader>
    <CardContent>
      {otherUsers.length === 0 ? (
        <p className="text-muted-foreground">No other users found.</p>
      ) : (
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-2 text-left">Worker ID</th>
              <th className="border border-border px-4 py-2 text-left">Name</th>
              <th className="border border-border px-4 py-2 text-left">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {otherUsers.map((user) => (
              <tr key={user.id}>
                <td className="border border-border px-4 py-2">{user.id}</td>
                <td className="border border-border px-4 py-2">{user.name}</td>   {/* ✅ FIXED */}
                <td className="border border-border px-4 py-2">{user.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </CardContent>
  </Card>
</TabsContent>


        {/* Thresholds Tab */}
        <TabsContent value="thresholds" className="space-y-6">
          {/* your thresholds UI here */}
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          {/* your security UI here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
