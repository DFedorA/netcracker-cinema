import { Component, OnInit } from '@angular/core';
import {Feedback} from "../../shared/Interfaces";
import {Subscription} from "rxjs";
import {FeedbackService} from "../../shared/services/feedback.service";

@Component({
  selector: 'app-feedback-page-view',
  templateUrl: './feedback-page-view.component.html',
  styleUrls: ['./feedback-page-view.component.less']
})
export class FeedbackPageViewComponent implements OnInit {

  feedbacks: Feedback[];
  fSub: Subscription;

  constructor(private feedbackService: FeedbackService) {
  }

  ngOnInit(): void {
    this.fSub = this.feedbackService.fetch().subscribe(feedback => {
      this.feedbacks = feedback;
    });
  }

  remove(id) {
    const decision = window.confirm('Вы уверены, что хотите удалить этот отзыв?');
    if (decision) {
      this.fSub = this.feedbackService.delete(id)
        .subscribe(
          res => {
            console.log(res.message);
          },
          error => {
            console.log(error.error.message);
          },
          () => {
            this.feedbacks = this.feedbacks.filter(feedback => feedback._id !== id);
          }
        );
    }
  }
}
