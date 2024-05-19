import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { API_VARIABLES } from "../constants/api.constant";

@Injectable({
    providedIn: "root"
})
export class ApiReqService {
    private apiUrl: string = API_VARIABLES.origin + API_VARIABLES.basePath

    constructor(private http: HttpClient){}
    
    getElemets(): Observable<any>{
        return this.http.get(this.apiUrl + API_VARIABLES.endpoint.elements)
    }

    uploadFile(formData: FormData): Observable<any>{
        return this.http.post(this.apiUrl + API_VARIABLES.endpoint.info, formData)
    }

    extractImages(): Observable<any>{
        return this.http.get(this.apiUrl + API_VARIABLES.endpoint.extractImages)
    }

    extractTexts(): Observable<any>{
        return this.http.get(this.apiUrl + API_VARIABLES.endpoint.extractTexts)
    }

    exportPresentation(data: any): Observable<any>{
        return this.http.post(this.apiUrl + API_VARIABLES.endpoint.export, data)
    }
}