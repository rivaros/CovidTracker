// To parse this data:
//
//   import { Convert, Default, Summary, PremiumSummary, PremiumTravelDataByCountry, Stats } from "./file";
//
//   const default = Convert.toDefault(json);
//   const summary = Convert.toSummary(json);
//   const countries = Convert.toCountries(json);
//   const dayOne = Convert.toDayOne(json);
//   const dayOneAllStatus = Convert.toDayOneAllStatus(json);
//   const dayOneLive = Convert.toDayOneLive(json);
//   const dayOneTotal = Convert.toDayOneTotal(json);
//   const dayOneTotalAllStatus = Convert.toDayOneTotalAllStatus(json);
//   const byCountry = Convert.toByCountry(json);
//   const byCountryAllStatus = Convert.toByCountryAllStatus(json);
//   const byCountryLive = Convert.toByCountryLive(json);
//   const byCountryTotal = Convert.toByCountryTotal(json);
//   const byCountryTotalAllStatus = Convert.toByCountryTotalAllStatus(json);
//   const liveByCountryAndStatus = Convert.toLiveByCountryAndStatus(json);
//   const liveByCountryAllStatus = Convert.toLiveByCountryAllStatus(json);
//   const liveByCountryAndStatusAfterDate = Convert.toLiveByCountryAndStatusAfterDate(json);
//   const worldWIP = Convert.toWorldWIP(json);
//   const worldTotalWIP = Convert.toWorldTotalWIP(json);
//   const premiumByCountryAllStatus = Convert.toPremiumByCountryAllStatus(json);
//   const premiumSummary = Convert.toPremiumSummary(json);
//   const premiumByCountryData = Convert.toPremiumByCountryData(json);
//   const premiumTestsByCountry = Convert.toPremiumTestsByCountry(json);
//   const premiumTravelDataByCountry = Convert.toPremiumTravelDataByCountry(json);
//   const allData = Convert.toAllData(json);
//   const stats = Convert.toStats(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * Default
 *
 * GET {{baseUrl}}/
 *
 * List all the current routes available with detail on each.
 */
export interface Default {
  allRoute: Route;
  countriesRoute: Route;
  countryStatusDayOneLiveRoute: Route;
  countryStatusDayOneRoute: Route;
  countryStatusDayOneTotalRoute: Route;
  countryStatusLiveRoute: Route;
  countryStatusRoute: Route;
  countryStatusTotalRoute: Route;
  exportRoute: Route;
  liveCountryStatusAfterDateRoute: Route;
  liveCountryStatusRoute: Route;
  summaryRoute: Route;
  webhookRoute: Route;
}

export interface Route {
  Name: string;
  Description: string;
  Path: string;
}

/**
 * Summary
 *
 * GET {{baseUrl}}/summary
 *
 * A summary of new and total cases per country updated daily.
 */
export interface Summary {
  ID: string;
  Global: Global;
  Countries: SummaryCountry[];
  Date: Date;
}

export interface SummaryCountry {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
  Premium: SummaryCountryPremium;
}

export interface SummaryCountryPremium {
  CountryStats: PremiumByCountryData;
}

export interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: Date;
}

export interface Countries {
  Country: string;
  Slug: string;
  ISO2: string;
}

