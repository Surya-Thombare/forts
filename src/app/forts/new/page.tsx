import { FortForm } from '@/components/FortForm';

export default function AddFortPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Fort</h1>
      <div className="max-w-2xl">
        <FortForm />
      </div>
    </div>
  );
}