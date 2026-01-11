import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockVideos = [
  { id: 1, title: 'Trending Video 1', views: '2.5M', duration: '12:34', category: 'trending', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop' },
  { id: 2, title: 'Premium Exclusive', views: '1.8M', duration: '18:21', category: 'premium', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=225&fit=crop' },
  { id: 3, title: 'Hot New Release', views: '3.2M', duration: '15:45', category: 'new', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3037c17e?w=400&h=225&fit=crop' },
  { id: 4, title: 'Top Rated Content', views: '4.1M', duration: '20:12', category: 'trending', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=225&fit=crop' },
  { id: 5, title: 'Popular Series Ep.1', views: '5.3M', duration: '22:08', category: 'popular', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=225&fit=crop' },
  { id: 6, title: 'VIP Members Only', views: '900K', duration: '25:33', category: 'premium', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=225&fit=crop' },
];

const categories = ['Все', 'Trending', 'Новинки', 'Популярное', 'Премиум'];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [favorites, setFavorites] = useState<number[]>([2, 4]);

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || 
      (selectedCategory === 'Премиум' && video.isPremium) ||
      video.category === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Icon name="Play" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NewPorno
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button variant={activeTab === 'home' ? 'default' : 'ghost'} onClick={() => setActiveTab('home')} className="gap-2">
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button variant={activeTab === 'catalog' ? 'default' : 'ghost'} onClick={() => setActiveTab('catalog')} className="gap-2">
                <Icon name="Grid3x3" size={18} />
                Каталог
              </Button>
              <Button variant={activeTab === 'premium' ? 'default' : 'ghost'} onClick={() => setActiveTab('premium')} className="gap-2">
                <Icon name="Crown" size={18} />
                Премиум
              </Button>
              <Button variant={activeTab === 'favorites' ? 'default' : 'ghost'} onClick={() => setActiveTab('favorites')} className="gap-2">
                <Icon name="Heart" size={18} />
                Избранное
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-white font-semibold">ПЛ</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск видео..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-0 h-11"
              />
            </div>
            <Button size="icon" variant="outline" className="h-11 w-11">
              <Icon name="SlidersHorizontal" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-accent/20 p-8 flex items-center">
              <div className="relative z-10 max-w-2xl space-y-4">
                <Badge className="bg-accent text-white border-0">Новинка дня</Badge>
                <h2 className="text-5xl font-bold leading-tight">
                  Эксклюзивный <br />премиум контент
                </h2>
                <p className="text-lg text-muted-foreground">
                  Получите доступ к более чем 10,000 эксклюзивных видео в HD качестве
                </p>
                <div className="flex gap-3">
                  <Button size="lg" className="gap-2">
                    <Icon name="Play" size={20} />
                    Смотреть сейчас
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Icon name="Crown" size={20} />
                    Премиум подписка
                  </Button>
                </div>
              </div>
            </section>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>

            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video, index) => (
                  <Card 
                    key={video.id} 
                    className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 animate-scale-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                          <Icon name="Play" size={32} className="text-white ml-1" />
                        </div>
                      </div>
                      {video.isPremium && (
                        <Badge className="absolute top-3 left-3 bg-accent border-0">
                          <Icon name="Crown" size={14} className="mr-1" />
                          Premium
                        </Badge>
                      )}
                      <Badge className="absolute bottom-3 right-3 bg-black/80 text-white border-0">
                        {video.duration}
                      </Badge>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(video.id);
                        }}
                      >
                        <Icon 
                          name="Heart" 
                          size={18} 
                          className={favorites.includes(video.id) ? 'fill-red-500 text-red-500' : ''} 
                        />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Eye" size={16} />
                        <span>{video.views} просмотров</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Каталог видео</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockVideos.map((video) => (
                <Card key={video.id} className="group overflow-hidden hover:border-primary transition-all cursor-pointer">
                  <div className="relative aspect-video">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    {video.isPremium && (
                      <Badge className="absolute top-2 left-2 bg-accent border-0">
                        <Icon name="Crown" size={12} className="mr-1" />
                        VIP
                      </Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm line-clamp-1">{video.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{video.views} просмотров</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                <Icon name="Crown" size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold">Премиум подписка</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Разблокируйте доступ к эксклюзивному контенту, HD качеству и просмотру без рекламы
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="p-6 space-y-4 border-2 hover:border-primary transition-colors">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Базовый</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">490₽</span>
                    <span className="text-muted-foreground">/месяц</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>HD качество</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>Без рекламы</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>1 устройство</span>
                  </li>
                </ul>
                <Button className="w-full">Выбрать план</Button>
              </Card>

              <Card className="p-6 space-y-4 border-2 border-primary bg-primary/5 relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-accent border-0">Популярный</Badge>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Стандарт</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">890₽</span>
                    <span className="text-muted-foreground">/месяц</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>Full HD качество</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>Без рекламы</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>3 устройства</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>Офлайн просмотр</span>
                  </li>
                </ul>
                <Button className="w-full">Выбрать план</Button>
              </Card>

              <Card className="p-6 space-y-4 border-2 hover:border-primary transition-colors">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Премиум</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">1490₽</span>
                    <span className="text-muted-foreground">/месяц</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>4K качество</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>Без рекламы</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>Безлимит устройств</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={20} className="text-primary" />
                    <span>Эксклюзивный контент</span>
                  </li>
                </ul>
                <Button className="w-full">Выбрать план</Button>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Избранное</h2>
            {favorites.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <Icon name="Heart" size={64} className="mx-auto text-muted-foreground" />
                <p className="text-xl text-muted-foreground">Пока нет избранных видео</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.filter(v => favorites.includes(v.id)).map((video) => (
                  <Card key={video.id} className="group overflow-hidden hover:border-primary transition-all cursor-pointer">
                    <div className="relative aspect-video">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      {video.isPremium && (
                        <Badge className="absolute top-3 left-3 bg-accent border-0">Premium</Badge>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full"
                        onClick={() => toggleFavorite(video.id)}
                      >
                        <Icon name="Heart" size={18} className="fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{video.views} просмотров</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="flex justify-around p-2">
          <Button variant={activeTab === 'home' ? 'default' : 'ghost'} onClick={() => setActiveTab('home')} size="icon" className="flex-col h-auto py-2 gap-1">
            <Icon name="Home" size={20} />
            <span className="text-xs">Главная</span>
          </Button>
          <Button variant={activeTab === 'catalog' ? 'default' : 'ghost'} onClick={() => setActiveTab('catalog')} size="icon" className="flex-col h-auto py-2 gap-1">
            <Icon name="Grid3x3" size={20} />
            <span className="text-xs">Каталог</span>
          </Button>
          <Button variant={activeTab === 'premium' ? 'default' : 'ghost'} onClick={() => setActiveTab('premium')} size="icon" className="flex-col h-auto py-2 gap-1">
            <Icon name="Crown" size={20} />
            <span className="text-xs">Премиум</span>
          </Button>
          <Button variant={activeTab === 'favorites' ? 'default' : 'ghost'} onClick={() => setActiveTab('favorites')} size="icon" className="flex-col h-auto py-2 gap-1">
            <Icon name="Heart" size={20} />
            <span className="text-xs">Избранное</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}