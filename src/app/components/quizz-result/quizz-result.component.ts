import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quizz-result',
  standalone: true,
  imports: [],
  templateUrl: './quizz-result.component.html',
  styleUrl: './quizz-result.component.css'
})
export class QuizzResultComponent {

  @Input()
  answer : string = "";

}
