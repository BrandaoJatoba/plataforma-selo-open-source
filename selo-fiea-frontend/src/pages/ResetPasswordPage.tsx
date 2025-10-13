import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { LoginHeader } from "../components/LoginHeader";
import { Footer } from "../components/Footer";
import { CheckCircle2, XCircle } from 'lucide-react'; // Ícones para feedback

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [policy, setPolicy] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  // Função para validar a senha em tempo real
  const validatePassword = (pass: string) => {
    const minLength = pass.length >= 8;
    const uppercase = /[A-Z]/.test(pass);
    const lowercase = /[a-z]/.test(pass);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    setPolicy({ minLength, uppercase, lowercase, specialChar });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      setError('Token de redefinição inválido ou ausente. Por favor, solicite um novo link.');
    }
    setToken(tokenFromUrl);
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    // Valida a política de senha antes de enviar
    const isPolicyMet = Object.values(policy).every(Boolean);
    if (!isPolicyMet) {
      setError('A senha não atende a todos os critérios de segurança.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!token) {
        setError('Token inválido.');
        return;
    }

    // ! Chamar a API do back-end aqui (/api/password/reset)
    // O back-end DEVE revalidar a política de senha por segurança.
    // O back-end é responsável por enviar o e-mail de notificação (AC 02.3).
    console.log("Redefinindo senha com o token:", token);
    setMessage('Senha redefinida com sucesso! Você será redirecionado para o login.');
    
    setTimeout(() => {
        navigate('/login');
    }, 3000);
  };

  const PolicyItem = ({ met, text }: { met: boolean; text: string }) => (
    <li className={`flex items-center ${met ? 'text-green-600' : 'text-gray-500'}`}>
      {met ? <CheckCircle2 size={16} className="mr-2" /> : <XCircle size={16} className="mr-2" />}
      {text}
    </li>
  );

  return (
    <>
      <LoginHeader />
      <main className="hero-bg flex items-center justify-center min-h-screen py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Redefinir sua Senha</h2>
            </div>
            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {message && <p className="text-green-600 text-center mb-4">{message}</p>}

            {token && !message && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                {/* Bloco de política de senha com feedback em tempo real */}
                <div className="mb-4 text-sm">
                  <ul className="space-y-1">
                    <PolicyItem met={policy.minLength} text="Pelo menos 8 caracteres" />
                    <PolicyItem met={policy.uppercase} text="Uma letra maiúscula" />
                    <PolicyItem met={policy.lowercase} text="Uma letra minúscula" />
                    <PolicyItem met={policy.specialChar} text="Um caractere especial (!@#$...)" />
                  </ul>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirme a Nova Senha</label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <button type="submit" className="w-full bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-all shadow-sm">
                    Salvar Nova Senha
                  </button>
                </div>
              </form>
            )}
            
            {!token && (
                 <Link to="/login" className="mt-6 inline-block text-blue-600 hover:underline">Voltar para o Login</Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}