import { localLocationSchema } from 'types'
import { z } from 'zod'

export type AdyenRecord = { id: string; merchantId: string }

export const adyenLocationSchema = z.object({
  id: z.string(),
  value: localLocationSchema.omit({
    location_short_name: true,
    location_code: true,
    active_flag: true,
  }),
})
export type AdyenLocation = z.infer<typeof adyenLocationSchema>

export type AdyenTerminalsResponse = {
  _links: Links
  itemsTotal: number
  pagesTotal: number
  data: TerminalData[]
}

export type AdyenStoresResponse = {
  _links: Links
  itemsTotal: number
  pagesTotal: number
  data: StoreData[]
}

interface Links {
  first: {
    href: string
  }
  last: {
    href: string
  }
  next: {
    href: string
  }
  self: {
    href: string
  }
}

export interface StoreData {
  id: string
  description: string
  reference: string
  status: string
  merchantId: string
  phoneNumber: string
  address: Address
  _links: Pick<Links, 'self'>
}

export interface Address {
  line1: string
  line2: string
  line3: string
  city: string
  postalCode: string
  stateOrProvince: string
  country: string
}

export interface TerminalData {
  id: string
  model: string
  serialNumber: string
  firmwareVersion: string
  assignment: Assignment
  connectivity: Connectivity
}

interface Assignment {
  companyId: string
  merchantId: string
  storeId: string
  status: string
  reassignmentTarget: ReassignmentTarget
}

interface ReassignmentTarget {
  inventory: boolean
}

interface Connectivity {
  cellular: Cellular
  wifi: Wifi
}

interface Cellular {
  iccid: string
}

interface Wifi {
  ipAddress: string
  macAddress: string
}

export const adyenTerminalBoardWebhook = z.object({
  type: z.string(),
  createdAt: z.string(),
  environment: z.string(),
  data: z.object({
    companyId: z.string(),
    merchantId: z.string(),
    storeId: z.string(),
    uniqueTerminalId: z.string(),
  }),
})

export type AdyenStoreCreate = {
  id: string
  address: {
    country: string
    line1: string
    line2: string
    line3: string
    city: string
    stateOrProvince: string
    postalCode: string
  }
  description: string
  merchantId: string
  shopperStatement: string
  phoneNumber: string
  reference: string
  status: string
  _links: {
    self: {
      href: string
    }
  }
}

export type AdyenStoresReturn = {
  _links: {
    first?: {
      href: string
    }
    last?: {
      href: string
    }
    next?: {
      href: string
    }
    self: {
      href: string
    }
  }
  itemsTotal: number
  pagesTotal: number
  data: {
    address: {
      city: string
      line1: string
      postalCode: string
      stateOrProvince: string
      country: string
    }
    description: string
    externalReferenceId: string
    merchantId: string
    phoneNumber: string
    reference: string
    shopperStatement: string
    status: string
    id: string
    _links: {
      first?: {
        href: string
      }
      last?: {
        href: string
      }
      self: {
        href: string
      }
    }
  }[]
}