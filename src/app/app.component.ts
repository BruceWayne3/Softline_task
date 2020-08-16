import { Component, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  csvRecords: any[] = [];
  header = true;
  displayedColumns: string[] = ['id', 'name', 'surname', 'preferredProgrammingLanguages'];
  dataSource: any[] = [];
 
  constructor(private ngxCsvParser: NgxCsvParser) {
  }
 
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
 
  
  fileChangeListener($event: any): void {
 
    
    const files = $event.srcElement.files;
 
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
      .pipe().subscribe((result: Array<any>) => {
 
        console.log('Result', result);
        this.csvRecords = result;
        this.dataSource = result;

        if(result.length === 0) {
          document.querySelector('table').classList.add('hidden');
          document.querySelector('h1').classList.remove('hidden');
        } else {
          document.querySelector('table').classList.remove('hidden');
          document.querySelector('h1').classList.add('hidden');
        }
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
        document.querySelector('table').classList.add('hidden');
        document.querySelector('h1').classList.remove('hidden');
      });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
  }
}
