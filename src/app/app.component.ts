import { Component } from '@angular/core';

import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';

declare let gtag: Function;

@Component({
  selector: 'wt-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  boo = false;
  speech: string = '';
  voice = '';
  num1: any = '';
  num2: any = '';
  correct = false;
  incorrect = false;
  locale = 'gu-IN';
  mathType = 'numbers';
  ngOnInit() {}
  constructor(private _ngZone: NgZone) {}

  getTranscript({
    locale = this.locale,
  }: { locale?: string } = {}): Observable<string> {
    return new Observable((observer) => {
      const SpeechRecognition =
        window['webkitSpeechRecognition'] || window['SpeechRecognition'];
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = locale;
      speechRecognition.onresult = (speechRecognitionEvent) => {
        var interim_transcript = '';
        for (
          var i = speechRecognitionEvent.resultIndex;
          i < speechRecognitionEvent.results.length;
          ++i
        ) {
          if (speechRecognitionEvent.results[i].isFinal) {
            this.boo = true;
            this._ngZone.run(() =>
              observer.next(
                speechRecognitionEvent.results[i][0].transcript.trim()
              )
            );
          } else {
            this.boo = false;
            interim_transcript +=
              speechRecognitionEvent.results[i][0].transcript;
            this._ngZone.run(() => observer.next(interim_transcript.trim()));
          }
        }
      };
      speechRecognition.start();

      return () => speechRecognition.abort();
    });
  }
  recognize() {
    this.getTranscript().subscribe((transcript) => {
      if (transcript !== '' && this.boo) {
        this.voice = this.voice + ' ' + transcript;
      } else {
        this.speech = transcript;
      }
      this.validate();
    });
  }

  validate() {
    switch (this.mathType) {
      case 'additionSingleD':
      case 'addition': {
        if (
          this.speech.indexOf(this.num1 + this.num2 + '') !== -1 ||
          this.voice.indexOf(this.num1 + this.num2 + '') !== -1
        ) {
          this.correct = true;
          this.incorrect = false;
        } else {
          this.correct = false;
          this.incorrect = true;
        }
        break;
      }
      case 'subtractionSingleD':
      case 'subtraction': {
        if (
          this.speech.indexOf(this.num1 - this.num2 + '') !== -1 ||
          this.voice.indexOf(this.num1 - this.num2 + '') !== -1
        ) {
          this.correct = true;
          this.incorrect = false;
        } else {
          this.correct = false;
          this.incorrect = true;
        }
        break;
      }
      case 'multiplication': {
        if (
          this.speech.indexOf(this.num1 * this.num2 + '') !== -1 ||
          this.voice.indexOf(this.num1 * this.num2 + '') !== -1
        ) {
          this.correct = true;
          this.incorrect = false;
        } else {
          this.correct = false;
          this.incorrect = true;
        }
        break;
      }
      case 'numbers':
      default: {
        if (
          this.speech.indexOf(this.num1 + '') !== -1 ||
          this.voice.indexOf(this.num1 + '') !== -1
        ) {
          this.correct = true;
          this.incorrect = false;
        } else {
          this.correct = false;
          this.incorrect = true;
        }
        break;
      }
    }
  }

  generateNumber() {
    this.speech = '';
    this.voice = '';
    this.correct = false;
    this.incorrect = false;

    this.generateNums();
    gtag('event', 'Generate_Number | ' + this.mathType);
  }

  generateNums() {
    switch (this.mathType) {
      case 'addition': {
        this.num1 = this.generateRandomInteger(10, 100);
        this.num2 = this.generateRandomInteger(0, 99);
        break;
      }
      case 'subtraction': {
        this.num1 = this.generateRandomInteger(10, 100);
        this.num2 = this.generateRandomInteger(0, this.num1);
        break;
      }
      case 'subtractionSingleD':
      case 'additionSingleD': {
        this.num1 = this.generateRandomInteger(10, 100);
        this.num2 = this.generateRandomInteger(1, 10);
        break;
      }
      case 'multiplication': {
        this.num1 = this.generateRandomInteger(1, 10);
        this.num2 = this.generateRandomInteger(1, 10);
        break;
      }
      case 'numbers':
      default: {
        this.num1 = this.generateRandomInteger(10, 100);
        break;
      }
    }
  }

  generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }
}
