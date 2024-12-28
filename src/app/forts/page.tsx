import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { FortsContainer } from '@/components/FortsContainer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

async function getForts() {
  const { data: forts, error } = await supabase
    .from('forts')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching forts:', error);
    return [];
  }

  return forts;
}

export default async function FortsPage() {
  const forts = await getForts();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Maharashtra Forts</h1>
        <Button asChild>
          <a href="/forts/new" className="gap-2">
            <PlusCircle size={20} />
            Add New Fort
          </a>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <FortCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <FortsContainer initialForts={forts} />
      </Suspense>
    </div>
  );
}

function FortCardSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <div className="relative w-full h-48 mb-4 bg-muted rounded-t-lg" />
      <div className="flex justify-between items-start mb-4">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}