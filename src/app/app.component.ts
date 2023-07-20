import { Component } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Scavenger } from '@wishtack/rx-scavenger';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'wt-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  boo = false;
  speech: string = '';
  voice = '';
  num: any = '';
  correct = false;
  incorrect = false;
  locale = 'gu-IN';
  ngOnInit() {}
  constructor(private _ngZone: NgZone, private translate: TranslateService) {
    translate.setDefaultLang(this.locale);
  }

  useLanguage() {
    this.translate.use(this.locale);
  }

  getTranscript({
    locale = this.locale,
  }: { locale?: string } = {}): Observable<string> {
    return new Observable((observer) => {
      const SpeechRecognition = window['webkitSpeechRecognition'];
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
      if (
        this.speech.indexOf(this.num + '') !== -1 ||
        this.voice.indexOf(this.num + '') !== -1
      ) {
        this.correct = true;
        this.incorrect = false;
      } else {
        this.correct = false;
        this.incorrect = true;
      }
    });
  }

  generateNumber() {
    this.speech = '';
    this.voice = '';
    this.correct = false;
    this.incorrect = false;
    this.num = this.generateRandomInteger(10, 100);
  }

  generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }
}
