import {useEffect, useState} from "react";
import type {Observable} from "rxjs";
import {catchError, map, of, startWith} from "rxjs";
import {vowelLibraryService} from "../../../services/VowelLibraryService.ts";

//region Interfaces

export interface UseVowelAudioState {
    audioUrl: string | null;
    isLoading: boolean;
    error: Error | null;
}

interface UseVowelAudioVm {
    audioUrl: string | null;
    isLoading: boolean;
    error: Error | null;
}

//endregion

function toError(e: unknown): Error {
    return e instanceof Error ? e : new Error(String(e));
}

export function useGetVowelAudio(vowelId?: string): UseVowelAudioState {
    const [state, setState] = useState<UseVowelAudioState>({
        audioUrl: null,
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        const streamObservable: Observable<UseVowelAudioVm> = !vowelId
            ? of({audioUrl: null, isLoading: false, error: null})
            : vowelLibraryService.getVowelAudioObjectUrl(vowelId).pipe(
                map((url) => ({audioUrl: url, isLoading: false, error: null})),
                startWith({audioUrl: null, isLoading: true, error: null}),
                catchError((e: unknown) => of({audioUrl: null, isLoading: false, error: toError(e)})),
            );

        const sub = streamObservable.subscribe((viewModel) => {
            setState(viewModel);
        });

        return () => {
            sub.unsubscribe();
        };
    }, [vowelId]);

    return state;
}
