import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://scoreon.us:8080/scoreoneusrest/";
//    public Server: string = "http://scoreon.us:8080/scoreonus";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
