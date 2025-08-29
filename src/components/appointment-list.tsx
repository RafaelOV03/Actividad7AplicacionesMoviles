'use client';
import type { Appointment } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';
import { BellRing, Clock, Smartphone } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type AppointmentListProps = {
  appointments: Appointment[];
};

export default function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-2xl">Próximas Citas</CardTitle>
        <CardDescription>
          Tienes {appointments.length} cita(s) programada(s).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Smartphone className="h-16 w-16 mb-4" />
                <p className="text-lg font-medium">Aún no hay citas.</p>
                <p>Usa el formulario para reservar tu primera cita.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((app) => (
                <Card key={app.id} className="bg-background/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center p-3 bg-accent rounded-lg text-primary">
                        <span className="text-sm font-bold tracking-tighter capitalize">{format(app.dateTime, 'MMM', { locale: es })}</span>
                        <span className="text-2xl font-bold">{format(app.dateTime, 'd', { locale: es })}</span>
                      </div>
                      <div className='flex-1'>
                        <div className="text-lg font-semibold">{app.reason}</div>
                        <div className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                           <Clock className="h-4 w-4" /> {format(app.dateTime, 'p', { locale: es })}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-sm text-muted-foreground mt-2 p-3 bg-accent/30 rounded-lg flex items-start gap-3">
                        <BellRing className="h-4 w-4 mt-1 shrink-0 text-primary"/>
                        <p>{app.reminderMessage}</p>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
