export interface PhotoPrismLoginResponse {
  config: Config
  data: Data
  id: string
  provider: string
  status: string
  user: User
}

export interface Config {
  mode: string
  name: string
  about: string
  edition: string
  version: string
  copyright: string
  flags: string
  baseUri: string
  staticUri: string
  cssUri: string
  jsUri: string
  manifestUri: string
  apiUri: string
  contentUri: string
  videoUri: string
  wallpaperUri: string
  siteUrl: string
  siteDomain: string
  siteAuthor: string
  siteTitle: string
  siteCaption: string
  siteDescription: string
  sitePreview: string
  legalInfo: string
  legalUrl: string
  appName: string
  appMode: string
  appIcon: string
  appColor: string
  restart: boolean
  debug: boolean
  trace: boolean
  test: boolean
  demo: boolean
  sponsor: boolean
  readonly: boolean
  uploadNSFW: boolean
  public: boolean
  authMode: string
  usersPath: string
  loginUri: string
  registerUri: string
  passwordLength: number
  passwordResetUri: string
  experimental: boolean
  albumCategories: string[]
  albums: any[]
  cameras: Camera[]
  lenses: Lense[]
  countries: Country[]
  people: People[]
  thumbs: Thumb[]
  tier: number
  membership: string
  customer: string
  mapKey: string
  downloadToken: string
  previewToken: string
  disable: Disable
  count: Count
  pos: Pos
  years: number[]
  colors: Color[]
  categories: Category[]
  clip: number
  server: Server
  settings: Settings
  acl: Acl
}

export interface Camera {
  ID: number
  Slug: string
  Name: string
  Make: string
  Model: string
}

export interface Lense {
  ID: number
  Slug: string
  Name: string
  Make: string
  Model: string
  Type: string
}

export interface Country {
  ID: string
  Slug: string
  Name: string
}

export interface People {
  UID: string
  Name: string
  Keywords: string[]
}

export interface Thumb {
  size: string
  usage: string
  w: number
  h: number
}

export interface Disable {
  webdav: boolean
  settings: boolean
  places: boolean
  backups: boolean
  tensorflow: boolean
  faces: boolean
  classification: boolean
  sips: boolean
  ffmpeg: boolean
  exiftool: boolean
  darktable: boolean
  rawtherapee: boolean
  imagemagick: boolean
  heifconvert: boolean
  vectors: boolean
  jpegxl: boolean
  raw: boolean
}

export interface Count {
  all: number
  photos: number
  live: number
  videos: number
  cameras: number
  lenses: number
  countries: number
  hidden: number
  favorites: number
  review: number
  stories: number
  private: number
  albums: number
  private_albums: number
  moments: number
  private_moments: number
  months: number
  private_months: number
  states: number
  private_states: number
  folders: number
  private_folders: number
  files: number
  people: number
  places: number
  labels: number
  labelMaxPhotos: number
}

export interface Pos {
  uid: string
  cid: string
  utc: string
  lat: number
  lng: number
}

export interface Color {
  Example: string
  Name: string
  Slug: string
}

export interface Category {
  UID: string
  Slug: string
  Name: string
}

export interface Server {
  cores: number
  routines: number
  memory: Memory
}

export interface Memory {
  total: number
  free: number
  used: number
  reserved: number
  info: string
}

export interface Settings {
  ui: Ui
  search: Search
  maps: Maps
  features: Features
  import: Import
  index: Index
  stack: Stack
  share: Share
  download: Download
  templates: Templates
}

export interface Ui {
  scrollbar: boolean
  zoom: boolean
  theme: string
  language: string
  timeZone: string
}

export interface Search {
  batchSize: number
}

export interface Maps {
  animate: number
  style: string
}

export interface Features {
  account: boolean
  albums: boolean
  archive: boolean
  delete: boolean
  download: boolean
  edit: boolean
  estimates: boolean
  favorites: boolean
  files: boolean
  folders: boolean
  import: boolean
  labels: boolean
  library: boolean
  logs: boolean
  moments: boolean
  people: boolean
  places: boolean
  private: boolean
  ratings: boolean
  reactions: boolean
  review: boolean
  search: boolean
  services: boolean
  settings: boolean
  share: boolean
  upload: boolean
  videos: boolean
}

export interface Import {
  path: string
  move: boolean
}

export interface Index {
  path: string
  convert: boolean
  rescan: boolean
  skipArchived: boolean
}

