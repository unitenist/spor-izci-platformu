
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, Lock, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [goal, setGoal] = useState('fitness');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSaveProfile = () => {
    // In a real app, we would update the user profile in the database
    toast({
      title: "Profil güncellendi",
      description: "Profil bilgileriniz başarıyla kaydedildi.",
    });
  };
  
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Şifreler eşleşmiyor",
        description: "Lütfen yeni şifrenizi doğru şekilde tekrarlayın.",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Şifre çok kısa",
        description: "Şifreniz en az 8 karakter olmalıdır.",
      });
      return;
    }
    
    // In a real app, we would verify the current password and update to the new one
    toast({
      title: "Şifre değiştirildi",
      description: "Şifreniz başarıyla güncellenmiştir.",
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profil</h1>
      
      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
          <TabsTrigger value="info" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Kişisel Bilgiler
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Güvenlik
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kişisel Bilgiler</CardTitle>
              <CardDescription>
                Profil bilgilerinizi güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">İsim</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Boy (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Kilo (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Hedefi</Label>
                <select
                  id="goal"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="weight-loss">Kilo Vermek</option>
                  <option value="muscle-gain">Kas Kazanmak</option>
                  <option value="fitness">Genel Fitness</option>
                  <option value="endurance">Dayanıklılık</option>
                  <option value="flexibility">Esneklik</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Fitness İstatistikleri</CardTitle>
              <CardDescription>
                Vücut ölçümleriniz ve fitness verileriniz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">BMI</p>
                  <p className="text-2xl font-bold">
                    {(Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1)}
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Toplam Antrenman</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Bu Ay</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground">Toplam Süre</p>
                  <p className="text-2xl font-bold">8.5s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>
                Hesabınızın güvenliğini korumak için düzenli olarak şifrenizi değiştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mevcut Şifre</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Yeni Şifre</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Yeni Şifreyi Doğrula</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleChangePassword}>
                  <Save className="mr-2 h-4 w-4" />
                  Şifreyi Değiştir
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Hesap Ayarları</CardTitle>
              <CardDescription>
                Hesabınızla ilgili diğer güvenlik seçenekleri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">İki Faktörlü Doğrulama</p>
                  <p className="text-sm text-muted-foreground">
                    Hesabınızı daha güvenli hale getirmek için iki faktörlü doğrulamayı etkinleştirin
                  </p>
                </div>
                <Button variant="outline">Etkinleştir</Button>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium">Hesabı Sil</p>
                  <p className="text-sm text-muted-foreground">
                    Hesabınızı ve tüm ilişkili verileri kalıcı olarak silin
                  </p>
                </div>
                <Button variant="destructive">Hesabı Sil</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
