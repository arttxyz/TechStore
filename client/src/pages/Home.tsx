import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Product } from '@/hooks/useFilters';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const banners = [
    {
      id: 1,
      title: 'Tecnologia de Ponta',
      subtitle: 'Descubra os melhores produtos eletrônicos',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'from-purple-600 to-purple-800',
    },
    {
      id: 2,
      title: 'Ofertas Imperdíveis',
      subtitle: 'Até 40% de desconto em produtos selecionados',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'from-pink-600 to-red-600',
    },
    {
      id: 3,
      title: 'Novidades em Estoque',
      subtitle: 'Os últimos lançamentos em tecnologia',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: 'from-blue-600 to-cyan-600',
    },
  ];

  const categories = [
    { name: 'Celulares', icon: '📱', count: 2 },
    { name: 'Computadores', icon: '💻', count: 1 },
    { name: 'Áudio', icon: '🎧', count: 1 },
    { name: 'Wearables', icon: '⌚', count: 1 },
    { name: 'Câmeras', icon: '📷', count: 2 },
    { name: 'Tablets', icon: '📱', count: 1 },
  ];

  // Auto-rotate banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const highlightedProducts = products.slice(0, 3);
  const weeklyOffers = products
    .filter((p) => p.discount > 15)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Slider */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ background: banner.image }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-2xl mb-8 opacity-90">
                  {banner.subtitle}
                </p>
                <Link href="/produtos">
                  <a>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                      Explorar Produtos
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Truck className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Entrega Grátis</h3>
                <p className="text-sm text-gray-600">
                  Em compras acima de R$ 100
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Garantia 100%</h3>
                <p className="text-sm text-gray-600">
                  Produtos originais garantidos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RotateCcw className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900">Devolução Fácil</h3>
                <p className="text-sm text-gray-600">
                  30 dias para devolver
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Categorias Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href="/produtos">
                <a className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition cursor-pointer">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {category.count} produto{category.count !== 1 ? 's' : ''}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted Products Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Destaques
            </h2>
            <Link href="/produtos">
              <a className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                Ver Todos <ChevronRight className="w-5 h-5" />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Offers Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ofertas da Semana
            </h2>
            <Link href="/produtos">
              <a className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                Ver Todas <ChevronRight className="w-5 h-5" />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            O que Nossos Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'João Silva',
                text: 'Excelente qualidade de produtos e entrega rápida!',
                rating: 5,
              },
              {
                name: 'Maria Santos',
                text: 'Melhor loja de tecnologia que já comprei. Recomendo!',
                rating: 5,
              },
              {
                name: 'Carlos Oliveira',
                text: 'Atendimento impecável e produtos originais.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">\"{testimonial.text}\"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Não Encontrou o Que Procura?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Navegue por nossa coleção completa de produtos eletrônicos
          </p>
          <Link href="/produtos">
            <a>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Explorar Catálogo Completo
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
