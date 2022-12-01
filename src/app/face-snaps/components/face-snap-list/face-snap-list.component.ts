import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapService } from '../../../core/services/face-snaps-service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps!: FaceSnap[];
  faceSnaps$!: Observable<FaceSnap[]>;

  private destroy$!: Subject<boolean>;
  constructor(private faceSnapService: FaceSnapService) {
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    // this.faceSnaps = this.faceSnapService.getAllFaceSnaps()
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps()

    interval(1000).pipe(
      take(2),
      tap(console.log),
      ).subscribe();
  }

  ngOnDestroy() :void{
    this.destroy$.next(true);
  }
}
