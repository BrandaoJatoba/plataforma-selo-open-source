import { useState, useEffect } from 'react';
import type { Criterion, Pilar } from '../pages/CriteriaPage';

interface CriterionFormProps {
  criterion?: Criterion | null;
  onSave: (criterion: Omit<Criterion, 'id'> & { id?: number }) => void;
  onCancel: () => void;
}

export function CriterionForm({ criterion, onSave, onCancel }: CriterionFormProps) {
  const [formData, setFormData] = useState<Omit<Criterion, 'id'>>({
    pilar: 'Qualidade',
    descricao: '',
    peso: 3,
  });

  useEffect(() => {
    if (criterion) {
      setFormData({
        pilar: criterion.pilar,
        descricao: criterion.descricao,
        peso: criterion.peso,
      });
    }
  }, [criterion]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'peso' ? parseInt(value, 10) : name === 'pilar' ? value as Pilar : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: criterion?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      <h3 className="text-xl font-bold text-gray-800">{criterion ? 'Editando Critério' : 'Novo Critério'}</h3>
      <div>
        <label htmlFor="pilar" className="block text-sm font-medium text-gray-700">Pilar</label>
        <select
          id="pilar"
          name="pilar"
          value={formData.pilar}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-2"
        >
          <option value="Qualidade">Qualidade</option>
          <option value="Sustentabilidade">Sustentabilidade</option>
          <option value="Inovação Tecnológica">Inovação Tecnológica</option>
        </select>
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1"
          required
        />
      </div>

      <div>
        <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso ({formData.peso})</label>
        <input type="range" id="peso" name="peso" min="1" max="5" value={formData.peso} onChange={handleChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancelar</button>
        <button type="submit" className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800">Salvar</button>
      </div>
    </form>
  );
}