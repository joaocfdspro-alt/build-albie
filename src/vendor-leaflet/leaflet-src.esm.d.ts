export interface LeafletMap {
  remove(): void;
  fitBounds(bounds: LeafletBounds, options?: Record<string, unknown>): LeafletMap;
}

export interface LeafletLayer {
  addTo(map: LeafletMap): LeafletLayer;
}

export interface LeafletMarker extends LeafletLayer {
  addTo(map: LeafletMap): LeafletMarker;
  bindTooltip(label: string, options?: Record<string, unknown>): LeafletMarker;
  on(event: string, callback: () => void): LeafletMarker;
}

export interface LeafletBounds {
  readonly __leafletBounds: unique symbol;
}

export interface LeafletIcon {
  readonly __leafletIcon: unique symbol;
}

export function map(element: HTMLElement, options?: Record<string, unknown>): LeafletMap;
export function tileLayer(url: string, options?: Record<string, unknown>): LeafletLayer;
export function marker(point: [number, number], options?: Record<string, unknown>): LeafletMarker;
export function divIcon(options?: Record<string, unknown>): LeafletIcon;
export function polyline(points: [number, number][], options?: Record<string, unknown>): LeafletLayer;
export function latLngBounds(points: [number, number][]): LeafletBounds;
