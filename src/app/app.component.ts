import { Component, OnInit } from '@angular/core';
import { PEOPLE } from './shared/constants/listas.constants';
import { ITipoCard, TipoCard } from './shared/model/tipo-card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rule-of-thumb-ng';
  tipoCard = new TipoCard();
  tipoCards: Array<ITipoCard> = [{id: 1, nombreTipo: 'List'},{id:2, nombreTipo: 'Grid'}];
  cards: any = [];
  thumb: any = 'assets/img/thumbs-up.svg';
  widthScreen: any = screen.width;

  constructor() {
    // localStorage.setItem('prueba', JSON.stringify(PEOPLE))
  }

  ngOnInit(): void {
    this.tipoCard = this.tipoCards[1];
    if(localStorage.getItem('prueba')===null){
      PEOPLE.forEach((element: any) => {
        element['typeVote'] = 'Disabled';
        element['voteAgain'] = false;
      });
      localStorage.setItem('prueba', JSON.stringify(PEOPLE));
      this.cards = PEOPLE;
    }else {
      this.cards = JSON.parse(localStorage.getItem('prueba')!);
    }
    console.log(this.cards);
  }

  formatTime(time: string){
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let date = new Date(time);
    let now = new Date();
    const utc1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    let dif = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    let result = 'some hours ago in';
    if( dif > 365 ) {
      let year = Math.floor(dif/365);
      if(year > 1){
        result = year + ' years ago in ';
      }else {
        result = year + ' year ago in ';
      }
    }else if(dif > 30){
      let month = Math.floor(dif/30);
      if(month > 1){
        result = month + ' months ago in ';
      }else {
        result = month + ' month ago in ';
      }
    }else if(dif > 7){
      let week = Math.floor(dif/7);
      if(week > 1){
        result = week + ' weeks ago in ';
      }else {
        result = week + ' week ago in ';
      }
    }else if(dif > 1){
      if(dif > 1){
        result = dif + ' days ago in ';
      }else {
        result = dif + ' day ago in ';
      }
    }
    return result;
  }

  upperCaseFirstLetter(category: string) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  getWidthP(votes: any){
    let percentage = (votes.positive * 100 / (votes.positive + votes.negative)).toFixed(1) + '%';
    return percentage;
  }

  getWidthN(votes: any){
    let percentage = (votes.negative * 100 / (votes.positive + votes.negative)).toFixed(1) + '%';
    return percentage;
  }

  votePositive(person: any){
    this.cards.forEach((element: any) => {
      if(element.name === person.name){
        element['typeVote'] = 'Positive';
      }});
  }

  voteNegative(person: any){
    this.cards.forEach((element: any) => {
      if(element.name === person.name){
        element['typeVote'] = 'Negative';
      }});
  }

  voteNow(person: any){
    if(person.voteAgain){
      this.cards.forEach((element: any) => {
        if(element.name === person.name){
          person.typeVote = 'Disabled';
          person.voteAgain = false;
        }
      })
    }else {
      this.cards.forEach((element: any) => {
        if(element.name === person.name){
          person.voteAgain = true;
          if(person.typeVote === 'Positive'){
            person.votes.positive = person.votes.positive + 1;
          }else if(person.typeVote === 'Negative'){
            person.votes.negative = person.votes.negative + 1;
          }
        }
      })
    }
    console.log(this.cards);
    localStorage.setItem('prueba', JSON.stringify(this.cards));
  }

}
