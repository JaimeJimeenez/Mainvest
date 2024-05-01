import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postDateFormatter',
  standalone: true
})
export class PostDateFormatterPipe implements PipeTransform {

  transform(value: unknown): string | null {
    if (typeof value !== 'string' && !(value instanceof Date)) {
      return null;
    }

    const date = new Date(value); // string o Date
    const actualDate = new Date();
    const difference = actualDate.getTime() - date.getTime();
    const pastMinutes = Math.floor(difference / (1000 * 60));

    if (pastMinutes < 60) {
        return pastMinutes === 1 ? 'hace 1 minuto' : `hace ${pastMinutes} minutos`;
    }

    const pastHours = Math.floor(pastMinutes / 60);
    if (pastHours < 24) {
        return pastHours === 1 ? 'hace 1 hora' : `hace ${pastHours} horas`;
    }

    const pastDays = Math.floor(pastHours / 24);
    if (pastDays < 7) {
        return pastDays === 1 ? 'hace 1 día' : `hace ${pastDays} días`;
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return `el ${date.toLocaleDateString('es-ES', options)}`;
  }
}
