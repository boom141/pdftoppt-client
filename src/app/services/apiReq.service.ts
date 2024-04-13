import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { API_URL } from "../shared/constants/variables.constant";

@Injectable({
    providedIn: "root"
})
export class ApiReqService {

    constructor(private http: HttpClient){}
    
    getElemets(): Observable<any>{
        return this.http.get(API_URL.elements)
    }

    uploadFile(formData: FormData): Observable<any>{
        return this.http.post(API_URL.upload, formData)
    }
}