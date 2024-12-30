// [Previous imports and constants remain the same...]

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const FORT_TYPES = ['Hill Fort', 'Sea Fort', 'Land Fort'] as const;
const TREK_DIFFICULTIES = ['Easy', 'Moderate', 'Difficult', 'Very Difficult'] as const;
const REGIONS = ['Konkan', 'Western Maharashtra', 'Vidarbha', 'Marathwada', 'Northern Maharashtra'] as const;

const fortSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(FORT_TYPES),
  district: z.string().min(2, 'District must be at least 2 characters'),
  region: z.enum(REGIONS),
  elevation: z.string(),
  period: z.string(),
  built_by: z.string(),
  significance: z.string(),
  current_status: z.string(),
  best_time_to_visit: z.string(),
  trek_difficulty: z.enum(TREK_DIFFICULTIES),
  entrance_fee: z.string().optional(),
});

type FortFormValues = z.infer<typeof fortSchema>;

export function FortForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FortFormValues>({
    resolver: zodResolver(fortSchema),
    defaultValues: {
      name: '',
      district: '',
      elevation: '',
      period: '',
      built_by: '',
      significance: '',
      current_status: '',
      best_time_to_visit: '',
      entrance_fee: '',
    },
  });

  async function onSubmit(values: FortFormValues) {
    try {
      setIsSubmitting(true);

      const { error } = await supabase
        .from('forts')
        .insert([values]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Fort has been added successfully.",
      });

      router.push('/forts');
      router.refresh();
    } catch (error) {
      console.error('Error adding fort:', error);
      toast({
        title: "Error",
        description: "Failed to add fort. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fort Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter fort name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fort type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FORT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter district" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="elevation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Elevation</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3,000 ft" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trek_difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trek Difficulty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TREK_DIFFICULTIES.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Period</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Medieval" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="built_by"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Built By</FormLabel>
                <FormControl>
                  <Input placeholder="Enter builder/dynasty" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="best_time_to_visit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Best Time to Visit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., October to March" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entrance_fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entrance Fee (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="significance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Historical Significance</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter historical significance and important details"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="current_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Status</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the current condition of the fort"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Fort'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}