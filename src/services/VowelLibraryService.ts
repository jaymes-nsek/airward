import {map, Observable} from "rxjs";
import {BaseService} from './BaseService.ts'
import type {HttpClient} from "../app/api/http/HttpClient.ts";
import {type ApiError, type ApiSuccess, isApiError} from "../app/api/contracts/ApiContracts";
import {AppApiRoutes} from "../app/api/routes/AppApiRoutes.ts";
import type {VowelDetails} from "../components/vowel-details/VowelDetails.types.ts";

export class VowelLibraryService extends BaseService {
    private readonly routes = new AppApiRoutes();

    constructor(httpClient?: HttpClient) {
        super(httpClient);
    }


    public getVowelList(): Observable<ApiSuccess<VowelDetails> | ApiError> {
        // TODO: calling isApiError() just to check boolean might be redundant and
        //  maybe the boolean should be removed from ApiSuccess and ApiError and
        //  these are computed from the presence of data or error fields.
        //  In the worst case, app isApiError() on the lowest levels, i.e. get, post, put etc. for DRY
        // Res are either success or failure; BaseService throws HttpError on non-2xx,
        // but we still guard against "200 + success:false" if it ever occurs.
        return this.getJson$<ApiSuccess<VowelDetails> | ApiError>(this.routes.vowels.list()).pipe(
            map((res) => {
                if (isApiError(res)) {
                    throw new Error(`${res.error.code}: ${res.error.message}`);
                }

                return res;
            }),
        );
    }
}


export const vowelLibraryService = new VowelLibraryService()