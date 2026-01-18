import {map, Observable, of} from "rxjs";
import {BaseService} from './BaseService.ts'
import type {HttpClient} from "../app/api/http/HttpClient.ts";
import {ApiError, type ApiSuccess, isApiError} from "../app/api/contracts/ApiContracts";
import type {VowelDetails} from "../components/vowel-details/VowelDetails.types.ts";
import {apiRoutes} from "../app/api/routes/AppApiRoutes.ts";

export interface AudioCacheEntry {
    objectUrl: string;
    blob: Blob;
}

export class VowelLibraryService extends BaseService {
    private readonly audioCache = new Map<string, AudioCacheEntry>();

    constructor(httpClient?: HttpClient) {
        super(httpClient);
    }

    /**
     * @throws Error when the backend responds with success=false
     *
     */
    public getVowelList(): Observable<ApiSuccess<VowelDetails>> {
        // TODO: calling isApiError() just to check boolean might be redundant and
        //  maybe the boolean should be removed from ApiSuccess and ApiError and
        //  these are computed from the presence of data or error fields.
        //  In the worst case, app isApiError() on the lowest levels, i.e. get, post, put etc. for DRY
        // Res are either success or failure; BaseService throws HttpError on non-2xx,
        // but we still guard against "200 + success:false" if it ever occurs.
        return this.getJson$<ApiSuccess<VowelDetails> | ApiError>(apiRoutes.vowels.list()).pipe(
            map((res) => {
                if (isApiError(res)) {
                    // throw new ApiError(res.error);
                    throw res;
                }

                return res;
            }),
        );
    }

    /**
     * Compatible with:
     * - download-not-inline backend (fetch Blob and serve via object URL for playback)
     * - short max-age + 304 revalidation (cache: "no-cache" encourages revalidation)
     */
    public getVowelAudioObjectUrl(vowelId: string): Observable<string> {
        const cached = this.audioCache.get(vowelId);

        if (cached) {
            return of(cached.objectUrl);
        }

        return this.getBlob$(apiRoutes.vowels.audio(vowelId), {cache: "no-cache"}).pipe(
            map((blob) => {
                const objectUrl = URL.createObjectURL(blob);
                this.audioCache.set(vowelId, {blob, objectUrl});
                return objectUrl;
            }),
        );
    }
}


export const vowelLibraryService = new VowelLibraryService()