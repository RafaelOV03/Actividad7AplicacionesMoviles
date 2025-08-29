'use server';

/**
 * @fileOverview Genera un mensaje de recordatorio para una próxima cita.
 *
 * - generateAppointmentReminder - Una función que genera un mensaje de recordatorio.
 * - GenerateAppointmentReminderInput - El tipo de entrada para la función generateAppointmentReminder.
 * - GenerateAppointmentReminderOutput - El tipo de retorno para la función generateAppointmentReminder.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAppointmentReminderInputSchema = z.object({
  appointmentDateTime: z.string().describe('La fecha y hora de la cita (formato ISO).'),
  reason: z.string().describe('El motivo de la cita.'),
});
export type GenerateAppointmentReminderInput = z.infer<typeof GenerateAppointmentReminderInputSchema>;

const GenerateAppointmentReminderOutputSchema = z.object({
  reminderMessage: z.string().describe('El mensaje de recordatorio generado.'),
});
export type GenerateAppointmentReminderOutput = z.infer<typeof GenerateAppointmentReminderOutputSchema>;

export async function generateAppointmentReminder(
  input: GenerateAppointmentReminderInput
): Promise<GenerateAppointmentReminderOutput> {
  return generateAppointmentReminderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAppointmentReminderPrompt',
  input: {schema: GenerateAppointmentReminderInputSchema},
  output: {schema: GenerateAppointmentReminderOutputSchema},
  prompt: `Eres un asistente útil que genera mensajes de recordatorio para citas.

  Genera un mensaje de recordatorio amigable y conciso para la siguiente cita, para ser enviado 15 minutos antes de la hora programada.

  Fecha y Hora de la Cita: {{{appointmentDateTime}}}
  Motivo: {{{reason}}}

  El mensaje de recordatorio debe indicar claramente la hora y el motivo de la cita, en español.
  `,
});

const generateAppointmentReminderFlow = ai.defineFlow(
  {
    name: 'generateAppointmentReminderFlow',
    inputSchema: GenerateAppointmentReminderInputSchema,
    outputSchema: GenerateAppointmentReminderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
