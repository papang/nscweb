"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Membatasi pergerakan peta agar terkunci di area Indonesia
const indonesiaBounds: LatLngBoundsExpression = [
  [-13.0, 92.0], // Barat Daya
  [9.0, 143.0]   // Timur Laut
];

export default function CoverageMap() {
  const [boundaryData, setBoundaryData] = useState<any>(null);

  useEffect(() => {
    // Membaca file batas asli Indonesia yang sudah disimpan di folder public
    fetch("/indonesia-boundary.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal membaca file lokal");
        return res.json();
      })
      .then((data) => {
        // Membungkus raw "Polygon" ke dalam format "FeatureCollection"
        // agar React-Leaflet bisa membaca dan memberikannya warna biru.
        if (data && data.length > 0 && data[0].geojson) {
          const formattedGeoJson = {
            type: "FeatureCollection" as const,
            features: [
              {
                type: "Feature" as const,
                properties: { name: "Batas ZEE Indonesia" },
                geometry: data[0].geojson // Ini mengambil koordinat dari file
              }
            ]
          };
          setBoundaryData(formattedGeoJson);
        }
      })
      .catch((err) => {
        console.error("Gagal meload batas Indonesia:", err);
      });
  }, []);

  return (
    <MapContainer
      center={[-2.5, 118.0]}
      zoom={5} // Zoom saat pertama kali dimuat
      bounds={indonesiaBounds}
      maxBounds={indonesiaBounds}
      maxBoundsViscosity={1.0}
      minZoom={5}
      maxZoom={12}
      zoomControl={true}
      style={{ 
        height: "100%", 
        minHeight: "100%", 
        width: "100%", 
        borderRadius: "0 0 1.5rem 1.5rem", 
        zIndex: 0 
      }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Garis ZEE / Teritorial baru akan dirender saat data lokal selesai dibaca & dibungkus */}
      {boundaryData && (
        <GeoJSON 
          key="real-indonesia-border"
          data={boundaryData} 
          style={{
            color: "#3b82f6",     // Warna Garis Biru NSC
            weight: 3.5,          // Ketebalan garis luar
            fillColor: "#3b82f6", // Warna Isi Biru
            fillOpacity: 0.15     // Transparansi 15%
          }}
        />
      )}
    </MapContainer>
  );
}