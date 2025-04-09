
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChevronRight, Dumbbell, LineChart, Calendar, CheckCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-white">
      {/* Header / Navigation */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Dumbbell className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-2xl font-bold text-slate-900">Spor İzci</h1>
        </div>
        <div className="space-x-2">
          {user ? (
            <Button onClick={() => navigate('/dashboard')}>
              Panele Git
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
              >
                Giriş Yap
              </Button>
              <Button 
                variant="default" 
                onClick={() => navigate('/register')}
              >
                Kayıt Ol
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Spor Hedeflerinizi Planlayın ve Takip Edin
          </h1>
          <p className="text-lg mb-8 text-slate-600">
            Spor İzci ile kişiselleştirilmiş antrenman programları oluşturun, ilerlemenizi takip edin ve daha iyi sonuçlar elde edin.
          </p>
          <div className="space-x-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate(user ? '/dashboard' : '/register')}
            >
              {user ? 'Panele Git' : 'Hemen Başla'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 animate-pulse-scale">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Fitness tracking" 
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
            Neden Spor İzci?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Program Planlama</h3>
              <p className="text-slate-600">Kendinize özel antrenman programları oluşturun veya hazır şablonlardan seçim yapın.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <LineChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">İlerleme Takibi</h3>
              <p className="text-slate-600">İlerlemenizi grafikler ve detaylı raporlarla takip edin, giderek daha iyi sonuçlar elde edin.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hedef Belirleme</h3>
              <p className="text-slate-600">Kişisel fitness hedeflerinizi belirleyin ve bu hedeflere ulaşma sürecinizi takip edin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
          Spor yolculuğunuza bugün başlayın
        </h2>
        <p className="text-lg mb-8 text-slate-600 max-w-2xl mx-auto">
          Daha sağlıklı bir yaşam için ilk adımı atın. Spor İzci ile hedeflerinize 
          daha hızlı ulaşın ve sürekli motive kalın.
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate(user ? '/dashboard' : '/register')}
        >
          {user ? 'Panele Git' : 'Ücretsiz Kaydol'}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Dumbbell className="h-8 w-8 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Spor İzci</h2>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400">&copy; {new Date().getFullYear()} Spor İzci. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
