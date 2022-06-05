export interface ResultsObject<ResourceType> {
  items: ResourceType[];
  page: number;
  size: number;
  total: number;
}
