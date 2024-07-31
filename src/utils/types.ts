export interface IDetectLanguageResponse {
    DetectedLanguage_FullName: string;
    DetectedLanguage_ThreeLetterCode: string;
    Successful: boolean;
}

export interface ITranslatedResponse {
    exception_code: number;
    matches: IMatchesArray[];
    mtLangSupported: string;
    quotaFinished: false
    responderId: string;
    responseData: IResponseData;
    responseDetails: string;
    responseStatus: number;
}

interface IResponseData {
    translatedText: string;
    match: number;
}

interface IMatchesArray {
    "create-date": Date;
    "created-by": string;
    id: string;
    "last-update-date": Date;
    "last-updated-by": string;
    match: number;
    quality: string;
    reference: null;
    segment: string;
    source: string;
    subject: string;
    target: string;
    translation: string;
    "usage-count": number;
}
