import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // modalState;
  isBlur = false;

  constructor(
    private modalService: ModalService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.modalService.modalClosed.subscribe(
      modalState => {
        this.isBlur = modalState;
      }
    )
    // this.modalService.modalStateChanged.subscribe((state: string) => {
      // this.modalState = state;
    // });
    // this.api.getQuery().subscribe(
    //   (data) => console.log(data),
    //   (error) => console.log(error));
  }
}
