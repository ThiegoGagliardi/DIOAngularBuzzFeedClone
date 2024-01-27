import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzResultComponent } from "../quizz-result/quizz-result.component";
import { QuizzOptionComponent } from "../quizz-option/quizz-option.component";
import { QuizzQuestionComponent } from "../quizz-question/quizz-question.component"
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule, QuizzResultComponent, QuizzOptionComponent, QuizzQuestionComponent],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {

  title             : string         = "Título";    
  quizz             : IQuizz         = {title : "", questions : [], results : []}
  selectedQuestion  : IQuizzQuestion = {id : 0 ,question : "", options : []};
  
  answers          : string [] = [];
  selectedAnswer   : string = "";

  questionIndex    : number  = 0;
  finished         : boolean = false;

  ngOnInit(): void {
    
    if (quizz_questions) {

      this.finished  = false;
      
      this.quizz             = JSON.parse(JSON.stringify(quizz_questions)) as IQuizz;
      this.title             = this.quizz.title;
      this.selectedQuestion  = this.quizz.questions[this.questionIndex];
    }
  }

 playerChoose (choose : string) : void{

     this.answers.push(choose);
     this.nextStep();
  }

async nextStep() {
            
    this.questionIndex += 1;
    
    if (this.questionIndex < this.quizz.questions.length-1){

      this.selectedQuestion  = this.quizz.questions[this.questionIndex];      
    } else {

      this.finished       = true;      
      const finalResult   = await this.checkResult();
      this.selectedAnswer = String(this.quizz.results[finalResult as keyof typeof this.quizz.results]);
    }
  }

async checkResult()
{
  const result = this.answers.reduce((previous, current, i, arr) =>
  {
    if (arr.filter(item => item === previous).length >  arr.filter(item => item === current).length){
       return previous;
    }else {
      return current;
    }
  })

  return result;
}

}

interface IQuizz {

  title     : string; 
  questions : IQuizzQuestion[];
  results   : IQuizzResults[];
}

interface IQuizzOption
{
  
   id    : number;
   name  : string;
   alias : string;
}

interface IQuizzQuestion
{

   id        : number;
   question  : string;
   options   : IQuizzOption[];  
}

interface IQuizzResults {
    [key: string]: string;
}
