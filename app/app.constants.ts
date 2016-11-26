import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
//    public Server: string = "http://scoreon.us:8080/";
    public Server: string = "http://192.168.1.31:8080/";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
