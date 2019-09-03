import { Component, OnInit, OnChanges } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-viewdata',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.scss']
})
export class ViewdataComponent implements OnInit, OnChanges {

  constructor(private share: DataSharingService) { }

  ElementData:any[] = [];
  displayedColumns: string[] = ['username', 'password', 'email', 'role'];
  dataSource :any;
  ngOnInit() {
    console.log('long')

    this.share.getUsersFromDatabase().subscribe(data=>{
      this.ElementData = data;
      this.dataSource = this.ElementData;
    },
    error=>{
      console.log(error);
    }
    );
  }

  ngOnChanges(){
    this.share.getUsersFromDatabase().subscribe(data=>{
      this.ElementData = data;
    });
  }


}
