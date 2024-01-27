import { Component, Input } from '@angular/core';

@Component({
  
  selector: 'app-quizz-option',
  standalone: true,
  imports: [],
  templateUrl: './quizz-option.component.html',
  styleUrl: './quizz-option.component.css'
})
export class QuizzOptionComponent {

   @Input()
   option : string = "";
}
