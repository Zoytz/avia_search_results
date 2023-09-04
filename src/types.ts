export type FlightsType = FlightsItemType[]

export type FlightsItemType = {
  flight: FlightType
  flightToken: string
  hasExtendedFare: boolean
}

export type FlightType = {
  carrier: CarrierType
  exchange: ExchangeType
  legs: LegType[]
  price: PriceType
  refund: {
    ADULT: {
      refundableAfterDeparture: boolean,
      refundableBeforeDeparture: boolean
    }
  }
  seats: {count: number, type: {caption: string, uid: string}}[]
  servicesStatuses: {
    baggage: {caption: string, uid: string},
    exchange: {caption: string, uid: string},
    refund: {caption: string, uid: string}
}
  flightToken: string
  hasExtendedFare: boolean
}

export type CarrierType = {
  airlineCode: string
  caption: string
  uid: string
}

export type ExchangeType = {
  ADULT: AdultType
  international: boolean
  isTripartiteContractDiscountApplied: boolean
}

export type AdultType = {
  exchangeAfterDeparture: ExchangeAfterDepartureType
  exchangeBeforeDeparture: ExchangeBeforeDepartureType
  exchangeableAfterDeparture: boolean
  exchangeableBeforeDeparture: boolean
}

export type ExchangeAfterDepartureType = {
  amount: string
  currency: string
  currencyCode: string
}

export type ExchangeBeforeDepartureType = {
  amount: string
  currency: string
  currencyCode: string
}

export type LegType = {
  duration: number
  segments: SegmentType[]
}

export type SegmentType = {
  aircraft: { caption: string, uid: string }
  airline: { airlineCode: string, caption: string, uid: string }
  arrivalAirport: { caption: string, uid: string }
  arrivalCity: { caption: string, uid: string }
  arrivalDate: string
  classOfService: { caption: string, uid: string }
  classOfServiceCode: string
  departureAirport: { caption: string, uid: string }
  departureCity: { caption: string, uid: string }
  departureDate: string
  flightNumber: string
  servicesDetails: ServicesDetailsType
  starting: boolean
  stops: number
  techStopInfos: any[]
  travelDuration: number
}

export type ServicesDetailsType = {
  fareBasis: { ADULT: string }
  freeCabinLuggage: Record<string, any>
  freeLuggage: { ADULT: { nil: boolean, pieces: number, unit: string } }
  paidCabinLuggage: Record<string, any>
  paidLuggage: Record<string, any>
  tariffName: string
}

export type PriceType = {
  passengerPrices: PassengerPriceType[]
  rates: {
    totalEur: { amount: string, currencyCode: string },
    totalUsd: { amount: string, currencyCode: string }
  }
  total: { amount: string, currency: string, currencyCode: string }
  totalFeeAndTaxes: { amount: string, currency: string, currencyCode: string }
}

export type PassengerPriceType = {
  feeAndTaxes: { amount: string, currency: string, currencyCode: string }
  passengerCount: number
  passengerType: { caption: string, uid: string }
  singlePassengerTotal: { amount: string, currency: string, currencyCode: string }
  tariff: { amount: string, currency: string, currencyCode: string }
  total: { amount: string, currency: string, currencyCode: string }
}