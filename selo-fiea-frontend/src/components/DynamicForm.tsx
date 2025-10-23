import { useState, useEffect } from 'react';
import type { Badge } from '../pages/BadgesPage';
import { X } from 'lucide-react';

interface DynamicFormProps {
  badge: Badge | null;
  onClose: () => void;
  onSave: (badge: Badge) => void;
}

interface BadgeForm {
  name: string;
  description: string;
  icon: string;
  criteria: string[];
  validadeMeses: number;
  dataInicioEmissao: string; // Mantém formato "YYYY-MM-DD"
  dataFimEmissao: string;
}

export function DynamicForm({ badge, onClose, onSave }: DynamicFormProps) {
  const [formData, setFormData] = useState<BadgeForm>({
    name: '',
    description: '',
    icon: '',
    criteria: [],
    validadeMeses: 12,
    dataInicioEmissao: '',
    dataFimEmissao: '',
  });

  const [criteriaInput, setCriteriaInput] = useState('');

  useEffect(() => {
    if (badge) {
      setFormData({
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        criteria: badge.criteria,
        validadeMeses: badge.validadeMeses,
        dataInicioEmissao: badge.dataInicioEmissao
          ? new Date(badge.dataInicioEmissao).toISOString().split('T')[0]
          : '',
        dataFimEmissao: badge.dataFimEmissao
          ? new Date(badge.dataFimEmissao).toISOString().split('T')[0]
          : '',
      });
    }
  }, [badge]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleAddCriteria = () => {
    if (criteriaInput.trim()) {
      setFormData(prev => ({
        ...prev,
        criteria: [...prev.criteria, criteriaInput.trim()],
      }));
      setCriteriaInput('');
    }
  };

  const handleRemoveCriteria = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      criteria: prev.criteria.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const badgeToSave: Badge = {
      ...formData,
      id: badge?.id || 0,
      dataInicioEmissao: formData.dataInicioEmissao
        ? new Date(formData.dataInicioEmissao)
        : new Date(),
      dataFimEmissao: formData.dataFimEmissao
        ? new Date(formData.dataFimEmissao)
        : new Date(),
    } as Badge;

    onSave(badgeToSave);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {badge ? 'Editar Selo' : 'Criar Novo Selo'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Selo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
              required
            />
          </div>

          {/* Descrição */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
              required
            />
          </div>

          {/* Ícone */}
          <div className="mb-4">
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-gray-700"
            >
              URL do Ícone
            </label>
            <input
              type="url"
              name="icon"
              id="icon"
              value={formData.icon}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
              placeholder="https://exemplo.com/icone.png"
              required
            />
          </div>

          {/* Datas e validade */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="validadeMeses"
                className="block text-sm font-medium text-gray-700"
              >
                Validade (meses)
              </label>
              <input
                type="number"
                name="validadeMeses"
                id="validadeMeses"
                value={formData.validadeMeses}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dataInicioEmissao"
                className="block text-sm font-medium text-gray-700"
              >
                Início da Emissão
              </label>
              <input
                type="date"
                name="dataInicioEmissao"
                id="dataInicioEmissao"
                value={formData.dataInicioEmissao}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dataFimEmissao"
                className="block text-sm font-medium text-gray-700"
              >
                Fim da Emissão
              </label>
              <input
                type="date"
                name="dataFimEmissao"
                id="dataFimEmissao"
                value={formData.dataFimEmissao}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
                required
              />
            </div>
          </div>

          {/* Critérios */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Critérios
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                value={criteriaInput}
                onChange={e => setCriteriaInput(e.target.value)}
                className="flex-grow border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
                placeholder="Adicionar um critério"
              />
              <button
                type="button"
                onClick={handleAddCriteria}
                className="bg-gray-200 px-4 rounded-r-md hover:bg-gray-300"
              >
                Adicionar
              </button>
            </div>

            <ul className="mt-2 space-y-1 list-disc list-inside">
              {formData.criteria.map((c, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{c}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCriteria(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ações */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800"
            >
              {badge? 'Salvar' : 'Criar Selo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
