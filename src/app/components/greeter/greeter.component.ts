import { Component, Input, OnChanges } from '@angular/core';
import { trackChanges } from 'src/app/decorators/change.decorator';
import { GreevusDecorator } from 'src/app/decorators/greevus.decorator';
import { Safe } from 'src/app/decorators/safe.decorator';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.scss']
})
export class GreeterComponent implements OnChanges {

  @GreevusDecorator()
  @Input()
  public name: string = '';

  public variable;

  constructor() { }

  @trackChanges('name', 'toUpper')
  ngOnChanges() {
    console.log(this.doSmth());
  }

  // @Safe()
  doSmth() {
    // console.log(this.variable['test'])
  }
  toUpper(name: string) {
    this.name = name.toUpperCase();
  }

}
