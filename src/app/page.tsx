'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Users, MessageCircle, TrendingUp, Calendar, Star, Search } from 'lucide-react'
import { MovieSearch } from '@/components/movie-search'

export default function Home() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  const features = [
    {
      id: 1,
      icon: <Users className="w-6 h-6" />,
      title: "Совместный просмотр",
      description: "Смотрите фильмы и сериалы вместе с друзьями в реальном времени с полной синхронизацией"
    },
    {
      id: 2,
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Реакции и чат",
      description: "Делитесь эмоциями с эмодзи-реакциями и общайтесь в чате во время просмотра"
    },
    {
      id: 3,
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Умные рекомендации",
      description: "Получайте персональные рекомендации на основе предпочтений вашей компании"
    },
    {
      id: 4,
      icon: <Calendar className="w-6 h-6" />,
      title: "Планировщик",
      description: "Создавайте расписание киновечеров и никогда не пропускайте совместные просмотры"
    }
  ]

  const stats = [
    { label: "Активных комнат", value: "1,234" },
    { label: "Пользователей", value: "5,678" },
    { label: "Фильмов просмотрено", value: "12,345" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Movie Night Companion
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">Как это работает</button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">Фичи</button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">О нас</button>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Войти
              </Button>
              <Button size="sm">
                Создать комнату
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600">
            🎬 Новая эра совместного просмотра
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Смотрите фильмы вместе, даже когда вы в разных местах
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Создавайте комнаты для совместного просмотра, синхронизируйте видео с друзьями, 
            общайтесь в чате и делитесь эмоциями в реальном времени.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Play className="w-5 h-5 mr-2" />
              Создать комнату просмотра
            </Button>
            <Button size="lg" variant="outline">
              <Users className="w-5 h-5 mr-2" />
              Присоединиться к комнате
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Найдите идеальный фильм для совместного просмотра
          </h2>
          <p className="text-xl text-gray-600">
            Поиск в огромной базе фильмов и сериалов
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <MovieSearch />
          </CardContent>
        </Card>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Всё что нужно для идеального киновечера
          </h2>
          <p className="text-xl text-gray-600">
            Мощные функции для незабываемого совместного просмотра
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                activeFeature === feature.id ? 'ring-2 ring-purple-600 shadow-lg' : ''
              }`}
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-purple-600">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="text-center py-12">
            <Star className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Готовы к лучшему киновечеру?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Присоединяйтесь к тысячам пользователей, которые уже наслаждаются совместным просмотром
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Начать сейчас - бесплатно
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Movie Night Companion. Сделано с ❤️ для киноманов</p>
          </div>
        </div>
      </footer>
    </div>
  )
}