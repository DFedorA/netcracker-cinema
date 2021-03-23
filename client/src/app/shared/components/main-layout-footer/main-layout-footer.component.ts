import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-layout-footer',
  templateUrl: './main-layout-footer.component.html',
  styleUrls: ['./main-layout-footer.component.less']
})
export class MainLayoutFooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  getPopup = (): void => {
    const modal = document.getElementsByClassName('modal');
    modal.item(0).setAttribute('style', 'display: block');
  }
}
