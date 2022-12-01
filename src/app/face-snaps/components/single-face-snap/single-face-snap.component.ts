import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapService } from '../../../core/services/face-snaps-service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;
  snaped!: boolean;
  constructor(private faceSnapService: FaceSnapService, private route: ActivatedRoute){
  }

  ngOnInit(){
    this.buttonText = "Oh Snap";
    const faceSnapId = +this.route.snapshot.params["id"];
    this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId);
  }

  onAddSnap(faceSnapId: number){
    this.snaped = !this.snaped;
    this.faceSnap$ = this.faceSnapService.snapOrUnSnap(faceSnapId, this.snaped ? "snap" : "unsnap").pipe(
      tap(() => {
        this.buttonText = this.snaped ? "Oops, un Snap!" : "Oh Snap";
      })
    );
  }

}
