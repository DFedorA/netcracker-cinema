import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FeedbackService} from '../../services/feedback.service';

@Component({
  selector: 'app-popup-feedback',
  templateUrl: './popup-feedback.component.html',
  styleUrls: ['./popup-feedback.component.less']
})
export class PopupFeedbackComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;

  form: FormGroup;

  constructor(public feedbackService: FeedbackService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      sender: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    });
  }


  submit(): void {
    const fd = {
      sender: this.form.value.sender,
      message: this.form.value.message
    };

    this.feedbackService.create(fd).subscribe(() => {
      this.form.reset();
    });
  }

  close = (): void => {
    this.modal.nativeElement.setAttribute('style', 'display: none');
  }
}

