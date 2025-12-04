import { useState } from 'react';
import { Link } from 'wouter';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Carrinho() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCartContext();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    // Simular desconto com cupom
    if (couponCode === 'TECH20') {
      setDiscount(0.2);
      alert('Cupom aplicado! 20% de desconto');
    } else if (couponCode === 'TECH10') {
      setDiscount(0.1);
      alert('Cupom aplicado! 10% de desconto');
    } else {
      alert('Cupom inválido');
      setDiscount(0);
    }
  };

  const subtotal = getCartTotal();
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao seu carrinho para começar a comprar.
            </p>
            <Link href="/produtos">
              <a>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Continuar Comprando
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/produtos">
            <a className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-5 h-5" />
              Continuar Comprando
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Carrinho de Compras</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-200 font-semibold text-gray-900">
                <div className="col-span-5">Produto</div>
                <div className="col-span-2 text-center">Quantidade</div>
                <div className="col-span-2 text-right">Preço</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-1"></div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 md:grid md:grid-cols-12 md:gap-4 flex flex-col gap-4"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-5 flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ID: {item.id}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center justify-center">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="md:col-span-2 text-right flex items-center justify-end">
                      <span className="font-semibold text-gray-900">
                        R$ {item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 text-right flex items-center justify-end">
                      <span className="text-lg font-bold text-gray-900">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <div className="md:col-span-1 flex items-center justify-end">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <div className="p-6 border-t border-gray-200">
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h2>

              {/* Coupon */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Cupom de Desconto
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: TECH20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    variant="outline"
                    className="px-4"
                  >
                    Aplicar
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Cupons: TECH20 (20%), TECH10 (10%)
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Desconto ({(discount * 100).toFixed(0)}%)</span>
                    <span>-R$ {discountAmount.toFixed(2)}</span>
                  </div>
                )}

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

              {/* Total */}
              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-2xl text-blue-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <a>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                    Finalizar Compra
                  </Button>
                </a>
              </Link>

              {/* Info */}
              <p className="text-xs text-gray-600 text-center mt-4">
                Frete grátis em compras acima de R$ 100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
