import { Component } from '@angular/core';
import { Confirmable } from './decorators/confirmable.decorator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ang-app';
  name = 'General Kenobi';
  changeName(){
    this.name = 'alah'
  }

  @Confirmable('Вы точно хотите удалить блок?')
  add() {
    console.log('Удаляем блок')
  }
}
