import { useEffect, useRef } from "react";
import "../vendor-leaflet/leaflet.css";

export type MapStop = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  group?: "green" | "orange";
};

/** Functional Public map. Tiles are network-enhanced; the canvas and controls
 * stay present if OpenStreetMap is temporarily unavailable. */
const JourneyMap = ({ stops, onSelect }: { stops: MapStop[]; onSelect?: (id: string) => void }) => {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    if (!el.current || stops.length === 0) return;
    let disposed = false;
    void import("../vendor-leaflet/leaflet-src.esm.js").then((L) => {
      if (disposed || !el.current) return;
      const map = L.map(el.current, { scrollWheelZoom: false, attributionControl: true, zoomControl: true });
      mapRef.current = map;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);

      const latlngs: [number, number][] = [];
      const green: [number, number][] = [];
      const orange: [number, number][] = [];
      stops.forEach((stop, index) => {
        const point: [number, number] = [stop.lat, stop.lng];
        latlngs.push(point);
        (stop.group === "orange" ? orange : green).push(point);
        const marker = L.marker(point, {
          title: stop.label,
          alt: stop.label,
          keyboard: true,
          icon: L.divIcon({
            className: "",
            html: `<div class="deep-pin${stop.group === "orange" ? " deep-pin--orange" : ""}">${index + 1}</div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          }),
        }).addTo(map);
        marker.bindTooltip(stop.label, { direction: "top", offset: [0, -16] });
        marker.on("click", () => onSelect?.(stop.id));
      });
      if (green.length > 1) L.polyline(green, { color: "#079c5a", weight: 4, opacity: 0.88 }).addTo(map);
      if (orange.length > 1) L.polyline(orange, { color: "#ff5a00", weight: 4, opacity: 0.88 }).addTo(map);
      if (green.length && orange.length)
        L.polyline([green[green.length - 1], orange[0]], {
          color: "#ff5a00",
          weight: 3,
          opacity: 0.72,
          dashArray: "7 9",
        }).addTo(map);
      map.fitBounds(L.latLngBounds(latlngs), { padding: [58, 58], maxZoom: 12 });
    });

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [stops, onSelect]);

  if (stops.length === 0) return null;
  return <div ref={el} className="deep-map" role="application" aria-label="Mapa interativo das experiências" />;
};

export default JourneyMap;
