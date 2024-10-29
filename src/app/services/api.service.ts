import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../modals/loader/loader.component';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

  apiURL: string;


    VIDEO_UPLOAD_URL = 'http://65.0.171.139/pw_api/';
    VIDEO_UPLOAD_TO_SERVER_URL = 'http://65.0.171.139:3000/';

    // BASE_URL = "http://192.168.29.17:3000/";
    // IMAGE_BASE_URL = "http://192.168.29.17/pw_api";

     BASE_URL = "http://65.0.171.139:4000/";
     IMAGE_BASE_URL = "http://65.0.171.139/pw_api";

    // BASE_URL = "http://3.108.247.233:3000/"; 
    // IMAGE_BASE_URL = "http://3.108.247.233/pw_api/";

    // BASE_URL = "https://pizzawings.co.in:3000/";
    // IMAGE_BASE_URL = "https://pizzawings.co.in/pw_api/";

    constructor(private http: HttpClient,
        private modalService: NgbModal) {

    }

    getAPI(url): Promise<any> {
        console.log("url:-" + url);
        return new Promise((resolve, reject) => {
            let httpSub = this.http.get(url);
            httpSub.subscribe(result => {
                // loading.dismiss();
                try {
                    //console.log('data:-' + JSON.stringify(result, null, 4));
                    let parsedJSON = JSON.parse(JSON.stringify(result));
                    // httpSub.unsubscribe()
                    resolve(parsedJSON);
                } catch (err) {
                    reject(err);
                }
            }, error => {
                // loading.dismiss();
                console.log('API Error', JSON.stringify(error, null, 4));
                error = JSON.parse(JSON.stringify(error));
                reject(error);
            });
        });
    }

    deleteAPI(url): Promise<any> {

        return new Promise((resolve, reject) => {
            this.http.delete(url).subscribe(result => {
                // loading.dismiss();
                try {
                    //console.log('data:-' + JSON.stringify(result, null, 4));
                    let parsedJSON = JSON.parse(JSON.stringify(result));
                    resolve(parsedJSON);
                } catch (err) {
                    reject(err);
                }
            }, error => {
                // loading.dismiss();
                //console.log('API Error', JSON.stringify(error, null, 4));
                error = JSON.parse(JSON.stringify(error));
                reject(error);
            });
        });
    }

    postAPI(url, postData, show_loading = false): Promise<any> {
        let loader = null;
        if (show_loading) {
            loader = this.modalService.open(LoaderComponent, {
                backdrop: 'static',
                size: 'sm',
                keyboard: false,
                centered: true
            })
        }
        return new Promise((resolve, reject) => {
            this.http.post(url, postData).subscribe(result => {
                if (show_loading && loader != null) {
                    loader.close()
                }
                try {
                    // //console.log('data:-' + JSON.stringify(result, null, 4));
                    let parsedJSON = JSON.parse(JSON.stringify(result));
                    resolve(parsedJSON);
                } catch (err) {
                    reject(err);
                }
            }, error => {
                if (show_loading && loader != null) {
                    loader.close()
                }
                // loading.dismiss();
                //console.log('API Error', JSON.stringify(error, null, 4));
                error = JSON.parse(JSON.stringify(error));
                reject(error);
            });
        });
    }

    putAPI(url, postData, show_loading = false): Promise<any> {
        let loader = null;
        if (show_loading) {
            loader = this.modalService.open(LoaderComponent, {
                backdrop: 'static',
                size: 'sm',
                keyboard: false,
                centered: true
            })
        }
        return new Promise((resolve, reject) => {
            this.http.put(url, postData).subscribe(result => {
                if (show_loading && loader != null) {
                    loader.close()
                }
                try {
                    //console.log('data:-' + JSON.stringify(result, null, 4));
                    let parsedJSON = JSON.parse(JSON.stringify(result));
                    resolve(parsedJSON);
                } catch (err) {
                    reject(err);
                }
            }, error => {
                if (show_loading && loader != null) {
                    loader.close()
                }
                error = JSON.parse(JSON.stringify(error));
                reject(error);
            });
        });
    }

    uploadAttachment(url, postData, httpOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(url, postData, httpOptions).subscribe(result => {
                // loading.dismiss();
                try {
                    //console.log('data:-' + JSON.stringify(result, null, 4));
                    let parsedJSON = JSON.parse(JSON.stringify(result));
                    resolve(parsedJSON);
                } catch (err) {
                    reject(err);
                }
            }, error => {
                // loading.dismiss();
                //console.log('API Error', JSON.stringify(error, null, 4));
                error = JSON.parse(JSON.stringify(error));
                reject(error);
            });
        });
    }

    postAPIWHeaders(url, postData, show_loading = false): Promise<any> {

        let loader = null;
        if (show_loading) {
            loader = this.modalService.open(LoaderComponent, {
                backdrop: 'static',
                size: 'sm',
                keyboard: false,
                centered: true
            })
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.UmFuY2VMYWI.O8uZEDJQA4z-5FHf4nviJycR9NiDPbMo1TIruWyeZz0'
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(url, postData, httpOptions).subscribe(result => {
                if (show_loading && loader != null) {
                    loader.close()
                }
                try {
                    // //console.log('data:-' + JSON.stringify(result, null, 4));
                    let parsedJSON = JSON.parse(JSON.stringify(result));
                    resolve(parsedJSON);
                } catch (err) {
                    reject(err);
                }
            }, error => {
                if (show_loading && loader != null) {
                    loader.close()
                }
                console.log('API Error', JSON.stringify(error, null, 4));
                if (error.status == 200) {
                    resolve(error.statusText);
                } else {
                    error = JSON.parse(JSON.stringify(error));
                    reject(error);
                }
            });
        });

    }
}

