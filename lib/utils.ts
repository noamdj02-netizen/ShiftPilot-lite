import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateHours(start: string, end: string): number {
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  let hours = endH - startH + (endM - startM) / 60;
  if (hours < 0) hours += 24;
  return hours;
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('');
}

export const JOURS_SEMAINE = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const ROLES = [
  'Serveur', 'Serveuse', 'Barman', 'Barmaid', 'Chef de rang', 'Commis',
  'Chef cuisinier', 'Second de cuisine', 'Plongeur', 'Hôte/Hôtesse', 'Manager'
];

export const COLORS = ['#8B5CF6', '#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#EF4444', '#06B6D4', '#84CC16'];

