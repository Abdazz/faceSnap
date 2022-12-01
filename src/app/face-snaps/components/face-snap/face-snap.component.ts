import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapService } from '../../../core/services/face-snaps-service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit{
  @Input() faceSnap!: FaceSnap
  buttonText!: string;

  constructor(private faceSnapService: FaceSnapService, private router: Router){

  }

  ngOnInit(){
    this.buttonText = "Oh Snap";
  }

  onAddSnap(){
    this.faceSnap.snaped = !this.faceSnap.snaped;
    this.faceSnapService.snapOrUnSnap(this.faceSnap.id, this.faceSnap.snaped ? "snap" : "unsnap");
    this.buttonText = this.faceSnap.snaped ? "Oops, un Snap!" : "Oh Snap"
  }

  onView(): void{
    this.router.navigateByUrl("facesnaps/" + this.faceSnap.id);
  }
}
