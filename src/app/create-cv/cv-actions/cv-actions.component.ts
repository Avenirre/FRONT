import { Component, OnInit } from '@angular/core';
import {CvService} from '../../../services/cv.service';
import {CV} from '../../../models/cv/cv.model';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import { ClipboardService } from 'ngx-clipboard';
import {NgForm} from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cv-actions',
  templateUrl: './cv-actions.component.html',
  styleUrls: ['./cv-actions.component.scss']
})
export class CvActionsComponent implements OnInit {
  cv: CV;
  onlyShowMode = true;
  url_share: string;
  alertClass = [];
  alertText = '';
  alertVisible = false;
  formValid = false;
  activatedField: string;
  alertShow = false;

  constructor(private cvService: CvService,
              private route: ActivatedRoute,
              private _clipboardService: ClipboardService) { }

  ngOnInit() {
    this.onlyShowMode = this.cvService.onlyShowMode;
    this.cvService.cvChanged.subscribe((cv: CV) => {
      this.cv = cv;
      this.onlyShowMode = this.cvService.onlyShowMode;
    });
    this.cvService.changedForm.subscribe(
        (form: NgForm) => {
            const fValid = this.formValid = form.valid;
            const sValid = this.cv.skills.length > 0 ? true : false;
            this.formValid = fValid && sValid;
        }
    );
    this.cvService.lightPresentationField.subscribe(
        (field) => {
            this.activatedField = field;
        }
    );
    this.route.params.subscribe(
        (params) => {
          if (params['id']) {
             // this.alertClass = ['text-success'];
             this.url_share = window.location.host + '/cv/' + params['id'];
             this.alertText = `Link on this CV: <a link='${this.url_share}'>${this.url_share}</a>, was copied to the clipboard.`;
             document.execCommand('copy');
             this.alertShow = false;
          } else {
             this.alertClass = ['text-danger'];
             this.alertText = 'This CV cant`t be shared. Please save this CV before sharing.';
          }
        }
    );
  }

    activateCv() {
        this.cvService.setCV().activated = true;
        this.saveCv();
    }

    saveCv() {
        this.cv = this.cvService.setCV();
        this.cvService.saveCV();
    }

    copyLink() {
        if (this.url_share) {
            this._clipboardService.copyFromContent(this.url_share);
        }
        this.alertVisible = true;
    }
    printCv(elem) {
        // window.document.getElementById()
        const mywindow = window.open('', '');
        mywindow.document.head.innerHTML = document.head.innerHTML;
        mywindow.document.head.innerHTML += `<style>@page { size: auto;  margin: 0px;}</style>`;
        const printElem = '<div id="printElem">' + document.getElementById(elem).innerHTML + '<div>';
        mywindow.document.body.innerHTML = printElem;
        mywindow.document.getElementById('printElem').setAttribute('style', 'margin: 120px;');
        console.log(mywindow.document);

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        setTimeout(() => {
            mywindow.print();
            mywindow.close();
        }, 100);

        return true;
    }

    downloadPdf() {
        // const doc = new jsPDF();
        //
        // doc.addHTML(document.getElementById('printPdf'), function() {
        //     doc.save('test.pdf');
        // });

        const data = document.getElementById('printPdf');
        let bg = document.getElementById('h-bg').style.zIndex = '-1';
        html2canvas(data).then(canvas => {
            bg = document.getElementById('h-bg').style.zIndex = '0';
            // Few necessary setting options
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
            const position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('MYPdf.pdf'); // Generated PDF
        });
    }
}
