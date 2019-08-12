
class QuestionGenerator {
    constructor() {
        let index = 0;
        const questions = [
          {
              question: "5 * 3 = 8",
               answer: false
            },
           {
              question: "5 + 3 = 8",
              answer: true
           }
         ];
    };
    
    nextQuestion() {

    }

    hasMoreQuestions() {
        return false;
    }
}