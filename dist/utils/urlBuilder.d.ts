export declare class UrlBuilder {
    private baseUrl;
    private params;
    constructor(baseUrl: string);
    addParam(key: string, value: string): UrlBuilder;
    addParams(params: Record<string, string>): UrlBuilder;
    build(): string;
}
export declare const createUrl: (baseUrl: string) => UrlBuilder;
//# sourceMappingURL=urlBuilder.d.ts.map