import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarAlfabeticamente'
})
export class OrdenarAlfabeticamentePipe implements PipeTransform {

    transform(lista: any[], campo: string): any[] {
    if (!lista || !campo) return lista;

    return lista.sort((a, b) =>
      a[campo].localeCompare(b[campo])
    );
  }

}
