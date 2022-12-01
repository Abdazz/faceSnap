import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, switchMap, tap } from "rxjs";
import { FaceSnap } from "../models/face-snap.model";
@Injectable({
  providedIn: "root"
})

export class FaceSnapService {


  constructor(private http: HttpClient) {
  }

  getAllFaceSnaps() : Observable<FaceSnap[]>{
    return this.http.get<FaceSnap[]>("http://localhost:3000/facesnaps");
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap>{
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapOrUnSnap(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType == 'snap' ? 1 : -1)
      })),
      switchMap(updatedSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedSnap))
    );
  }

  storeFaceSnap(faceSnap: FaceSnap): Observable<FaceSnap>{
    return this.getAllFaceSnaps().pipe(
      map(faceSnaps => [...faceSnaps].sort((a: FaceSnap, b:FaceSnap) => a.id - b.id)),
      map(sortedFaceSnaps => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
      map(previousFaceSnap => ({
        ...faceSnap,
        createdDate: new Date(),
        snaps: 0,
        id: previousFaceSnap.id + 1
      })),
      switchMap(newFaceSnap => this.http.post<FaceSnap>(`http://localhost:3000/facesnaps`, newFaceSnap))
    );


    // faceSnap.id = this.faceSnaps[this.faceSnaps.length-1].id + 1;
    // faceSnap.createdDate = new Date();
    // faceSnap.snaps = 0;
    // this.faceSnaps.push(faceSnap);
  }
}
