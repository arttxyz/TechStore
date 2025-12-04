import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';

export default function Confirmacao() {
  const [location] = useLocation();
  const { cart, clearCart, getCartTotal } = useCartContext();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const orderId = searchParams.get('orderId') || 'TEC123456';

  useEffect(() => {
    // Limpar carrinho após confirmação
    clearCart();
  }, []);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Success Message */}
        <div className="text-center mb-12">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pedido Confirmado!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Obrigado por sua compra na TechStore
          </p>
          <p className="text-gray-600">
            Você receberá um email de confirmação em breve
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Number */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Número do Pedido
              </h2>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <p className="text-3xl font-bold text-blue-600 font-mono">
                  {orderId}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Guarde este número para acompanhar seu pedido
              </p>
            </div>

            {/* Order Status */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Status do Pedido
              </h2>

              <div className="space-y-4">
                {/* Step 1: Confirmado */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pedido Confirmado</p>
                    <p className="text-sm text-gray-600">
                      {new Date().toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Step 2: Processando */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white flex-shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Processando</p>
                    <p className="text-sm text-gray-600">
                      Seu pedido está sendo preparado
                    </p>
                  </div>
                </div>

                {/* Step 3: Enviado */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white flex-shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Enviado</p>
                    <p className="text-sm text-gray-600">
                      Você receberá um código de rastreamento
                    </p>
                  </div>
                </div>

                {/* Step 4: Entregue */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Entregue</p>
                    <p className="text-sm text-gray-600">
                      Estimado para {estimatedDelivery.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Itens do Pedido
              </h2>

              <div className="space-y-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 pb-4 border-b border-gray-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantidade: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          R$ {item.price.toFixed(2)} cada
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Nenhum item no pedido</p>
                )}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Frete</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-semibold">Grátis</span>
                    ) : (
                      `R$ ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-2xl text-blue-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Entrega Estimada
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {estimatedDelivery.toLocaleDateString('pt-BR')}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold">
                  Acompanhar Pedido
                </Button>
                <Link href="/produtos">
                  <a>
                    <Button
                      variant="outline"
                      className="w-full py-3 font-semibold"
                    >
                      Continuar Comprando
                    </Button>
                  </a>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-3">
                  Dúvidas sobre seu pedido?
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Contato
                </p>
                <p className="text-sm text-gray-600">
                  Email: contato@techstore.com
                </p>
                <p className="text-sm text-gray-600">
                  Tel: (11) 3000-0000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Próximos Passos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-2">
                Preparação
              </p>
              <p className="text-sm text-gray-600">
                Seu pedido será preparado em até 24 horas
              </p>
            </div>
            <div>
              <Truck className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-2">
                Envio
              </p>
              <p className="text-sm text-gray-600">
                Você receberá código de rastreamento por email
              </p>
            </div>
            <div>
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-900 mb-2">
                Entrega
              </p>
              <p className="text-sm text-gray-600">
                Entrega em até 7 dias úteis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
