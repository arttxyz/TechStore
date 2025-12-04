import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ChevronRight, Check } from 'lucide-react';

type CheckoutStep = 'delivery' | 'payment' | 'review';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { cart, getCartTotal } = useCartContext();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery');

  // Form states
  const [deliveryForm, setDeliveryForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
  });

  const [paymentForm, setPaymentForm] = useState({
    method: 'credit-card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    pixKey: '',
    boletoData: '',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeliveryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (currentStep === 'delivery') {
      if (!deliveryForm.fullName || !deliveryForm.email || !deliveryForm.street) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
      }
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      if (paymentForm.method === 'credit-card' && !paymentForm.cardNumber) {
        alert('Por favor, preencha os dados do cartão');
        return;
      }
      setCurrentStep('review');
    }
  };

  const handlePlaceOrder = () => {
    // Simular criação do pedido
    const orderId = Math.random().toString(36).substring(7).toUpperCase();
    setLocation(`/confirmacao?orderId=${orderId}`);
  };

  const steps: { id: CheckoutStep; label: string }[] = [
    { id: 'delivery', label: 'Entrega' },
    { id: 'payment', label: 'Pagamento' },
    { id: 'review', label: 'Revisão' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    currentStep === step.id
                      ? 'bg-blue-600'
                      : steps.findIndex((s) => s.id === currentStep) > index
                      ? 'bg-green-600'
                      : 'bg-gray-300'
                  }`}
                >
                  {steps.findIndex((s) => s.id === currentStep) > index ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1 h-1 bg-gray-300 mx-2">
                  {index < steps.length - 1 && (
                    <div
                      className={`h-full transition-all ${
                        steps.findIndex((s) => s.id === currentStep) > index
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-center">
            {steps.map((step) => (
              <div key={step.id} className="flex-1">
                <p
                  className={`font-semibold ${
                    currentStep === step.id
                      ? 'text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Delivery Step */}
            {currentStep === 'delivery' && (
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informações de Entrega
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={deliveryForm.fullName}
                      onChange={handleDeliveryChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={deliveryForm.email}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={deliveryForm.phone}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      CEP *
                    </label>
                    <input
                      type="text"
                      name="cep"
                      value={deliveryForm.cep}
                      onChange={handleDeliveryChange}
                      placeholder="00000-000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Rua *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={deliveryForm.street}
                      onChange={handleDeliveryChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Número *
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={deliveryForm.number}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complement"
                        value={deliveryForm.complement}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={deliveryForm.city}
                        onChange={handleDeliveryChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Estado *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={deliveryForm.state}
                        onChange={handleDeliveryChange}
                        placeholder="SP"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Método de Pagamento
                </h2>

                <div className="space-y-4 mb-6">
                  <label className="flex items-center p-4 border-2 border-blue-600 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="method"
                      value="credit-card"
                      checked={paymentForm.method === 'credit-card'}
                      onChange={handlePaymentChange}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-semibold text-gray-900">
                      Cartão de Crédito
                    </span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                    <input
                      type="radio"
                      name="method"
                      value="pix"
                      checked={paymentForm.method === 'pix'}
                      onChange={handlePaymentChange}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-semibold text-gray-900">PIX</span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                    <input
                      type="radio"
                      name="method"
                      value="boleto"
                      checked={paymentForm.method === 'boleto'}
                      onChange={handlePaymentChange}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-semibold text-gray-900">Boleto</span>
                  </label>
                </div>

                {/* Credit Card Form */}
                {paymentForm.method === 'credit-card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Nome no Cartão *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentForm.cardName}
                        onChange={handlePaymentChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Número do Cartão *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentForm.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Validade *
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={paymentForm.cardExpiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          CVC *
                        </label>
                        <input
                          type="text"
                          name="cardCVC"
                          value={paymentForm.cardCVC}
                          onChange={handlePaymentChange}
                          placeholder="000"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PIX Form */}
                {paymentForm.method === 'pix' && (
                  <div>
                    <p className="text-gray-700 mb-4">
                      Você receberá o código PIX para copiar e colar no seu banco.
                    </p>
                  </div>
                )}

                {/* Boleto Form */}
                {paymentForm.method === 'boleto' && (
                  <div>
                    <p className="text-gray-700 mb-4">
                      Você receberá o boleto por email para imprimir e pagar.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Review Step */}
            {currentStep === 'review' && (
              <div className="space-y-6">
                {/* Delivery Summary */}
                <div className="bg-white rounded-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Endereço de Entrega
                  </h3>
                  <p className="text-gray-700">
                    {deliveryForm.fullName}
                    <br />
                    {deliveryForm.street}, {deliveryForm.number}
                    {deliveryForm.complement && ` - ${deliveryForm.complement}`}
                    <br />
                    {deliveryForm.city}, {deliveryForm.state} {deliveryForm.cep}
                  </p>
                  <Button
                    onClick={() => setCurrentStep('delivery')}
                    variant="outline"
                    className="mt-4"
                  >
                    Editar
                  </Button>
                </div>

                {/* Payment Summary */}
                <div className="bg-white rounded-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Método de Pagamento
                  </h3>
                  <p className="text-gray-700">
                    {paymentForm.method === 'credit-card'
                      ? `Cartão: **** **** **** ${paymentForm.cardNumber.slice(-4)}`
                      : paymentForm.method === 'pix'
                      ? 'PIX'
                      : 'Boleto'}
                  </p>
                  <Button
                    onClick={() => setCurrentStep('payment')}
                    variant="outline"
                    className="mt-4"
                  >
                    Editar
                  </Button>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Itens do Pedido
                  </h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center pb-3 border-b border-gray-200"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
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

              {currentStep !== 'review' && (
                <Button
                  onClick={handleContinue}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold flex items-center justify-center gap-2"
                >
                  Continuar <ChevronRight className="w-5 h-5" />
                </Button>
              )}

              {currentStep === 'review' && (
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                >
                  Confirmar Pedido
                </Button>
              )}

              <Link href="/carrinho">
                <a className="text-center text-blue-600 hover:text-blue-700 text-sm mt-4 block">
                  Voltar ao Carrinho
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
