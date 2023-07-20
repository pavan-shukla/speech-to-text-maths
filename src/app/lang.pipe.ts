import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lang' })
export class LangPipe implements PipeTransform {
  transform(n: number, loc): string {
    if (loc === 'gu-IN') {
      return this.translateNumerals(n, 'gujarati');
    } else if (loc === 'ta-IN') {
      return this.translateNumerals(n, 'tamil');
    } else if (loc === 'te-IN') {
      return this.translateNumerals(n, 'telugu');
    } else if (loc === 'hi-IN') {
      return this.translateNumerals(n, 'devanagari');
    }
    return n + '';
  }

  translateNumerals(input, target) {
    var systems = {
        devanagari: 2406,
        tamil: 3046,
        kannada: 3302,
        telugu: 3174,
        marathi: 2406,
        malayalam: 3430,
        oriya: 2918,
        gurmukhi: 2662,
        nagari: 2534,
        gujarati: 2790,
      },
      zero = 48, // char code for Arabic zero
      nine = 57, // char code for Arabic nine
      offset = (systems[target.toLowerCase()] || zero) - zero,
      output = input.toString().split(''),
      l = output.length,
      cc;

    for (let i = 0; i < l; i++) {
      cc = output[i].charCodeAt(0);
      if (cc >= zero && cc <= nine) {
        output[i] = String.fromCharCode(cc + offset);
      }
    }
    return output.join('');
  }
}
