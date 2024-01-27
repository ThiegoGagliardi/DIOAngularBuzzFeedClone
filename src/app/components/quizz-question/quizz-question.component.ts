import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quizz-question',
  standalone: true,
  imports: [],
  templateUrl: './quizz-question.component.html',
  styleUrl: './quizz-question.component.css'
})
export class QuizzQuestionComponent {

  @Input()
  question : String = "";

}
