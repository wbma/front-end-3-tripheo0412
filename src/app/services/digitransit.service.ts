import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DigitransitService {
  baseUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
  constructor(private http: HttpClient) { }

  getRoute(stopName: string) {
   const data = `{
                    stops(name: "${stopName}") {
                      name
                      patterns {
                        name
                        route {
                          shortName
                          longName
                        }
                        directionId
                      }
                    }
                  }
`;
   interface StopData {
     stops: string[];
   }
   interface ResponseData {
     data: StopData;
   }
    const header = new HttpHeaders().set('Content-Type', 'application/graphql ');
    return this.http.post<ResponseData>( 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', data, {headers: header});
  }
}
