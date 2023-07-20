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

const TA = {
  'help-text': 'எண்ணை உருவாக்க அடுத்த எண்ணைக் கிளிக் செய்யவும்',
  'next-number': 'அடுத்த எண்',
  record: 'பதிவு',
  'try-again': 'மீண்டும் முயற்சி செய்',
  correct: 'சரி',
};

const HI = {
  'help-text': 'नंबर जनरेट करने के लिए अगला नंबर पर क्लिक करें',
  'next-number': 'अगला नंबर',
  record: 'रिकॉर्ड',
  'try-again': 'पुनः प्रयास करें',
  correct: 'सही',
};

const TE = {
  'help-text': 'సంఖ్యను రూపొందించడానికి తదుపరి సంఖ్యపై క్లిక్ చేయండి',
  'next-number': 'తదుపరి సంఖ్య',
  record: 'రికార్డు',
  'try-again': 'మళ్ళీ ప్రయత్నించండి',
  correct: 'సరైన',
};

@Pipe({ name: 'translang' })
export class TransLangPipe implements PipeTransform {
  transform(n: string, loc): string {
    if (loc === 'gu-IN') {
      return GU[n];
    } else if (loc === 'ta-IN') {
      return TA[n];
    } else if (loc === 'te-IN') {
      return TE[n];
    } else if (loc === 'hi-IN') {
      return HI[n];
    }
    return EN[n];
  }
}
