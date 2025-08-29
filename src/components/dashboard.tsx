'use client';

import { useState } from 'react';
import { Smartphone, LogOut } from 'lucide-react';
import AppointmentForm from './appointment-form';
import AppointmentList from './appointment-list';
import type { Appointment } from '@/lib/types';
import { generateAppointmentReminder } from '@/ai/flows/generate-appointment-reminder';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

type DashboardProps = {
  onLogout: () => void;
};

export default function Dashboard({ onLogout }: DashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateAppointment = async (data: {
    date: Date;
    time: string;
    reason: string;
  }) => {
    setIsLoading(true);
    try {
      const [hours, minutes] = data.time.split(':').map(Number);
      const appointmentDateTime = new Date(data.date);
      appointmentDateTime.setHours(hours, minutes);

      const reminder = await generateAppointmentReminder({
        appointmentDateTime: appointmentDateTime.toISOString(),
        reason: data.reason,
      });

      const newAppointment: Appointment = {
        id: new Date().toISOString(),
        dateTime: appointmentDateTime,
        reason: data.reason,
        reminderMessage: reminder.reminderMessage,
      };

      setAppointments((prev) => [...prev, newAppointment].sort((a,b) => a.dateTime.getTime() - b.dateTime.getTime()));
      toast({
        title: "¡Éxito!",
        description: "Tu cita ha sido reservada.",
      })
    } catch (error) {
      console.error('Failed to generate reminder:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la cita. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">CitaA7</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Cerrar sesión">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-4">
            <AppointmentForm onSubmit={handleCreateAppointment} isLoading={isLoading} />
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <AppointmentList appointments={appointments} />
          </div>
        </div>
      </main>
    </>
  );
}
