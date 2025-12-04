import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-900 mb-2">
          Página não encontrada
        </p>
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está procurando não existe.
        </p>
        <Link href="/">
          <a>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Voltar ao Início
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
