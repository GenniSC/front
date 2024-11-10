// src/components/Map.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";

// Coordenadas da UniEVANGÉLICA em Anápolis, Goiás
const position: [number, number] = [-16.29419382246529, -48.945564101675195];

export const MapComponent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "300px", sm: "400px", md: "500px" }, // Altura responsiva
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: 3,
        border: "1px solid #e0e0e0", // Adiciona uma borda suave
      }}
    >
      <MapContainer
        center={position}
        zoom={50}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
        dragging={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        keyboard={true}
        touchZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              UniEVANGÉLICA - Anápolis, GO
            </Typography>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};
