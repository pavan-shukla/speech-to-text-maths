import { Pipe, PipeTransform } from '@angular/core';

const EN = {
  'help-text': 'Click on next number to generate number',
  'next-number': 'Next number',
  record: 'Record',
  'try-again': 'Try again',
  correct: 'Correct',
};

const GU = {
  'help-text': 'નંબર જનરેટ કરવા માટે આગામી નંબર પર ક્લિક કરો',
  'next-number': 'આગામી નંબર',
  record: 'રેકોર્ડ',
  'try-again': 'ફરીથી પ્રયત્ન કરો',
  correct: 'સાચું',
};

@Pipe({ name: 'translang' })
export class TransLangPipe implements PipeTransform {
  transform(n: string, loc): string {
    if (loc === 'gu-IN') {
      return GU[n];
    }
    return EN[n];
  }
}
