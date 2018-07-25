import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  my(event:any){
    if(event.path[0].lastChild.style.display == 'block'){
      event.path[0].lastChild.style.display = 'none';
    }else{
      event.path[0].lastChild.style.display = 'block';
    }
  }

}