export interface Stack {
  uuid: boolean
  meta: boolean
  name: boolean
}

export interface Share {
  title: string
}

export interface Download {
  name: string
  disabled: boolean
  originals: boolean
  mediaRaw: boolean
  mediaSidecar: boolean
}

export interface Templates {
  default: string
}

export interface Acl {
  albums: Albums
  calendar: Calendar
  config: Config2
  default: Default
  favorites: Favorites
  feedback: Feedback
  files: Files
  folders: Folders
  labels: Labels
  logs: Logs
  moments: Moments
  password: Password
  people: People2
  photos: Photos
  places: Places
  services: Services
  settings: Settings2
  shares: Shares
  users: Users
  videos: Videos
}

export interface Albums {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Calendar {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Config2 {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Default {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Favorites {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Feedback {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Files {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Folders {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Labels {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Logs {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Moments {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Password {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface People2 {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Photos {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Places {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Services {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Settings2 {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Shares {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Users {
  access_all: boolean
  access_own: boolean
  create: boolean
  delete: boolean
  subscribe: boolean
  update: boolean
  view: boolean
}

export interface Videos {
  access_all: boolean
  access_library: boolean
  create: boolean
  delete: boolean
  download: boolean
  full_access: boolean
  manage: boolean
  rate: boolean
  react: boolean
  share: boolean
  subscribe: boolean
  update: boolean
}

export interface Data {
  tokens: any
  shares: any
}

export interface User {
  ID: number
  UID: string
  AuthProvider: string
  AuthID: string
  Name: string
  DisplayName: string
  Email: string
  Role: string
  Attr: string
  SuperAdmin: boolean
  CanLogin: boolean
  LoginAt: string
  WebDAV: boolean
  BasePath: string
  UploadPath: string
  CanInvite: boolean
  Details: Details
  Settings: Settings3
  Thumb: string
  ThumbSrc: string
  CreatedAt: string
  UpdatedAt: string
}

export interface Details {
  BirthYear: number
  BirthMonth: number
  BirthDay: number
  NameTitle: string
  GivenName: string
  MiddleName: string
  FamilyName: string
  NameSuffix: string
  NickName: string
  NameSrc: string
  Gender: string
  About: string
  Bio: string
  Location: string
  Country: string
  Phone: string
  SiteURL: string
  ProfileURL: string
  OrgTitle: string
  OrgName: string
  OrgEmail: string
  OrgPhone: string
  OrgURL: string
  CreatedAt: string
  UpdatedAt: string
}

export interface Settings3 {
  CreatedAt: string
  UpdatedAt: string
}

export type PhotosResponse = Root2[]

export interface Root2 {
  ID: string
  UID: string
  Type: string
  TypeSrc: string
  TakenAt: string
  TakenAtLocal: string
  TakenSrc: string
  TimeZone: string
  Path: string
  Name: string
  OriginalName: string
  Title: string
  Description: string
  Year: number
  Month: number
  Day: number
  Country: string
  Stack: number
  Favorite: boolean
  Private: boolean
  Iso: number
  FocalLength: number
  FNumber: number
  Exposure: string
  Quality: number
  Resolution: number
  Color: number
  Scan: boolean
  Panorama: boolean
  CameraID: number
  CameraModel: string
  LensID: number
  LensModel: string
  Lat: number
  Lng: number
  CellID: string
  PlaceID: string
  PlaceSrc: string
  PlaceLabel: string
  PlaceCity: string
  PlaceState: string
  PlaceCountry: string
  InstanceID: string
  FileUID: string
  FileRoot: string
  FileName: string
  Hash: string
  Width: number
  Height: number
  Portrait: boolean
  Merged: boolean
  CreatedAt: string
  UpdatedAt: string
  EditedAt: string
  CheckedAt: string
  DeletedAt: string
  Files: File[]
}

export interface File {
  UID: string
  PhotoUID: string
  Name: string
  Root: string
  Hash: string
  Size: number
  Primary: boolean
  OriginalName: string
  Codec: string
  FileType: string
  MediaType: string
  Mime: string
  Portrait?: boolean
  Width: number
  Height: number
  Orientation: number
  AspectRatio: number
  Colors: string
  Luminance: string
  Diff: number
  Chroma: number
  CreatedAt: string
  UpdatedAt: string
  Markers: any[]
}
