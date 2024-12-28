import { Database } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Fort = Database['public']['Tables']['forts']['Row'];

interface FortCardProps {
  fort: Fort;
}

export function FortCard({ fort }: FortCardProps) {
  // Handle the image array safely
  const imageArray = Array.isArray(fort.img) ? fort.img : [];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      {imageArray.length > 0 && (
        <div className="relative w-full h-48">
          <Carousel className="w-full">
            <CarouselContent>
              {imageArray.map((image, index) => (
                <CarouselItem key={index} className="relative h-48">
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${fort.name} - Image ${index + 1}`}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {imageArray.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
        </div>
      )}
      <Link href={`/forts/${fort.id}`}>

        <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
          <div>
            <h3 className="font-bold text-lg">{fort.name}</h3>
            <p className="text-sm text-muted-foreground">{fort.district}, {fort.region}</p>
          </div>
          <Badge variant={
            fort.type === 'Hill Fort' ? 'default' :
              fort.type === 'Sea Fort' ? 'secondary' : 'outline'
          }>
            {fort.type}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Elevation</p>
              <p>{fort.elevation}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Trek Difficulty</p>
              <p>{fort.trek_difficulty}</p>
            </div>
            {fort.significance && (
              <div className="col-span-2 mt-2">
                <p className="text-muted-foreground italic line-clamp-2">
                  {fort.significance}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}