export interface DayOne {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export enum CountryEnum {
  Switzerland = 'Switzerland',
}

export enum DayOneCountryCode {
  Ch = 'CH',
}

export enum Status {
  Confirmed = 'confirmed',
}

export interface DayOneAllStatus {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface DayOneLive {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface DayOneTotal {
  Country: CountryEnum;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface DayOneTotalAllStatus {
  Country: CountryEnum;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface ByCountry {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface ByCountryAllStatus {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface ByCountryLive {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface ByCountryTotal {
  Country: CountryEnum;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface ByCountryTotalAllStatus {
  Country: CountryEnum;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: Status;
  Date: Date;
}

export interface LiveByCountryAndStatus {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
  LocationID: string;
}

export interface LiveByCountryAllStatus {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
  LocationID: string;
}

export interface LiveByCountryAndStatusAfterDate {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
  LocationID: string;
}

export interface WorldWIP {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
  LocationID: string;
}

export interface WorldTotalWIP {
  Country: CountryEnum;
  CountryCode: DayOneCountryCode;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
  LocationID: string;
}

export interface PremiumByCountryAllStatus {
  CountryISO: string;
  Country: string;
  Continent: Continent;
  Date: Date;
  TotalCases: number;
  NewCases: number;
  TotalDeaths: number;
  NewDeaths: number;
  TotalCasesPerMillion: number;
  NewCasesPerMillion: number;
  TotalDeathsPerMillion: number;
  NewDeathsPerMillion: number;
  StringencyIndex: number;
  DailyIncidenceConfirmedCases: number;
  DailyIncidenceConfirmedDeaths: number;
  DailyIncidenceConfirmedCasesPerMillion: number;
  DailyIncidenceConfirmedDeathsPerMillion: number;
  IncidenceRiskConfirmedPerHundredThousand: number;
  IncidenceRiskDeathsPerHundredThousand: number;
  IncidenceRiskNewConfirmedPerHundredThousand: number;
  IncidenceRiskNewDeathsPerHundredThousand: number;
  CaseFatalityRatio: number;
}

export enum Continent {
  Africa = 'Africa',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SouthAmerica = 'South America',
}

/**
 * Premium Summary
 *
 * GET {{baseUrl}}/premium/summary
 *
 * Premium route, data sourced from additional data source and has additional calculated
 * fields. Returns all cases by case type for a country. Country must be the slug from
 * /countries or /summary.
 */
export interface PremiumSummary {
  Message: string;
  Countries: PremiumSummaryCountry[];
  Date: Date;
}

export interface PremiumSummaryCountry {
  CountryISO: string;
  Country: string;
  Continent: Continent;
  Date: Date;
  TotalCases: number;
  NewCases: number;
  TotalDeaths: number;
  NewDeaths: number;
  TotalCasesPerMillion: number;
  NewCasesPerMillion: number;
  TotalDeathsPerMillion: number;
  NewDeathsPerMillion: number;
  StringencyIndex: number;
  DailyIncidenceConfirmedCases: number;
  DailyIncidenceConfirmedDeaths: number;
  DailyIncidenceConfirmedCasesPerMillion: number;
  DailyIncidenceConfirmedDeathsPerMillion: number;
  IncidenceRiskConfirmedPerHundredThousand: number;
  IncidenceRiskDeathsPerHundredThousand: number;
  IncidenceRiskNewConfirmedPerHundredThousand: number;
  IncidenceRiskNewDeathsPerHundredThousand: number;
  CaseFatalityRatio: number;
}

export interface PremiumByCountryData {
  ID: string;
  CountryISO: string;
  Country: string;
  Continent: Continent;
  Population: number;
  PopulationDensity: number;
  MedianAge: number;
  Aged65Older: number;
  Aged70Older: number;
  ExtremePoverty: number;
  GdpPerCapita: number;
  CvdDeathRate: number;
  DiabetesPrevalence: number;
  HandwashingFacilities: number;
  HospitalBedsPerThousand: number;
  LifeExpectancy: number;
  FemaleSmokers: number;
  MaleSmokers: number;
}

export interface PremiumTestsByCountry {
  Entity: Entity;
  ISO: ISO;
  Date: Date;
  SourceURL: string;
  Source: Source;
  Notes: string;
  DailyChangeCumulativeTotal: number;
  CumulativeTotal: number;
  CumulativeTotalPerThousand: number;
  DailyChangeCumulativeTotalPerThousand: number;
  SevenDaySmoothedDailyChange: number;
  SevenDaySmoothDailyChangePerThousand: number;
}

export enum Entity {
  UnitedStatesTestsPerformedCDCInclNonPCR = 'United States - tests performed (CDC) (incl. non-PCR)',
  UnitedStatesUnitsUnclearInclNonPCR = 'United States - units unclear (incl. non-PCR)',
}

export enum ISO {
  Us = 'US',
}

export enum Source {
  COVIDTrackingProject = 'COVID Tracking Project',
  Empty = '',
  UnitedStatesCDC = 'United States CDC',
}

/**
 * Premium Travel Data By Country
 *
 * GET {{baseUrl}}/premium/travel/country/{{country}}
 *
 * Premium route, travel data per country.
 */
export interface PremiumTravelDataByCountry {
  Country: PremiumTravelDataByCountryCountry;
  Recommendation: string;
  Level: Level;
  Notes: Note[];
}

export interface PremiumTravelDataByCountryCountry {
  CountryCode: CountryCountryCode;
  Country: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Timestamp: Date;
}

export enum CountryCountryCode {
  Au = 'AU',
}

export interface Level {
  CountryCode: CountryCountryCode;
  Level: number;
  LevelDesc: string;
  Date: Date;
}

export interface Note {
  CountryCode: CountryCountryCode;
  Note: string;
  Date: Date;
}

export interface AllData {
  Country: string;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: Date;
  LocationID: string;
}

/**
 * Stats
 *
 * GET {{baseUrl}}/stats
 *
 * This route returns the usage of the API. This is not for any COVID related statistics.
 */
export interface Stats {
  Total: number;
  All: number;
  AllUpdated: string;
  Countries: number;
  CountriesUpdated: string;
  ByCountry: number;
  ByCountryUpdated: string;
  ByCountryAllStatus: number;
  ByCountryAllStatusUpdated: string;
  ByCountryLive: number;
  ByCountryLiveUpdated: string;
  ByCountryTotal: number;
  ByCountryTotalUpdated: string;
  ByCountryTotalAllStatus: number;
  ByCountryTotalAllStatusUpdated: string;
  DayOne: number;
  DayOneUpdated: string;
  DayOneLive: number;
  DayOneLiveUpdated: string;
  DayOneTotal: number;
  DayOneTotalUpdated: string;
  DayOneAllStatus: number;
  DayOneAllStatusUpdated: string;
  CountryDayOneTotalAllStatus: number;
  CountryDayOneTotalAllStatusUpdated: string;
  LiveCountryStatus: number;
  LiveCountryStatusUpdated: string;
  LiveCountryStatusAfterDate: number;
  LiveCountryStatusAfterDateUpdated: string;
  WorldTotal: number;
  WorldTotalDateUpdated: string;
  WorldDaily: number;
  WorldDailyDateUpdated: string;
  Stats: number;
  StatsUpdated: string;
  Default: number;
  DefaultUpdated: string;
  SubmitWebhook: number;
  SubmitWebhookUpdated: string;
  Summary: number;
  SummaryUpdated: string;
  PremiumCountry: number;
  PremiumCountryUpdated: string;
  PremiumSummaryCountry: number;
  PremiumSummaryCountryUpdated: string;
  PremiumCountryData: number;
  PremiumCountryDataUpdated: string;
  PremiumCountryTests: number;
  PremiumCountryTestsUpdated: string;
  PremiumTravelAdvice: number;
  PremiumTravelAdviceUpdated: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toDefault(json: string): Default {
    return cast(JSON.parse(json), r('Default'));
  }

  public static defaultToJson(value: Default): string {
    return JSON.stringify(uncast(value, r('Default')), null, 2);
  }

  public static toSummary(json: string): Summary {
    return cast(JSON.parse(json), r('Summary'));
  }

  public static summaryToJson(value: Summary): string {
    return JSON.stringify(uncast(value, r('Summary')), null, 2);
  }

  public static toCountries(json: string): Countries[] {
    return cast(JSON.parse(json), a(r('Countries')));
  }

  public static countriesToJson(value: Countries[]): string {
    return JSON.stringify(uncast(value, a(r('Countries'))), null, 2);
  }

  public static toDayOne(json: string): DayOne[] {
    return cast(JSON.parse(json), a(r('DayOne')));
  }

  public static dayOneToJson(value: DayOne[]): string {
    return JSON.stringify(uncast(value, a(r('DayOne'))), null, 2);
  }

  public static toDayOneAllStatus(json: string): DayOneAllStatus[] {
    return cast(JSON.parse(json), a(r('DayOneAllStatus')));
  }

  public static dayOneAllStatusToJson(value: DayOneAllStatus[]): string {
    return JSON.stringify(uncast(value, a(r('DayOneAllStatus'))), null, 2);
  }

  public static toDayOneLive(json: string): DayOneLive[] {
    return cast(JSON.parse(json), a(r('DayOneLive')));
  }

  public static dayOneLiveToJson(value: DayOneLive[]): string {
    return JSON.stringify(uncast(value, a(r('DayOneLive'))), null, 2);
  }

  public static toDayOneTotal(json: string): DayOneTotal[] {
    return cast(JSON.parse(json), a(r('DayOneTotal')));
  }

  public static dayOneTotalToJson(value: DayOneTotal[]): string {
    return JSON.stringify(uncast(value, a(r('DayOneTotal'))), null, 2);
  }

  public static toDayOneTotalAllStatus(json: string): DayOneTotalAllStatus[] {
    return cast(JSON.parse(json), a(r('DayOneTotalAllStatus')));
  }

  public static dayOneTotalAllStatusToJson(
    value: DayOneTotalAllStatus[],
  ): string {
    return JSON.stringify(uncast(value, a(r('DayOneTotalAllStatus'))), null, 2);
  }

  public static toByCountry(json: string): ByCountry[] {
    return cast(JSON.parse(json), a(r('ByCountry')));
  }

  public static byCountryToJson(value: ByCountry[]): string {
    return JSON.stringify(uncast(value, a(r('ByCountry'))), null, 2);
  }

  public static toByCountryAllStatus(json: string): ByCountryAllStatus[] {
    return cast(JSON.parse(json), a(r('ByCountryAllStatus')));
  }

  public static byCountryAllStatusToJson(value: ByCountryAllStatus[]): string {
    return JSON.stringify(uncast(value, a(r('ByCountryAllStatus'))), null, 2);
  }

  public static toByCountryLive(json: string): ByCountryLive[] {
    return cast(JSON.parse(json), a(r('ByCountryLive')));
  }

  public static byCountryLiveToJson(value: ByCountryLive[]): string {
    return JSON.stringify(uncast(value, a(r('ByCountryLive'))), null, 2);
  }

  public static toByCountryTotal(json: string): ByCountryTotal[] {
    return cast(JSON.parse(json), a(r('ByCountryTotal')));
  }

  public static byCountryTotalToJson(value: ByCountryTotal[]): string {
    return JSON.stringify(uncast(value, a(r('ByCountryTotal'))), null, 2);
  }

  public static toByCountryTotalAllStatus(
    json: string,
  ): ByCountryTotalAllStatus[] {
    return cast(JSON.parse(json), a(r('ByCountryTotalAllStatus')));
  }

  public static byCountryTotalAllStatusToJson(
    value: ByCountryTotalAllStatus[],
  ): string {
    return JSON.stringify(
      uncast(value, a(r('ByCountryTotalAllStatus'))),
      null,
      2,
    );
  }

  public static toLiveByCountryAndStatus(
    json: string,
  ): LiveByCountryAndStatus[] {
    return cast(JSON.parse(json), a(r('LiveByCountryAndStatus')));
  }

  public static liveByCountryAndStatusToJson(
    value: LiveByCountryAndStatus[],
  ): string {
    return JSON.stringify(
      uncast(value, a(r('LiveByCountryAndStatus'))),
      null,
      2,
    );
  }

  public static toLiveByCountryAllStatus(
    json: string,
  ): LiveByCountryAllStatus[] {
    return cast(JSON.parse(json), a(r('LiveByCountryAllStatus')));
  }

  public static liveByCountryAllStatusToJson(
    value: LiveByCountryAllStatus[],
  ): string {
    return JSON.stringify(
      uncast(value, a(r('LiveByCountryAllStatus'))),
      null,
      2,
    );
  }

  public static toLiveByCountryAndStatusAfterDate(
    json: string,
  ): LiveByCountryAndStatusAfterDate[] {
    return cast(JSON.parse(json), a(r('LiveByCountryAndStatusAfterDate')));
  }

  public static liveByCountryAndStatusAfterDateToJson(
    value: LiveByCountryAndStatusAfterDate[],
  ): string {
    return JSON.stringify(
      uncast(value, a(r('LiveByCountryAndStatusAfterDate'))),
      null,
      2,
    );
  }

  public static toWorldWIP(json: string): WorldWIP[] {
    return cast(JSON.parse(json), a(r('WorldWIP')));
  }

  public static worldWIPToJson(value: WorldWIP[]): string {
    return JSON.stringify(uncast(value, a(r('WorldWIP'))), null, 2);
  }

  public static toWorldTotalWIP(json: string): WorldTotalWIP[] {
    return cast(JSON.parse(json), a(r('WorldTotalWIP')));
  }

  public static worldTotalWIPToJson(value: WorldTotalWIP[]): string {
    return JSON.stringify(uncast(value, a(r('WorldTotalWIP'))), null, 2);
  }

  public static toPremiumByCountryAllStatus(
    json: string,
  ): PremiumByCountryAllStatus[] {
    return cast(JSON.parse(json), a(r('PremiumByCountryAllStatus')));
  }

  public static premiumByCountryAllStatusToJson(
    value: PremiumByCountryAllStatus[],
  ): string {
    return JSON.stringify(
      uncast(value, a(r('PremiumByCountryAllStatus'))),
      null,
      2,
    );
  }

  public static toPremiumSummary(json: string): PremiumSummary {
    return cast(JSON.parse(json), r('PremiumSummary'));
  }

  public static premiumSummaryToJson(value: PremiumSummary): string {
    return JSON.stringify(uncast(value, r('PremiumSummary')), null, 2);
  }

  public static toPremiumByCountryData(json: string): PremiumByCountryData[] {
    return cast(JSON.parse(json), a(r('PremiumByCountryData')));
  }

  public static premiumByCountryDataToJson(
    value: PremiumByCountryData[],
  ): string {
    return JSON.stringify(uncast(value, a(r('PremiumByCountryData'))), null, 2);
  }

  public static toPremiumTestsByCountry(json: string): PremiumTestsByCountry[] {
    return cast(JSON.parse(json), a(r('PremiumTestsByCountry')));
  }

  public static premiumTestsByCountryToJson(
    value: PremiumTestsByCountry[],
  ): string {
    return JSON.stringify(
      uncast(value, a(r('PremiumTestsByCountry'))),
      null,
      2,
    );
  }

  public static toPremiumTravelDataByCountry(
    json: string,
  ): PremiumTravelDataByCountry {
    return cast(JSON.parse(json), r('PremiumTravelDataByCountry'));
  }

  public static premiumTravelDataByCountryToJson(
    value: PremiumTravelDataByCountry,
  ): string {
    return JSON.stringify(
      uncast(value, r('PremiumTravelDataByCountry')),
      null,
      2,
    );
  }

  public static toAllData(json: string): AllData[] {
    return cast(JSON.parse(json), a(r('AllData')));
  }

  public static allDataToJson(value: AllData[]): string {
    return JSON.stringify(uncast(value, a(r('AllData'))), null, 2);
  }

  public static toStats(json: string): Stats {
    return cast(JSON.parse(json), r('Stats'));
  }

  public static statsToJson(value: Stats): string {
    return JSON.stringify(uncast(value, r('Stats')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ,
      )} but got ${JSON.stringify(val)}`,
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = {key: p.js, typ: p.typ}));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = {key: p.json, typ: p.typ}));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) {
      return val;
    }
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) {
      return val;
    }
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) {
      return invalidValue('array', val);
    }
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: {[k: string]: any},
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') {
    return val;
  }
  if (typ === null) {
    if (val === null) {
      return val;
    }
    return invalidValue(typ, val);
  }
  if (typ === false) {
    return invalidValue(typ, val, key);
  }
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) {
    return transformEnum(typ, val);
  }
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') {
    return transformDate(val);
  }
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return {arrayItems: typ};
}

function u(...typs: any[]) {
  return {unionMembers: typs};
}

function o(props: any[], additional: any) {
  return {props, additional};
}

function m(additional: any) {
  return {props: [], additional};
}

function r(name: string) {
  return {ref: name};
}

const typeMap: any = {
  Default: o(
    [
      {json: 'allRoute', js: 'allRoute', typ: r('Route')},
      {json: 'countriesRoute', js: 'countriesRoute', typ: r('Route')},
      {
        json: 'countryStatusDayOneLiveRoute',
        js: 'countryStatusDayOneLiveRoute',
        typ: r('Route'),
      },
      {
        json: 'countryStatusDayOneRoute',
        js: 'countryStatusDayOneRoute',
        typ: r('Route'),
      },
      {
        json: 'countryStatusDayOneTotalRoute',
        js: 'countryStatusDayOneTotalRoute',
        typ: r('Route'),
      },
      {
        json: 'countryStatusLiveRoute',
        js: 'countryStatusLiveRoute',
        typ: r('Route'),
      },
      {json: 'countryStatusRoute', js: 'countryStatusRoute', typ: r('Route')},
      {
        json: 'countryStatusTotalRoute',
        js: 'countryStatusTotalRoute',
        typ: r('Route'),
      },
      {json: 'exportRoute', js: 'exportRoute', typ: r('Route')},
      {
        json: 'liveCountryStatusAfterDateRoute',
        js: 'liveCountryStatusAfterDateRoute',
        typ: r('Route'),
      },
      {
        json: 'liveCountryStatusRoute',
        js: 'liveCountryStatusRoute',
        typ: r('Route'),
      },
      {json: 'summaryRoute', js: 'summaryRoute', typ: r('Route')},
      {json: 'webhookRoute', js: 'webhookRoute', typ: r('Route')},
    ],
    false,
  ),
  Route: o(
    [
      {json: 'Name', js: 'Name', typ: ''},
      {json: 'Description', js: 'Description', typ: ''},
      {json: 'Path', js: 'Path', typ: ''},
    ],
    false,
  ),
  Summary: o(
    [
      {json: 'ID', js: 'ID', typ: ''},
      {json: 'Global', js: 'Global', typ: r('Global')},
      {json: 'Countries', js: 'Countries', typ: a(r('SummaryCountry'))},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  SummaryCountry: o(
    [
      {json: 'ID', js: 'ID', typ: ''},
      {json: 'Country', js: 'Country', typ: ''},
      {json: 'CountryCode', js: 'CountryCode', typ: ''},
      {json: 'Slug', js: 'Slug', typ: ''},
      {json: 'NewConfirmed', js: 'NewConfirmed', typ: 0},
      {json: 'TotalConfirmed', js: 'TotalConfirmed', typ: 0},
      {json: 'NewDeaths', js: 'NewDeaths', typ: 0},
      {json: 'TotalDeaths', js: 'TotalDeaths', typ: 0},
      {json: 'NewRecovered', js: 'NewRecovered', typ: 0},
      {json: 'TotalRecovered', js: 'TotalRecovered', typ: 0},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'Premium', js: 'Premium', typ: r('SummaryCountryPremium')},
    ],
    false,
  ),
  SummaryCountryPremium: o(
    [
      {
        json: 'CountryStats',
        js: 'CountryStats',
        typ: r('PremiumByCountryData'),
      },
    ],
    false,
  ),
  Global: o(
    [
      {json: 'NewConfirmed', js: 'NewConfirmed', typ: 0},
      {json: 'TotalConfirmed', js: 'TotalConfirmed', typ: 0},
      {json: 'NewDeaths', js: 'NewDeaths', typ: 0},
      {json: 'TotalDeaths', js: 'TotalDeaths', typ: 0},
      {json: 'NewRecovered', js: 'NewRecovered', typ: 0},
      {json: 'TotalRecovered', js: 'TotalRecovered', typ: 0},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  Countries: o(
    [
      {json: 'Country', js: 'Country', typ: ''},
      {json: 'Slug', js: 'Slug', typ: ''},
      {json: 'ISO2', js: 'ISO2', typ: ''},
    ],
    false,
  ),
  DayOne: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  DayOneAllStatus: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  DayOneLive: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  DayOneTotal: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: ''},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  DayOneTotalAllStatus: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: ''},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  ByCountry: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  ByCountryAllStatus: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  ByCountryLive: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  ByCountryTotal: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: ''},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  ByCountryTotalAllStatus: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: ''},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Cases', js: 'Cases', typ: 0},
      {json: 'Status', js: 'Status', typ: r('Status')},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  LiveByCountryAndStatus: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Confirmed', js: 'Confirmed', typ: 0},
      {json: 'Deaths', js: 'Deaths', typ: 0},
      {json: 'Recovered', js: 'Recovered', typ: 0},
      {json: 'Active', js: 'Active', typ: 0},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'LocationID', js: 'LocationID', typ: ''},
    ],
    false,
  ),
  LiveByCountryAllStatus: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Confirmed', js: 'Confirmed', typ: 0},
      {json: 'Deaths', js: 'Deaths', typ: 0},
      {json: 'Recovered', js: 'Recovered', typ: 0},
      {json: 'Active', js: 'Active', typ: 0},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'LocationID', js: 'LocationID', typ: ''},
    ],
    false,
  ),
  LiveByCountryAndStatusAfterDate: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Confirmed', js: 'Confirmed', typ: 0},
      {json: 'Deaths', js: 'Deaths', typ: 0},
      {json: 'Recovered', js: 'Recovered', typ: 0},
      {json: 'Active', js: 'Active', typ: 0},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'LocationID', js: 'LocationID', typ: ''},
    ],
    false,
  ),
  WorldWIP: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Confirmed', js: 'Confirmed', typ: 0},
      {json: 'Deaths', js: 'Deaths', typ: 0},
      {json: 'Recovered', js: 'Recovered', typ: 0},
      {json: 'Active', js: 'Active', typ: 0},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'LocationID', js: 'LocationID', typ: ''},
    ],
    false,
  ),
  WorldTotalWIP: o(
    [
      {json: 'Country', js: 'Country', typ: r('CountryEnum')},
      {json: 'CountryCode', js: 'CountryCode', typ: r('DayOneCountryCode')},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Confirmed', js: 'Confirmed', typ: 0},
      {json: 'Deaths', js: 'Deaths', typ: 0},
      {json: 'Recovered', js: 'Recovered', typ: 0},
      {json: 'Active', js: 'Active', typ: 0},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'LocationID', js: 'LocationID', typ: ''},
    ],
    false,
  ),
  PremiumByCountryAllStatus: o(
    [
      {json: 'CountryISO', js: 'CountryISO', typ: ''},
      {json: 'Country', js: 'Country', typ: ''},
      {json: 'Continent', js: 'Continent', typ: r('Continent')},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'TotalCases', js: 'TotalCases', typ: 0},
      {json: 'NewCases', js: 'NewCases', typ: 0},
      {json: 'TotalDeaths', js: 'TotalDeaths', typ: 0},
      {json: 'NewDeaths', js: 'NewDeaths', typ: 0},
      {json: 'TotalCasesPerMillion', js: 'TotalCasesPerMillion', typ: 3.14},
      {json: 'NewCasesPerMillion', js: 'NewCasesPerMillion', typ: 3.14},
      {json: 'TotalDeathsPerMillion', js: 'TotalDeathsPerMillion', typ: 3.14},
      {json: 'NewDeathsPerMillion', js: 'NewDeathsPerMillion', typ: 3.14},
      {json: 'StringencyIndex', js: 'StringencyIndex', typ: 0},
      {
        json: 'DailyIncidenceConfirmedCases',
        js: 'DailyIncidenceConfirmedCases',
        typ: 3.14,
      },
      {
        json: 'DailyIncidenceConfirmedDeaths',
        js: 'DailyIncidenceConfirmedDeaths',
        typ: 3.14,
      },
      {
        json: 'DailyIncidenceConfirmedCasesPerMillion',
        js: 'DailyIncidenceConfirmedCasesPerMillion',
        typ: 3.14,
      },
      {
        json: 'DailyIncidenceConfirmedDeathsPerMillion',
        js: 'DailyIncidenceConfirmedDeathsPerMillion',
        typ: 3.14,
      },
      {
        json: 'IncidenceRiskConfirmedPerHundredThousand',
        js: 'IncidenceRiskConfirmedPerHundredThousand',
        typ: 3.14,
      },
      {
        json: 'IncidenceRiskDeathsPerHundredThousand',
        js: 'IncidenceRiskDeathsPerHundredThousand',
        typ: 3.14,
      },
      {
        json: 'IncidenceRiskNewConfirmedPerHundredThousand',
        js: 'IncidenceRiskNewConfirmedPerHundredThousand',
        typ: 3.14,
      },
      {
        json: 'IncidenceRiskNewDeathsPerHundredThousand',
        js: 'IncidenceRiskNewDeathsPerHundredThousand',
        typ: 3.14,
      },
      {json: 'CaseFatalityRatio', js: 'CaseFatalityRatio', typ: 3.14},
    ],
    false,
  ),
  PremiumSummary: o(
    [
      {json: 'Message', js: 'Message', typ: ''},
      {json: 'Countries', js: 'Countries', typ: a(r('PremiumSummaryCountry'))},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  PremiumSummaryCountry: o(
    [
      {json: 'CountryISO', js: 'CountryISO', typ: ''},
      {json: 'Country', js: 'Country', typ: ''},
      {json: 'Continent', js: 'Continent', typ: r('Continent')},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'TotalCases', js: 'TotalCases', typ: 0},
      {json: 'NewCases', js: 'NewCases', typ: 0},
      {json: 'TotalDeaths', js: 'TotalDeaths', typ: 0},
      {json: 'NewDeaths', js: 'NewDeaths', typ: 0},
      {json: 'TotalCasesPerMillion', js: 'TotalCasesPerMillion', typ: 3.14},
      {json: 'NewCasesPerMillion', js: 'NewCasesPerMillion', typ: 3.14},
      {json: 'TotalDeathsPerMillion', js: 'TotalDeathsPerMillion', typ: 3.14},
      {json: 'NewDeathsPerMillion', js: 'NewDeathsPerMillion', typ: 3.14},
      {json: 'StringencyIndex', js: 'StringencyIndex', typ: 0},
      {
        json: 'DailyIncidenceConfirmedCases',
        js: 'DailyIncidenceConfirmedCases',
        typ: 3.14,
      },
      {
        json: 'DailyIncidenceConfirmedDeaths',
        js: 'DailyIncidenceConfirmedDeaths',
        typ: 3.14,
      },
      {
        json: 'DailyIncidenceConfirmedCasesPerMillion',
        js: 'DailyIncidenceConfirmedCasesPerMillion',
        typ: 3.14,
      },
      {
        json: 'DailyIncidenceConfirmedDeathsPerMillion',
        js: 'DailyIncidenceConfirmedDeathsPerMillion',
        typ: 3.14,
      },
      {
        json: 'IncidenceRiskConfirmedPerHundredThousand',
        js: 'IncidenceRiskConfirmedPerHundredThousand',
        typ: 3.14,
      },
      {
        json: 'IncidenceRiskDeathsPerHundredThousand',
        js: 'IncidenceRiskDeathsPerHundredThousand',
        typ: 3.14,
      },
      {
        json: 'IncidenceRiskNewConfirmedPerHundredThousand',
        js: 'IncidenceRiskNewConfirmedPerHundredThousand',
        typ: 3.14,
      },
      {
        json: 'IncidenceRiskNewDeathsPerHundredThousand',
        js: 'IncidenceRiskNewDeathsPerHundredThousand',
        typ: 3.14,
      },
      {json: 'CaseFatalityRatio', js: 'CaseFatalityRatio', typ: 3.14},
    ],
    false,
  ),
  PremiumByCountryData: o(
    [
      {json: 'ID', js: 'ID', typ: ''},
      {json: 'CountryISO', js: 'CountryISO', typ: ''},
      {json: 'Country', js: 'Country', typ: ''},
      {json: 'Continent', js: 'Continent', typ: r('Continent')},
      {json: 'Population', js: 'Population', typ: 0},
      {json: 'PopulationDensity', js: 'PopulationDensity', typ: 3.14},
      {json: 'MedianAge', js: 'MedianAge', typ: 3.14},
      {json: 'Aged65Older', js: 'Aged65Older', typ: 3.14},
      {json: 'Aged70Older', js: 'Aged70Older', typ: 3.14},
      {json: 'ExtremePoverty', js: 'ExtremePoverty', typ: 0},
      {json: 'GdpPerCapita', js: 'GdpPerCapita', typ: 3.14},
      {json: 'CvdDeathRate', js: 'CvdDeathRate', typ: 3.14},
      {json: 'DiabetesPrevalence', js: 'DiabetesPrevalence', typ: 3.14},
      {json: 'HandwashingFacilities', js: 'HandwashingFacilities', typ: 3.14},
      {
        json: 'HospitalBedsPerThousand',
        js: 'HospitalBedsPerThousand',
        typ: 3.14,
      },
      {json: 'LifeExpectancy', js: 'LifeExpectancy', typ: 3.14},
      {json: 'FemaleSmokers', js: 'FemaleSmokers', typ: 0},
      {json: 'MaleSmokers', js: 'MaleSmokers', typ: 0},
    ],
    false,
  ),
  PremiumTestsByCountry: o(
    [
      {json: 'Entity', js: 'Entity', typ: r('Entity')},
      {json: 'ISO', js: 'ISO', typ: r('ISO')},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'SourceURL', js: 'SourceURL', typ: ''},
      {json: 'Source', js: 'Source', typ: r('Source')},
      {json: 'Notes', js: 'Notes', typ: ''},
      {
        json: 'DailyChangeCumulativeTotal',
        js: 'DailyChangeCumulativeTotal',
        typ: 0,
      },
      {json: 'CumulativeTotal', js: 'CumulativeTotal', typ: 0},
      {
        json: 'CumulativeTotalPerThousand',
        js: 'CumulativeTotalPerThousand',
        typ: 3.14,
      },
      {
        json: 'DailyChangeCumulativeTotalPerThousand',
        js: 'DailyChangeCumulativeTotalPerThousand',
        typ: 3.14,
      },
      {
        json: 'SevenDaySmoothedDailyChange',
        js: 'SevenDaySmoothedDailyChange',
        typ: 0,
      },
      {
        json: 'SevenDaySmoothDailyChangePerThousand',
        js: 'SevenDaySmoothDailyChangePerThousand',
        typ: 3.14,
      },
    ],
    false,
  ),
  PremiumTravelDataByCountry: o(
    [
      {
        json: 'Country',
        js: 'Country',
        typ: r('PremiumTravelDataByCountryCountry'),
      },
      {json: 'Recommendation', js: 'Recommendation', typ: ''},
      {json: 'Level', js: 'Level', typ: r('Level')},
      {json: 'Notes', js: 'Notes', typ: a(r('Note'))},
    ],
    false,
  ),
  PremiumTravelDataByCountryCountry: o(
    [
      {json: 'CountryCode', js: 'CountryCode', typ: r('CountryCountryCode')},
      {json: 'Country', js: 'Country', typ: ''},
      {json: 'Province', js: 'Province', typ: ''},
      {json: 'City', js: 'City', typ: ''},
      {json: 'CityCode', js: 'CityCode', typ: ''},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Timestamp', js: 'Timestamp', typ: Date},
    ],
    false,
  ),
  Level: o(
    [
      {json: 'CountryCode', js: 'CountryCode', typ: r('CountryCountryCode')},
      {json: 'Level', js: 'Level', typ: 0},
      {json: 'LevelDesc', js: 'LevelDesc', typ: ''},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  Note: o(
    [
      {json: 'CountryCode', js: 'CountryCode', typ: r('CountryCountryCode')},
      {json: 'Note', js: 'Note', typ: ''},
      {json: 'Date', js: 'Date', typ: Date},
    ],
    false,
  ),
  AllData: o(
    [
      {json: 'Country', js: 'Country', typ: ''},
      {json: 'CountryCode', js: 'CountryCode', typ: ''},
      {json: 'Lat', js: 'Lat', typ: ''},
      {json: 'Lon', js: 'Lon', typ: ''},
      {json: 'Confirmed', js: 'Confirmed', typ: 0},
      {json: 'Deaths', js: 'Deaths', typ: 0},
      {json: 'Recovered', js: 'Recovered', typ: 0},
      {json: 'Active', js: 'Active', typ: 0},
      {json: 'Date', js: 'Date', typ: Date},
      {json: 'LocationID', js: 'LocationID', typ: ''},
    ],
    false,
  ),
  Stats: o(
    [
      {json: 'Total', js: 'Total', typ: 0},
      {json: 'All', js: 'All', typ: 0},
      {json: 'AllUpdated', js: 'AllUpdated', typ: ''},
      {json: 'Countries', js: 'Countries', typ: 0},
      {json: 'CountriesUpdated', js: 'CountriesUpdated', typ: ''},
      {json: 'ByCountry', js: 'ByCountry', typ: 0},
      {json: 'ByCountryUpdated', js: 'ByCountryUpdated', typ: ''},
      {json: 'ByCountryAllStatus', js: 'ByCountryAllStatus', typ: 0},
      {
        json: 'ByCountryAllStatusUpdated',
        js: 'ByCountryAllStatusUpdated',
        typ: '',
      },
      {json: 'ByCountryLive', js: 'ByCountryLive', typ: 0},
      {json: 'ByCountryLiveUpdated', js: 'ByCountryLiveUpdated', typ: ''},
      {json: 'ByCountryTotal', js: 'ByCountryTotal', typ: 0},
      {json: 'ByCountryTotalUpdated', js: 'ByCountryTotalUpdated', typ: ''},
      {json: 'ByCountryTotalAllStatus', js: 'ByCountryTotalAllStatus', typ: 0},
      {
        json: 'ByCountryTotalAllStatusUpdated',
        js: 'ByCountryTotalAllStatusUpdated',
        typ: '',
      },
      {json: 'DayOne', js: 'DayOne', typ: 0},
      {json: 'DayOneUpdated', js: 'DayOneUpdated', typ: ''},
      {json: 'DayOneLive', js: 'DayOneLive', typ: 0},
      {json: 'DayOneLiveUpdated', js: 'DayOneLiveUpdated', typ: ''},
      {json: 'DayOneTotal', js: 'DayOneTotal', typ: 0},
      {json: 'DayOneTotalUpdated', js: 'DayOneTotalUpdated', typ: ''},
      {json: 'DayOneAllStatus', js: 'DayOneAllStatus', typ: 0},
      {
        json: 'DayOneAllStatusUpdated',
        js: 'DayOneAllStatusUpdated',
        typ: '',
      },
      {json: 'LiveCountryStatus', js: 'LiveCountryStatus', typ: 0},
      {
        json: 'LiveCountryStatusUpdated',
        js: 'LiveCountryStatusUpdated',
        typ: '',
      },
      {
        json: 'LiveCountryStatusAfterDate',
        js: 'LiveCountryStatusAfterDate',
        typ: 0,
      },
      {
        json: 'LiveCountryStatusAfterDateUpdated',
        js: 'LiveCountryStatusAfterDateUpdated',
        typ: '',
      },
      {
        json: 'CountryDayOneTotalAllStatus',
        js: 'CountryDayOneTotalAllStatus',
        typ: 0,
      },
      {
        json: 'CountryDayOneTotalAllStatusUpdated',
        js: 'CountryDayOneTotalAllStatusUpdated',
        typ: '',
      },
      {
        json: 'WorldTotal',
        js: 'WorldTotal',
        typ: 0,
      },
      {
        json: 'WorldTotalDateUpdated',
        js: 'WorldTotalDateUpdated',
        typ: '',
      },
      {
        json: 'WorldDaily',
        js: 'WorldDaily',
        typ: 0,
      },
      {
        json: 'WorldDailyDateUpdated',
        js: 'WorldDailyDateUpdated',
        typ: '',
      },
      {json: 'Stats', js: 'Stats', typ: 0},
      {json: 'StatsUpdated', js: 'StatsUpdated', typ: ''},
      {json: 'Default', js: 'Default', typ: 0},
      {json: 'DefaultUpdated', js: 'DefaultUpdated', typ: ''},
      {json: 'SubmitWebhook', js: 'SubmitWebhook', typ: 0},
      {json: 'SubmitWebhookUpdated', js: 'SubmitWebhookUpdated', typ: ''},
      {json: 'Summary', js: 'Summary', typ: 0},
      {json: 'SummaryUpdated', js: 'SummaryUpdated', typ: ''},

      {json: 'PremiumCountry', js: 'PremiumCountry', typ: 0},
      {json: 'PremiumCountryUpdated', js: 'PremiumCountryUpdated', typ: ''},
      {json: 'PremiumSummaryCountry', js: 'PremiumSummaryCountry', typ: 0},
      {
        json: 'PremiumSummaryCountryUpdated',
        js: 'PremiumSummaryCountryUpdated',
        typ: '',
      },
      {json: 'PremiumCountryData', js: 'PremiumCountryData', typ: 0},
      {
        json: 'PremiumCountryDataUpdated',
        js: 'PremiumCountryDataUpdated',
        typ: '',
      },
      {json: 'PremiumCountryTests', js: 'PremiumCountryTests', typ: 0},
      {
        json: 'PremiumCountryTestsUpdated',
        js: 'PremiumCountryTestsUpdated',
        typ: '',
      },
      {json: 'PremiumTravelAdvice', js: 'PremiumTravelAdvice', typ: 0},
      {
        json: 'PremiumTravelAdviceUpdated',
        js: 'PremiumTravelAdviceUpdated',
        typ: '',
      },
    ],
    false,
  ),
  CountryEnum: ['Switzerland'],
  DayOneCountryCode: ['CH'],
  Status: ['confirmed'],
  Continent: [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'Oceania',
    'South America',
  ],
  Entity: [
    'United States - tests performed (CDC) (incl. non-PCR)',
    'United States - units unclear (incl. non-PCR)',
  ],
  ISO: ['US'],
  Source: ['COVID Tracking Project', '', 'United States CDC'],
  CountryCountryCode: ['AU'],
};
