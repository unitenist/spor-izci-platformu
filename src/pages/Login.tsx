
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('test@example.com'); // Pre-filled for demo
  const [password, setPassword] = useState('password123'); // Pre-filled for demo
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-white p-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <Dumbbell className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Spor İzci'ye Giriş Yap</CardTitle>
          <CardDescription>
            Hesabınıza giriş yaparak spor programınızı yönetin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">E-posta</label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">Şifre</label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Şifremi Unuttum
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Giriş Yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            <span className="text-muted-foreground">Henüz hesabınız yok mu? </span>
            <Link to="/register" className="text-primary hover:underline font-medium">
              Kayıt Ol
            </Link>
          </div>
          <Link to="/" className="text-sm text-center text-muted-foreground hover:text-foreground">
            Ana sayfaya dön
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
